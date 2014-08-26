/*
 * RC4 (ARCFOUR) Encryption Algorithm
 *
 * Author: Paulus Gandung Prakosa (syn-attack@devilzc0de.org)
 *
 * Changelog:
 * - 0.0.1-revised: Move from procedural programming paradigm to unobstrusive and object-oriented.
 */

( function( window, undefined ) {
	_role = "library";
	_version = "0.0.1-revised";

	rc4 = function( _data, key, mode ) {
		return new rc4._fx_.initialize( _data, key, mode );
	};

	rc4._fx_ = rc4.prototype = {
		role: _role,
		version: _version,
		constructor: rc4,

		initialize: function( _data, key, mode ) {
			this._data = _data;
			this.key = key;
			this.mode = mode;

			return this;
		},

		_exec: function() {
			if (this.mode === rc4.RC4_MODE_ENCRYPT) {
				return rc4.encrypt(this._data, this.key);
			}
			else if (this.mode === rc4.RC4_MODE_DECRYPT) {
				return rc4.decrypt(this._data, this.key);
			}
		}
	};

	function parse_8_bit_int_to_hex( _fn_num ) {
		if (typeof _fn_num !== "number") {
			return false;
		}

		if (_fn_num > 255) {
			return false;
		}

		var hex_table_lookup = [
			"0", "1", "2", "3", "4", "5", "6", "7",
			"8", "9", "a", "b", "c", "d", "e", "f"
		];

		var buffer = "";

		buffer += hex_table_lookup[((_fn_num & 0xf0) >> 4)];
		buffer += hex_table_lookup[(_fn_num & 0x0f)];

		return (buffer);
	}

	rc4._fx_.initialize.prototype = rc4._fx_;

	rc4.RC4_MODE_ENCRYPT = rc4._fx_.RC4_MODE_ENCRYPT = 0;
	rc4.RC4_MODE_DECRYPT = rc4._fx_.RC4_MODE_DECRYPT = 1;

	rc4.key_scheduler = rc4._fx_.key_scheduler = function( key, key_length ) {
		if (typeof key !== "string") {
			return false;
		}

		if (typeof key_length !== "number") {
			return false;
		}

		var rc4_key_sched = [];
		var j = 0;

		for (i = 0; i < 256; i++) {
			rc4_key_sched[i] = i;
		}

		var temp = 0;

		for (i = 0; i < 256; i++) {
			j = ((j + rc4_key_sched[i]) + key.charCodeAt(i % key_length)) % 256;
			temp = rc4_key_sched[i];
			rc4_key_sched[i] = rc4_key_sched[j];
			rc4_key_sched[j] = temp;
		}

		return (rc4_key_sched);
	}

	rc4.pseudo_random_generator = rc4._fx_.pseudo_random_generator = function( rc4_key_sched, _preferred_length ) {
		if (typeof rc4_key_sched !== "object") {
			return false;
		}

		if (typeof _preferred_length !== "number") {
			return false;
		}

		var rc4_key_stream = [];
		var i = 0;
		var j = 0;
		var temp = 0;

		for (_lp = 0; _lp < _preferred_length; _lp++) {
			i = (i + 1) % 256;
			j = (j + rc4_key_sched[i]) % 256;
			temp = rc4_key_sched[i];
			rc4_key_sched[i] = rc4_key_sched[j];
			rc4_key_sched[j] = temp;
			rc4_key_stream[_lp] = rc4_key_sched[(rc4_key_sched[i] + rc4_key_sched[j]) % 256];
		}

		return (rc4_key_stream);
	};

	rc4.encrypt = rc4._fx_.encrypt = function( _data, key ) {
		if (typeof _data !== "string") {
			return false;
		}

		if (typeof key !== "string") {
			return false;
		}

		var buffer = "";
		var current_key_sched = rc4.key_scheduler(key, key.length);
		var current_key_stream = rc4.pseudo_random_generator(current_key_sched, _data.length);

		for (i = 0; i < _data.length; i++) {
			buffer += parse_8_bit_int_to_hex(_data.charCodeAt(i) ^ current_key_stream[i]);
		}

		return (buffer);
	}

	rc4.decrypt = rc4._fx_.decrypt = function( _data, key ) {
		if (typeof _data !== "string") {
			return false;
		}

		if (typeof key !== "string") {
			return false;
		}

		var buffer = "";
		var _temp = [];
		var current_key_sched = rc4.key_scheduler(key, key.length);
		var current_key_stream = rc4.pseudo_random_generator(current_key_sched, _data.length);

		for (i = 0; i < _data.length; i += 2) {
			_temp.push(parseInt(_data[i] + _data[i + 1], 16));
		}

		for (i = 0; i < _temp.length; i++) {
			buffer += String.fromCharCode(_temp[i] ^ current_key_stream[i]);
		}

		return (buffer);
	}

	window.rc4 = rc4;
})( window );