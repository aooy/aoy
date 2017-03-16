var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
 	rename = rename = require('gulp-rename');
gulp.task('jsmin', function () {
    gulp.src('dist/aoy.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});