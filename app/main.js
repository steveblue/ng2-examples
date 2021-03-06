/*global head, System */

(function( window, head ) {
  'use strict';

  head
    .load(
      'lib/es6-shim/es6-shim.js',
      'lib/systemjs/dist/system.src.js',
      'lib/reflect-metadata/Reflect.js',
      'lib/zone.js/dist/zone.js',
      'https://cdn.firebase.com/js/client/2.4.2/firebase.js',
      'lib/d3/d3.js',
      'lib/three/three.js',
      'src/util/FirstPersonControls.js',
      'src/util/TerrainLoader.js'
      
    )
    .ready('ALL', function() {

      System.import('./system-config.js').then(function () {
        System.import('./app.js');
      }).catch(console.error.bind(console));

    }); // end .ready()
}( window, head ));
