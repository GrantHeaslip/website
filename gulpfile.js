const fs = require('fs').promises;
const path = require('path');

const del = require('del');
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpCleanCss = require('gulp-clean-css');
const gulpPostCss = require('gulp-postcss');
const gulpRev = require('gulp-rev');
const gulpRevReplace = require('gulp-rev-replace');
const postCssModules = require('postcss-modules');
const postCssModulesValues = require('postcss-modules-values');
const stringHash = require('string-hash');

var cssModuleMappings = {};
var isProduction = true;

gulp.task(
    'build',
    gulp.series(
        clean,
        stylesheets,
        writeCssModuleClassnameMappingsFile,
        preMinifiedScripts,
        favicons,
        appManifests,
    )
);

function appManifests() {
    const manifest = gulp.src(process.cwd() + '/rev-manifest.json');

    return gulp.src(
        [
            'static/browserconfig.xml',
            'static/manifest.webmanifest'
        ],
        {base: 'static'}
    )
        .pipe(gulpRevReplace({
            manifest: manifest,
            replaceInExtensions: ['.xml', '.webmanifest'],
        }))
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
}

function clean() {
    return del(['rev-manifest.json', 'static-build/*']);
}

function favicons() {
    return gulp.src(['static/favicons/**/*'], {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
}

function preMinifiedScripts() {
    return gulp.src(['static/js/**/*'], {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
}

function stylesheets() {
    return gulp.src(['css-modules/**/*'], {base: 'static'})
        .pipe(
            gulpPostCss([
                postCssModules({
                    generateScopedName: function(name, filename, css) {
                        var moduleName = path.basename(filename, '.module.css');

                        var cssContentHash = stringHash(css).toString(36).substr(0, 5);

                        return moduleName + '_' + name + '_' + cssContentHash;
                    },
                    getJSON: function (cssFileName, json) {
                        var moduleName = path.basename(cssFileName, '.module.css');

                        cssModuleMappings[moduleName] = json;
                    }
                    ,
                }),
                postCssModulesValues(),
            ])
        )
        .pipe(gulpConcat('css/modules.css'))
        .pipe(gulp.dest('static'))
        .pipe(gulpCleanCss())
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true,
        }))
        .pipe(gulp.dest(process.cwd()));
}

async function writeCssModuleClassnameMappingsFile() {
    return fs.writeFile(
        `${__dirname}/css-module-classname-mappings.json`,
        JSON.stringify(cssModuleMappings)
    );
}
