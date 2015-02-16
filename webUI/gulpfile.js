var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('merge-ng-scripts', function () {
    gulp.src([
        'app/**/*.module.js',
        'app/**/*.config.js',
        'app/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});

gulp.task('watch', ['merge-ng-scripts'], function () {
    gulp.watch('app/**/*.js', ['merge-ng-scripts'])
});