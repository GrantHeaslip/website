const fs = require('fs');
const path = require('path');

const del = require('del');
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpRev = require('gulp-rev');
const gulpRevReplace = require('gulp-rev-replace');
const shellJs = require('shelljs');

const gulpRevManifestPath = 'temp/rev-manifest.json';

gulp.task(
    'build',
    gulp.series(
        clean,
        typeScriptTypeCheck,
        babelCompile,
        linariaStyles,
        preMinifiedScripts,
        favicons,
        appManifests,
    )
);

gulp.task(
    'watch',
    function () {
        return gulp.watch(
            'src/**/*.{ts,tsx}',
            gulp.series(
                babelCompile,
                linariaStyles,
            )
        );
    }
);

function appManifests() {
    const manifest = gulp.src(`${process.cwd()}/${gulpRevManifestPath}`);

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
        .pipe(
            gulpRev.manifest(
                gulpRevManifestPath,
                {
                    merge: true
                }
            )
        )
        .pipe(gulp.dest(process.cwd()));
}

function clean() {
    return del([
        gulpRevManifestPath,
        'static-build/*'
    ]);
}

function favicons() {
    return gulp.src('static/favicons/**/*', {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(
            gulpRev.manifest(
                gulpRevManifestPath,
                {
                    merge: true
                }
            )
        )
        .pipe(gulp.dest(process.cwd()));
}

function preMinifiedScripts() {
    return gulp.src('static/js/**/*', {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(
            gulpRev.manifest(
                gulpRevManifestPath,
                {
                    merge: true
                }
            )
        )
        .pipe(gulp.dest(process.cwd()));
}

function babelCompile() {
    return shellJs.exec(
        'node_modules/.bin/babel src --out-dir src-build --extensions ".ts,.tsx" --source-maps inline',
        {
            async: true
        }
    );
}

function typeScriptTypeCheck() {
    return shellJs.exec(
        'node_modules/.bin/tsc --noEmit',
        {
            async: true
        }
    );
}

function linariaStyles() {
    shellJs.exec('node node_modules/linaria/bin/linaria.js --out-dir temp/linaria-css src/components/*.tsx');

    return gulp.src('temp/linaria-css/**/*.css')
        .pipe(
            gulpConcat('css/website.css')
        )
        .pipe(
            gulp.dest('static')
        )
        .pipe(
            gulpRev()
        )
        .pipe(
            gulp.dest('static-build')
        )
        .pipe(
            gulpRev.manifest(
                gulpRevManifestPath,
                {
                    merge: true
                }
            )
        )
        .pipe(
            gulp.dest(process.cwd())
        );
}
