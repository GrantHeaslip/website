const fs = require('fs');
const path = require('path');

const del = require('del');
const fastGlob = require('fast-glob');
const gulp = require('gulp');
const gulpRev = require('gulp-rev');
const gulpRevReplace = require('gulp-rev-replace');
const svelteCompiler = require('svelte/compiler');

gulp.task(
    'build',
    gulp.series(
        clean,
        svelteModuleStyles,
        preMinifiedScripts,
        favicons,
        appManifests,
    )
);

gulp.task(
    'watchSvelte',
    function () {
        return gulp.watch(
            'components/*.svelte',
            svelteModuleStyles
        );
    }
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
            replaceInExtensions: [
                '.webmanifest',
                '.xml',
            ],
        }))
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
}

function clean() {
    return del([
        'rev-manifest.json',
        'static-build/*'
    ]);
}

function favicons() {
    return gulp.src('static/favicons/**/*', {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
}

function preMinifiedScripts() {
    return gulp.src('static/js/**/*', {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
}

function svelteModuleStyles(done) {
    const svelteComponentPaths = fastGlob.sync('components/*.svelte');

    let componentStyles = '';

    for (const svelteComponentPath of svelteComponentPaths) {
        const svelteComponentContent = fs.readFileSync(svelteComponentPath, 'utf8');

        const { css } = svelteCompiler.compile(svelteComponentContent);

        if (typeof css.code === 'string') {
            componentStyles += css.code;
        }
    }

    fs.writeFileSync(
        `${__dirname}/static/css/components.css`,
        componentStyles
    );

    return gulp.src('static/css/components.css', {base: 'static'})
        .pipe(
            gulpRev()
        )
        .pipe(
            gulp.dest('static-build')
        )
        .pipe(
            gulpRev.manifest({
                merge: true
            })
        )
        .pipe(
            gulp.dest(process.cwd())
        );
}
