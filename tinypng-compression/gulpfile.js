'use strict';

const gulp = require('gulp');
const fs = require('fs');

const settings = {
    key: '',
    path: 'C:/'
};
const tinify = require('gulp-tinify');

gulp.task('default', function () {
    gulp.src(settings.path + '*')
        .pipe(tinify(settings.key))
        .pipe(gulp.dest(settings.path));
});
