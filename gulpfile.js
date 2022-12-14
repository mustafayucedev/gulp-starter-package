const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

function browsersyncServe(cb){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browserSync.reload();
  cb();
}

function Scss() {
  return src('src/scss/*.scss')
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(prefix())
    .pipe(minify()) 
    .pipe(dest('dist/css'))
}

function Javascript() {
  return src('src/js/**/*.js')
    .pipe(dest('dist/js'))
}

function Html() {
  return src(['src/*.html'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(dest('dist'))
}

function Watcher() {
  watch('src/scss/**/*.scss', Scss);
  watch('src/js/**/*.js', Javascript);
  watch('src/**/**/*.html', Html,browsersyncReload);
  watch(['src/scss/**/*.scss', 'src/js/**/*.js' ,'src/**/**/*.html'], series(Html, Scss, Javascript, browsersyncReload));
}

exports.default = series(
  Scss,
  Javascript,
  Html,
  browsersyncReload,
  browsersyncServe,
  Watcher
);