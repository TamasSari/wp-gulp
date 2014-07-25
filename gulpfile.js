var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade-php'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sftp = require('gulp-sftp'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

// Styles
gulp.task('stylus', function () {
  gulp.src('src/styles/**/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//  .pipe(minifycss())
    .pipe(gulp.dest('./'));
});


// Bitch ass @oroce
gulp.task('jade', function() {
  gulp.src('src/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'));
});

// SFTP Deploy
gulp.task('sftp', function () {
  return gulp.src('src/*')
    .pipe(sftp({
      host: 'heydesigner.com',
      remotePath: 'domains/heydesigner.org/html/',
      auth: 'keyMain'
    }));
});


// Watch
gulp.task('watch', function () {
    gulp.watch('src/styles/**/*.styl', ['stylus']);
    gulp.watch('src/views/**/*.jade', ['jade']);
});

// Default
gulp.task('default', ['watch']);
