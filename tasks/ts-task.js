
var gulp   = require('gulp'),
    tsc     = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    stylish = require('gulp-tslint-stylish'),
    merge  = require('merge2'),
    paths  = require('../config.paths'),
    tsConfig = require('../config.ts'),
    sourcemaps = require('gulp-sourcemaps'),
    config;


// Options
//var tsProject = ts.createProject('app/tsconfig.json'),

if(process.argv[2] === 'dev') {
    config = require('../settings/local/config')[0];
    tsConfig = tsConfig.dev;
} else if(process.argv[2] === 'prod') {
    config = require('../settings/prod/config')[0];
    tsConfig = tsConfig.prod;
} else {
    config = require('../settings/local/config')[0];
    tsConfig = tsConfig.dev;
}


var tsProject = tsc.createProject(tsConfig);

gulp.task('ts:lint', function() {
  return gulp.src(paths.ts.lint)
    .pipe(tslint({
      configuration: 'tslint.json'
    }))
    .pipe(tslint.report(stylish, {
        emitError: false,
        sort: true,
        bell: true,
        fullPath: true
      }));
});



gulp.task('ts:app', function() {

	var tsResult = gulp.src(paths.ts.src)
                    .pipe(sourcemaps.init())
					.pipe(tsc(tsProject));
                    
   return merge([
		tsResult.dts.pipe(gulp.dest(tsConfig.outDir)),
		tsResult.js
                 .pipe(sourcemaps.write('.'))
                 .pipe(gulp.dest(tsConfig.outDir))
	]);

});


// Lint App Files Default Task
gulp.task('ts', ['ts:app']);
