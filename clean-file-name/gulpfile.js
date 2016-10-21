const gulp = require('gulp');
const rename = require("gulp-rename");

const settings = {
    src: '/',
    dest: 'clean'
}

function cleanName(filename) {
    return filename
        .replace(/ /g, '-') // remove spaces
        .replace(/,/g, '-') // remove commas
        .replace(/\./g, '') // remove periods
        .replace(/'/g, '') // remove apostrophies
        .replace(/\(|\)/g, '') // remove parenthesis
        .replace(/--+/g, '-'); // finally, let's make sure we didnt add multiple dashes together
}

gulp.task('clean', () => {
    gulp.src(settings.src + "*.*")
        .pipe(rename(function (path) {
            console.log('org-name:', path.basename + path.extname);
            path.basename = cleanName(path.basename);
            console.log('new-name:', path.basename + path.extname, '\n');
        }))
        .pipe(gulp.dest(settings.src + settings.dest));
});

gulp.task('default', ['clean'], function () {});
