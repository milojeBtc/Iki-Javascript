var appHandler = require("./app");

var foo = {
	name: "Paulus Gandung Prakosa",
	age: 26,
	job: "Software Engineer"
};

var fooMethodCallback = appHandler.register( null, Object.defineProperties( {}, {
	getName: {
		value: function() {
			return (function( val ) {
				if ( typeof val !== "string" || !(!!val) ) {
					return false;
				}

				return ( val );
			})( this.name );
		},
		enumerable: true
	},
	getAge: {
		value: function() {
			return (function( val ) {
				if ( typeof val !== "number" || !(!!val) ) {
					return false;
				}

				return ( val );
			})( this.age );
		},
		enumerable: true
	},
	getJob: {
		value: function() {
			return (function( val ) {
				if ( typeof val !== "string" || !(!!val) ) {
					return false;
				}

				return ( val );
			})( this.job );
		},
		enumerable: true
	}
}));

// calling app.register without getting it's return value
appHandler.register( foo, fooMethodCallback );

console.log( Object.getOwnPropertyNames( foo ) );
console.log( Object.getOwnPropertyNames( fooMethodCallback ) );

for ( eachProps in foo ) {
	if ( foo[eachProps].constructor === Function && typeof foo[eachProps] === "function" ) {
		console.log( foo[eachProps]() );
	}
}
