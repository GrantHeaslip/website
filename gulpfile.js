const del = require('del');
const gulp = require('gulp');
const gulpCleanCss = require('gulp-clean-css');
const gulpRev = require('gulp-rev');
const gulpRevReplace = require('gulp-rev-replace');
const runSequence = require('run-sequence');

gulp.task('build', (done) => {
    return runSequence(
        'clean',
        'stylesheets',
        'preMinifiedScripts',
        'favicons',
        'appManifests',
        done,
    );
});

gulp.task('appManifests', () => {
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
});

gulp.task('clean', function() {
    return del(['rev-manifest.json', 'static-build/*']);
});

gulp.task('favicons', () => {
    return gulp.src(['static/favicons/**/*'], {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
});

gulp.task('preMinifiedScripts', () => {
    return gulp.src(['static/js/**/*'], {base: 'static'})
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(process.cwd()));
});

gulp.task('stylesheets', () => {
    return gulp.src(['static/css/*'], {base: 'static'})
        .pipe(gulpCleanCss())
        .pipe(gulpRev())
        .pipe(gulp.dest('static-build'))
        .pipe(gulpRev.manifest({
            merge: true,
        }))
        .pipe(gulp.dest(process.cwd()));
});
