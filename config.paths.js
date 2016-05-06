
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
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/angular2/bundles/http.dev.js',
      'bower_components/headjs/dist/1.0.0/head.js',
      'node_modules/d3/d3.js'


    ],
    min:[
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/angular2/bundles/http.dev.js',
      'bower_components/headjs/dist/1.0.0/head.load.min.js',
      'node_modules/d3/d3.min.js'


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
    src: ['node_modules/angular2/ts/typings/node/node.d.ts',
          'node_modules/angular2/typings/browser.d.ts',
          'app/*.ts',
          'app/**/*.ts'],
    lint: ['app/*.ts',
          'app/**/*.ts']
  },

  html : {
    app: ['app/**/*.html', 'app/*.html']
  },

// Symlink
  symlink: [
    '!app/components/.new/**/*.*',
    'app/**/*.js',
    'app/src/**/*.css',
    'app/**/*.json',
    'app/**/*.html',
    'app/*.html'
  ],

  copy: [
    '!app/components/.new/**/*.*',
    'app/src/**/*.css',
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
    ts: ['app/src/**/*.scss'],
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
