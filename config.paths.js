
// Main Folder Locations
var rootDir   = __dirname,
    devDir    = rootDir + '/build/www',
    prodDir   = rootDir + '/build/prod';

// Export Specific Paths
module.exports = {
  'rootDir': rootDir,
  'devDir':  devDir,
  'prodDir': prodDir,

// Lib Files
  lib: {
    src:[
      'node_modules/rxjs/**/*.js',
      'node_modules/rxjs/**/*.map',
      'node_modules/@angular/**/*.js',
      'node_modules/@angular/**/*.map',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/reflect-metadata/Reflect.js.map',
      'node_modules/headjs/dist/1.0.0/head.js',
      'node_modules/d3/d3.js',
      'node_modules/firebase/firebase.js',
      'node_modules/three/three.js'
    ],
    min:[
      'node_modules/rxjs/**/*.js',
      'node_modules/rxjs/**/*.map',
      'node_modules/@angular/**/*.js',
      'node_modules/@angular/**/*.map',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/reflect-metadata/Reflect.js.map',
      'node_modules/headjs/dist/1.0.0/head.load.min.js',
      'node_modules/d3/d3.min.js',
      'node_modules/firebase/firebase.js',
      'node_modules/three/three.min.js'
    ],
    dev:  devDir  + '/lib',
    prod: prodDir + '/lib'
  },

// JSHINT
  jshint: {
    src:  rootDir + '/.jshintrc',
    all: ['app/*.js', 'app/**/*.js', './*.js', 'tasks/**/*.js', '!./settings/*.js'],
    app: ['app/**/*.js']
  },

  ts : {
    src: ['typings/browser.d.ts',
          'app/*.ts',
          'app/**/*.ts'],
    lint: ['!app/src/scene/*.ts',
           'app/*.ts',
           'app/**/*.ts'
          ]
  },

  html : {
    app: ['app/**/*.html', 'app/*.html']
  },

// Symlink
  symlink: [
    '!app/components/.new/**/*.*',
    'app/**/*.js',
    'app/*.css',
    'app/**/*.css',
    'app/**/*.json',
    'app/**/*.html',
    'app/*.html'
  ],

  copy: [
    '!app/components/.new/**/*.*',
    'app/*.css',
    'app/**/*.css',
    'app/**/*.json',
    'app/**/*.html',
    'app/*.html'
  ],

// Settings
    settings: {
      devSrc:  ['settings/local/*.js','settings/local/*.json'],
      prodSrc:  ['settings/prod/*.js','settings/prod/*.json'],
      dev:  devDir  + '/settings',
      prod: prodDir + '/settings'
    },

// Assets
  assets: {
    src:  ['app/assets/**/*.*', 'app/assets/**/**/*.*'],
    dev:  devDir  + '/assets',
    prod: prodDir + '/assets'
  },


// App SASS
  sass: {
    src: ['app/sass/**/*.scss','app/sass/*.scss'],
    ts: ['app/*.scss', 'app/**/*.scss', '!app/sass/*.scss'],
    sass:   'app/sass',
    tsOut:  devDir + '/src',
    dev:    devDir + '/css',
    prod:   prodDir + '/css'
  },

  uglify:['app/**/*.js'],

// Clean ie del
  clean: {
    dev:  devDir,
    prod: prodDir
  }
};
