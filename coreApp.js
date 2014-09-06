/* dummy javascript module for nothing...
 *
 * By: Paulus Gandung Prakosa (syn-attack@devilzc0de.org)
 */

var coreApp = module.exports = coreApp || {};

coreApp.isObject = function( val ) {
	if ( !val || val == null ) {
		return ( false );
	}

	return ( val.constructor == Object ? true : false );
};

coreApp.isArray = function( val ) {
	if ( !val || val == null ) {
		return ( false );
	}

	return ( val.constructor == Array ? true : false );
};

coreApp.isString = function( val ) {
	if ( !val || val == null ) {
		return ( false );
	}

	return ( val.constructor == String ? true : false );
};

coreApp.isFunction = function( val ) {
	if ( !val || val == null ) {
		return ( false );
	}

	return ( val.constructor == Function ? true : false );
};

coreApp.deepExtend = function() {
	var target = undefined;
	var i = 1;

	if ( arguments.length == i ) {
		target = this;
		--i;
	}
	else {
		if ( coreApp.isObject( arguments[0] ) ) {
			target = arguments[0] || {};
		}
		else if ( coreApp.isFunction( arguments[0] ) ) {
			target = arguments[0].prototype || {};
		}
		else {
			target = {};
		}
	}

	for ( ; i < arguments.length; i++ ) {
		if ( !coreApp.isObject( arguments[i] ) ) {
			continue;
		}
		else {
			for ( var eachProps in arguments[i] ) {
				if ( target.hasOwnProperty( eachProps ) ) {
					if ( coreApp.isObject( target[eachProps] ) && coreApp.isObject( arguments[i][eachProps] ) ) {
						arguments.callee( target[eachProps], arguments[i][eachProps] );
					}
					else if ( ( coreApp.isArray( target[eachProps] ) && coreApp.isArray( arguments[i][eachProps] ) ) ||
						  ( coreApp.isArray( target[eachProps] ) && !coreApp.isArray( arguments[i][eachProps] ) ) ) {
						target[eachProps].concat( arguments[i][eachProps] );
					}
					else if ( !coreApp.isArray( target[eachProps] ) && coreApp.isArray( arguments[i][eachProps] ) ) {
						var temp = target[eachProps];
						target[eachProps] = target[eachProps] || {};
						target[eachProps].concat( temp, arguments[i][eachProps] );
					}
					else {
						target[eachProps] = arguments[i][eachProps];
					}
				}
				else {
					target[eachProps] = arguments[i][eachProps];
				}
			}
		}
	}

	return ( target );
};
