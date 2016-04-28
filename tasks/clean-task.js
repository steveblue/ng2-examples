
var gulp    = require('gulp'),
    del  = require('del'),
    paths   = require('../config.paths.js'),

// Paths
    root    = paths.rootDir,
    toClean = paths.clean;

// Default Clean is 'clean:dev'
gulp.task('clean', ['clean:dev']);

// Clean Dev Root
gulp.task('clean:dev', function(callback){

  del(toClean.dev, function(error){
    if( error ){
      console.log('Error on gulp clean.');
      console.log(error);
    }
    callback();
  });

});

// Clean Prod Root
gulp.task('clean:prod', function(callback){

  del(toClean.prod, function(error){
    if( error ){
      console.log('Error on gulp clean:prod ');
      console.log(error);
    }
    callback();
  });

});

gulp.task('clean:both', ['clean:dev', 'clean:prod']);
