/**
 * @author Bjorn Sandvik / http://thematicmapping.org/
 */
/* jshint ignore:start */


THREE.TerrainLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.TerrainLoader.prototype = {

	constructor: THREE.TerrainLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;
		var request = new XMLHttpRequest();

		if ( onLoad !== undefined ) {

			request.addEventListener( 'load', function ( event ) {

				onLoad( new Uint16Array( event.target.response ) );
				scope.manager.itemEnd( url );

			}, false );

		}

		if ( onProgress !== undefined ) {

			request.addEventListener( 'progress', function ( event ) {

				onProgress( event );

			}, false );

		}

		if ( onError !== undefined ) {

			request.addEventListener( 'error', function ( event ) {

				onError( event );

			}, false );

		}

		if ( this.crossOrigin !== undefined ) request.crossOrigin = this.crossOrigin;

		if ( window.location.hostname === 'localhost' ) {
			request.open( 'GET', url, true );
		} else if ( window.location.hostname === '192.168.1.13' ) {
			request.open( 'GET', url, true );
		} else {
			request.open( 'GET', 'https://' + window.location.hostname + '/' + url, true );
		}

		request.responseType = 'arraybuffer';

		request.send( null );

		scope.manager.itemStart( url );

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	}

};
/* jshint ignore:end */
