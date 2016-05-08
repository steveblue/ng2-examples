
var gulp       = require('gulp'),
    path       = require('path'),
    plumber    = require('gulp-plumber'),
    rename     = require('gulp-rename'),
    paths      = require('../config.paths.js'),
    concat     = require('gulp-concat'),
    rename     = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),

// Paths
    root        = paths.rootDir,
    devRoot     = paths.devDir,
    prodRoot    = paths.prodDir,
    toCopy      = paths.copy,
    lib         = paths.lib,
    js          = paths.uglify,
    settings    = paths.settings,
    assetPaths  = paths.assets;

// Dev Copy Tasks

// copy js files for dev
gulp.task('copy:dev', function(){
  return gulp.src(toCopy, {cwd: root, base:'app'})
    .pipe(plumber())
    .pipe(gulp.dest(devRoot));
});

// uglify JS files for dev
gulp.task('uglify:dev', function(){
  return gulp.src(js, {cwd: root, base:'app'})
    .pipe(plumber())
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest(devRoot));
});


// Copy lib for dev
gulp.task('copy:dev:lib', function(){
  return gulp.src(lib.src, {cwd: root, base: './node_modules'})
    .pipe(plumber())
    .pipe(gulp.dest(lib.dev));
});

// Copy settings for dev
gulp.task('copy:dev:settings', function(){
  return gulp.src(settings.devSrc, {cwd: root, base: 'settings/local'})
    .pipe(plumber())
    .pipe(gulp.dest(settings.dev));
});

// Copy assets for dev
gulp.task('copy:dev:assets', function(){
  return gulp.src(assetPaths.src, {cwd: root, base:'app/assets'})
    .pipe(plumber())
    .pipe(gulp.dest(assetPaths.dev));
});


// Prod Copy Tasks

// Copy files for prod instead of symlinking
gulp.task('copy:prod', function(){
  return gulp.src(toCopy, {cwd: root, base:'app'})
    .pipe(plumber())
    .pipe(gulp.dest(prodRoot));
});

// uglify JS files for dev
gulp.task('uglify:prod', function(){
  return gulp.src(js, {cwd: root, base:'app'})
    .pipe(plumber())
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest(prodRoot));
});


// Copy asset files for prod
gulp.task('copy:prod:assets', function(){
  return gulp.src(assetPaths.src, {cwd: root, base:'app/assets'})
    .pipe(plumber())
    .pipe(gulp.dest(assetPaths.prod));
});

// Copy settings for prod
gulp.task('copy:prod:settings', function(){
  return gulp.src(settings.prodSrc, {cwd: root, base: 'settings/prod'})
    .pipe(plumber())
    .pipe(gulp.dest(settings.prod));
});

// Copy lib for dev
gulp.task('copy:prod:lib', function(){
  return gulp.src(lib.min, {cwd: root})
    .pipe(plumber())
    .pipe(gulp.dest(lib.prod));
});

// Copy lib files for prod
// gulp.task('copy:prod:lib', function(){
//   return gulp.src(lib.src, {cwd: root})
//     .pipe(plumber())
//     .pipe(sourcemaps.init())
//     .pipe(concat('concat.js'))
//     .pipe(gulp.dest('dist'))
//     .pipe(rename('dep.js'))
//     .pipe(uglify())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(lib.prod));
// });
