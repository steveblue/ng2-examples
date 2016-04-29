
var gulp   = require('gulp'),
    ts     = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    stylish = require('gulp-tslint-stylish'),
    merge  = require('merge2'),
    paths  = require('../config.paths');


// Options
//var tsProject = ts.createProject('app/tsconfig.json'),
var tsProject = ts.createProject({
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  module: 'commonjs',
  target: 'es5',
  noImplicitAny: false,
  sourceMap: false
});

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
					.pipe(ts(tsProject));

	return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
		tsResult.dts.pipe(gulp.dest(paths.rootDir+'/app/def')),
		tsResult.js.pipe(gulp.dest(paths.rootDir+'/app'))
	]);

  // return gulp.src(paths.ts.src)
  //   .pipe(ts(tsProject.compilerOptions))
  //   .pipe(gulp.dest(paths.rootDir+'/app'));

});


// Lint App Files Default Task
gulp.task('ts', ['ts:app']);
