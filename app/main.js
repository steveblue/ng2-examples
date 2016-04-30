/*global head, System */

(function( window, head ) {
  'use strict';

  head
    .load(
      'lib/es6-shim.js',
      'lib/angular2-polyfills.js',
      'lib/system.src.js',
      'lib/Rx.js',
      'lib/angular2.dev.js',
      'lib/router.dev.js'
    )
    .ready('ALL', function() {


      System.config({
        transpiler: 'typescript',
        typescriptOptions: { emitDecoratorMetadata: true },
        packages: {'src': {defaultExtension: 'js'}}
      });

      System.import('./app.js').then(null, console.error.bind(console));


    }); // end .ready()
}( window, head ));
