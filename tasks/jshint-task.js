
var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    watch   = require('gulp-watch'),
    paths   = require('../config.paths.js'),
    notify  = require('gulp-notify'),
    livereload = require('gulp-livereload'),

// Paths
    root        = paths.rootDir,
    lintPaths   = paths.jshint,


// Options
    standardNotification = {
      title: 'JSHint Error',
      message: function(file){
        if(file.jshint.success){ return false; }
        var errors = file.jshint.results.map(function(data){
          if(data.error){
            return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
          }
        }).join('\n');
        return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
      }
    };

// Lint All Files
gulp.task('jshint:all', function(){
  return gulp.src(lintPaths.all, {cwd: root})
    .pipe(jshint(lintPaths.rc))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify(standardNotification));
});

// Lint App Files
gulp.task('jshint:app', function(){
  return gulp.src(lintPaths.app, {cwd: root})
    .pipe(jshint(lintPaths.rc))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify(standardNotification));
});

// Lint App Files and trigger LiveReload
gulp.task('jshint:dev', function(){
  return gulp.src(lintPaths.app, {cwd: root})
    .pipe(jshint(lintPaths.rc))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify(standardNotification));
    //.pipe(livereload());
});


// Lint App Files Default Task
gulp.task('jshint', ['jshint:app']);
