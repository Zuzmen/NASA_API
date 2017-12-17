var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var expect = require('gulp-expect-file');
var path = 'scss/main.scss';


gulp.task('sass', function() {
  return gulp.src(path)
    .pipe(expect(path))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      sourcemap: true,
      outputStyle: 'nested'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});
