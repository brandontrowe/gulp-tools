const gulp = require('gulp');
const rename = require('gulp-rename');

const settings = {
    srcFolder: 'C:/', // source folder of the files to be cleaned
    destFolder: 'clean' // relative to srcFolder; set to '' to have the files saved in the same folder
}

/**
 * Removes unwanted characters from the provided string
 * @param {string} filename - String to be cleaned.
 * @returns {string}
 */
const getCleanFilename = function(filename) {
    return filename
        .replace(/ /g, '-') // remove spaces
        .replace(/,/g, '-') // remove commas
        .replace(/\./g, '') // remove periods
        .replace(/'/g, '') // remove apostrophies
        .replace(/\(|\)/g, '') // remove parenthesis
        .replace(/--+/g, '-'); // finally, let's make sure we didnt add multiple dashes together
}

gulp.task('clean', () => {
    gulp.src(settings.srcFolder + "*.*")
        .pipe(rename(function (path) {
            console.log('org-name:', path.basename + path.extname);
            path.basename = getCleanFilename(path.basename) + '';
            console.log('new-name:', path.basename + path.extname, '\n');
        }))
        .pipe(gulp.dest(settings.srcFolder + settings.destFolder));
});

gulp.task('default', ['clean'], function () {});
