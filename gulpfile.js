const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
var concat = require('gulp-concat');
const terser = require('gulp-terser');

// Compile, Prefix, and Minify Scss
function CompileScss() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('dist/css'))
}

// Javascript Minify and Concat
function BundleJs() {
  return src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(dest('dist/js'))
}

// Watch Tasks
function WatchTask() {
  watch('src/scss/**/*.scss', CompileScss);
  watch('src/js/*.js', BundleJs);
}

exports.default = series(
  CompileScss,
  BundleJs,
  WatchTask
);