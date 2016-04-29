
var gulp    = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    paths     = require('../config.paths'),
    //tsProject = ts.createProject('app/tsconfig.json'),


// Paths
    root        = paths.rootDir,
    devDir      = paths.devDir,
    prodDir     = paths.prodDir,
    lintPaths   = paths.jshint;


// Options

var tsProject = ts.createProject({
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  module: 'commonjs',
  target: 'es5',
  noImplicitAny: false,
  sourceMap: false
});

gulp.task('ts:app', function() {
	var tsResult = gulp.src(['node_modules/angular2/ts/typings/node/node.d.ts',
                            'node_modules/angular2/typings/browser.d.ts',
                            'app/*.ts', 
                            'app/**/*.ts'])
					.pipe(ts(tsProject));

	return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
		tsResult.dts.pipe(gulp.dest(paths.rootDir+'/app/def')),
		tsResult.js.pipe(gulp.dest(paths.rootDir+'/app'))
	]);

  // return gulp.src(['node_modules/angular2/ts/typings/node/node.d.ts',
  //                  'node_modules/angular2/typings/browser.d.ts',
  //                  'app/*.ts',
  //                  'app/**/*.ts'])
  //   .pipe(ts(tsProject.compilerOptions))
  //   .pipe(gulp.dest(paths.rootDir+'/app'));

});


// Lint App Files Default Task
gulp.task('ts', ['ts:app']);
