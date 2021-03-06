( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} ( function() {

$.ui = $.ui || {};

return $.ui.version = "1.12.0-rc.2";

} ) );
