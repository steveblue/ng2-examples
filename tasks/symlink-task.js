
var gulp    = require('gulp'),
    path    = require('path'),
    plumber = require('gulp-plumber'),
    symlink = require('gulp-symlink'),
    paths   = require('../config.paths.js'),
    livereload = require('gulp-livereload'),

// Paths
    root      = paths.rootDir,
    devRoot   = paths.devDir,
    toLink    = paths.symlink,
    assets    = paths.assets,
    settings  = paths.settings,
    lib       = paths.lib,

    options   =  {
        log: false,
        force: true
    };


// Symlink JS and HTML for dev build
gulp.task('symlink', function(){
  return gulp.src(toLink, {cwd: root, read:false, base:'app'})
    .pipe(plumber())
    .pipe(symlink(function(file){
      return path.join(devRoot, file.relative);
  }, options));
});

gulp.task('symlink:reload', function(){
  return gulp.src(toLink, {cwd: root, read:false, base:'app'})
    .pipe(plumber())
    .pipe(symlink(function(file){
      return path.join(devRoot, file.relative);
    }, options));
});

// Symlink Library Files
gulp.task('symlink:lib', function(){
  return gulp.src(lib.src, {cwd: root, read:false})
    .pipe(plumber())
    .pipe(symlink(function(file){
      return path.join(lib.dev, path.basename(file.path));
  }, options));
});

// Symlink Assets Folder
gulp.task('symlink:assets', function(){
  return gulp.src(assets.src, {cwd: root, read:false, base:'app/assets'})
    .pipe(plumber())
    .pipe(symlink(assets.dev, options));
});

// Symlink Settings Folder
gulp.task('symlink:settings', function(){
  return gulp.src(settings.devSrc, {cwd: root, read:false, base:'settings/local'})
    .pipe(plumber())
    .pipe(symlink(function(file){
      return path.join(devRoot, 'settings/'+file.relative);
     }, options));
});

gulp.task('symlink:all', ['symlink', 'copy:dev:lib', 'copy:dev:assets', 'symlink:settings']);
