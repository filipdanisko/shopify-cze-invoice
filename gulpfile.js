var gulp = require('gulp'),
    inline = require('gulp-inline'),
    minifyCss = require('gulp-minify-css'),
    liquify = require('gulp-liquify'),
    browserSync = require('browser-sync'),
    data = require('gulp-data');
    rename = require('gulp-rename');



var locals = require('./data');
console.log(locals.shopify);


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ['./dev']
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('dev', function() {

  gulp.src('dev/invoice.liquid')
    .pipe(liquify(locals.shopify))
    .pipe(inline({
      base: 'dev/',
      css: minifyCss(),
      disabledTypes: ['svg', 'img'] // Only inline css files
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dev/'))
    .pipe(browserSync.reload({stream:true}))

});

gulp.task('build', function() {

  gulp.src('dev/invoice.liquid')
    .pipe(inline({
      base: 'dev/',
      css: minifyCss(),
      disabledTypes: ['svg', 'img'] // Only inline css files
    }))
    .pipe(rename('invoice.html'))
    .pipe(gulp.dest('invoice/'))

  gulp.src('dev/invoiceENG.liquid')
    .pipe(inline({
      base: 'dev/',
      css: minifyCss(),
      disabledTypes: ['svg', 'img'] // Only inline css files
    }))
    .pipe(rename('invoiceENG.html'))
    .pipe(gulp.dest('invoice/'))
});



gulp.task('default', ['browser-sync', 'dev', 'build'], function () {
  gulp.watch('./**/*.css',    ['dev', 'build']);
  gulp.watch('./**/*.js',     ['dev', 'build']);
  gulp.watch('./**/*.liquid', ['dev', 'build']);
});
