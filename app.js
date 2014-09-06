var app = app || {};

module.exports = app;

app.register = function() {
	var target = undefined;
	var i = 1;

	if ( arguments.length == 1 ) {
		target = this;
		--i;
	}
	else {
		target = arguments[0] || {};
	}

	for ( ; i < arguments.length; i++ ) {
		if ( arguments[i].constructor !== Object && typeof arguments[i] === "object" ) {
			continue;
		}
		else {
			for ( eachProps in arguments[i] ) {
				if ( arguments[i][eachProps].constructor === Object &&
				     typeof arguments[i][eachProps] === "object" ) {
					arguments.callee( target[eachProps] || {}, arguments[i][eachProps] );
				}
				else {
					target[eachProps] = arguments[i][eachProps];
				}
			}
		}
	}

	return ( target);
};
