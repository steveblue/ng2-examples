
var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    mqpacker = require('css-mqpacker'),
    neat    = require('node-neat').includePaths,
    notify  = require('gulp-notify'),
    fs      = require('fs'),
    livereload = require('gulp-livereload'),

// Paths
    paths   = require('../config.paths.js').sass,

// Build Options
    options = {
        ts: {
            style : 'expanded',
            comments : true
        },
        dev: {
            project: fs.realpathSync(__dirname + '/..'),
            includePaths: ['styles'].concat(neat),
            css: paths.dev,
            sass: paths.sass,
            style : 'expanded',
            comments : true
        },
        devmin: {
              project: fs.realpathSync(__dirname + '/..'),
              includePaths: ['styles'].concat(neat),
              css: paths.dev,
              sass: paths.sass,
              style : 'compressed',
              comments : false
        },
        prod: {
            project: fs.realpathSync(__dirname + '/..'),
            includePaths: ['styles'].concat(neat),
            css: paths.prod,
            sass: paths.sass,
            style : 'compressed',
            comments : false
        }
    },
    errorNotifier = function(error){
      console.error(error.toString());
      this.emit('end');
    },
    processors = {
      ts: [
         autoprefixer
      ],
      dev: [
         autoprefixer,
         mqpacker
      ],
      prod: [
         autoprefixer,
         cssnano,
         mqpacker
      ]
    };

// Default sass task is sass:dev
gulp.task('sass:dev', ['sass:compile', 'sass:compile:ts']);
gulp.task('sass:dev:min', ['sass:compile:min']);
gulp.task('sass:prod', ['sass:compile:prod']);



// Compile Dev styles with Compass instead
// gulp.task('sass:compile', function () {
//   return gulp.src(paths.src)
//         .pipe(compass(options.dev))
//         .on('error', errorNotifier)
//         .pipe(gulp.dest(paths.dev));
// });

gulp.task('sass:compile:ts', function () {
  return gulp.src(paths.ts, { base: "./" })
    .pipe(plumber())
    .pipe(sass(options.ts))
    .pipe(postcss(processors.ts))
    .pipe(gulp.dest('.'));
});

gulp.task('sass:compile', function () {
  return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(sass(options.dev))
    .pipe(postcss(processors.dev))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.dev));
});

// Dev Styles minified
gulp.task('sass:compile:min', function () {
  return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(sass(options.dev.min))
    .pipe(postcss(processors.prod))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.dev));
});


// Prod styles minified
gulp.task('sass:compile:prod', function () {
  return gulp.src(paths.src)
    .pipe(plumber())
    .pipe(sass(options.prod))
    .pipe(postcss(processors.prod))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.prod));
});
