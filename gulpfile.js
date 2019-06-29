const del = require('del');
const gulp = require('gulp');
const gulpCleanCss = require('gulp-clean-css');
const gulpRev = require('gulp-rev');
const gulpRevReplace = require('gulp-rev-replace');

gulp.task(
    'build',
    gulp.series(
        clean,
        stylesheets,
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
    return gulp.src(['static/css/*'], {base: 'static'})
        .pipe(gulpCleanCss())
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true,
        }))
        .pipe(gulp.dest(process.cwd()));
}
