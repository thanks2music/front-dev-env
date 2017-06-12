'use strict';

// Plugins
const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sassImage = require('gulp-sass-image');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const packageImporter = require('node-sass-package-importer');
const notifier = require('node-notifier');
const plumber = require('gulp-plumber');
const header = require('gulp-header');
const config = {
  supportBrowsers: ['ios >= 7', 'android >= 4.4'],
  javascripts: 'javascripts/**/*.js',
  sass: 'sass/**/*.scss',
  images: 'images/**/*.+(jpeg|jpg|png|gif|svg)',
};

// エラー時のnotify表示
const notify = (taskName, error) => {
  let title = `[task] ${taskName} ${error.plugin}`;
  let errorMsg = `error: ${error.messageFormatted}`;
  /* eslint-disable no-console */
  console.error(`${title}\n${error}`);
  notifier.notify({
    title: title,
    message: errorMsg,
  });
};

// Task
gulp.task('sass-image', () => {
  return gulp.src(config.images)
    .pipe(sassImage({
        targetFile: 'modules/_sass-image.scss',
        images_path: 'images/',
        css_path: 'dist/css/',
        includeData: false,
    }))
    .pipe(gulp.dest('sass'));
});

gulp.task('sass', () => {
  return gulp.src('sass/**/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      importer: packageImporter({
        extensions: ['.scss', '.css']
      })
    }))
    .pipe(autoprefixer({browsers: config.supportBrowsers, add: true}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .on('error', function handleError() {
      this.emit('end');
    })
    .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('watch', () => {
  gulp.watch(config.javascripts, ['webpack']);
  gulp.watch(config.images, ['sass-image']);
  gulp.watch(config.sass, ['sass']);
});

gulp.task('default', ['watch']);
