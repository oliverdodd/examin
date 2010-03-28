/*	assert.js - assertion javascript object
 *
 * Copyright (c) 2010 Oliver C Dodd [http://01001111.net]
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
Assert = {
	msg: function(defaultMessage,provided) {
		return (provided === undefined) ? defaultMessage : provided;
	},
	fail: function(message) {
		throw(new AssertionException(message));
	}
};
Assert.containsKey = function(arrayOrObject,key,message) {
	message = Assert.msg("array or object contains key ("+key+")", message);
	return Assert.isTrue(arrayOrObject[key] != undefined, message);
};
Assert.equals = function(a,b,message) {
	message = Assert.msg(a+" === "+b, message);
	return Assert.isTrue(a === b, message);
};
Assert.functionReturns = function(func,expected,message) {
	message = Assert.msg(a+" returns "+b, message);
	try {
		var r = func();
		return Assert.equals(r,expected);
	} catch(e) {
		Assert.fail("error evaluating function ("+func+"): "+e);
	}
};
Assert.greaterThan = function(a,b,message) {
	message = Assert.msg(a+" > "+b, message);
	return Assert.isTrue(a > b, message);
};
Assert.greaterThanOrEqualTo = function(a,b,message) {
	message = Assert.msg(a+" >= "+b, message);
	return Assert.isTrue(a >= b, message);
};
Assert.isBlank = function(a,message) {
	message = Assert.msg("is blank", message);
	return Assert.equals(a, "", message);
};
Assert.isFalse = function(a,message) {
	message = Assert.msg("condition evaluates to false", message);
	return a ? Assert.fail(message) : true;
};
Assert.isNull = function(a,message) {
	message = Assert.msg("is null", message);
	return Assert.equals(a, null, message);
};
Assert.isNumber = function(a,message) {
	message = Assert.msg("is number", message);
	return Assert.isTrue(!isNaN(a), message);
};
Assert.isTrue = function(a,message) {
	message = Assert.msg("condition evaluates to true", message);
	return a ? true : Assert.fail(message);
};
Assert.isUndefined = function(a,message) {
	message = Assert.msg("is undefined", message);
	return Assert.equals(a, undefined, message);
};
Assert.lessThan = function(a,b,message) {
	message = Assert.msg(a+" < "+b, message);
	return Assert.isTrue(a < b, message);
};
Assert.lessThanOrEqualTo = function(a,b,message) {
	message = Assert.msg(a+" <= "+b, message);
	return Assert.isTrue(a <= b, message);
};
Assert.notBlank = function(a,message) {
	message = Assert.msg("not blank", message);
	return Assert.notEqual(a, "", message);
};
Assert.notEqual = function(a,b,message) {
	message = Assert.msg(a+" != "+b, message);
	return Assert.isTrue(a !== b, message);
};
Assert.notNull = function(a,message) {
	message = Assert.msg("not null", message);
	return Assert.notEqual(a, null, message);
};
Assert.notNumber = function(a,message) {
	message = Assert.msg("not number", message);
	return Assert.isTrue(isNaN(a), message);
};
Assert.notSame = function(a,b,message) {
	message = Assert.msg(a+" != "+b, message);
	return Assert.isTrue(a != b, message);
};
Assert.notUndefined = function(a,message) {
	message = Assert.msg("not undefined", message);
	return Assert.notEqual(a, undefined, message);
};
Assert.same = function(a,b,message) {
	message = Assert.msg(a+" == "+b, message);
	return Assert.isTrue(a == b, message);
};
Assert.stringEndsWith = function(s,end,message) {
	message = Assert.msg("string ends with "+end, message);
	return Assert.equals(s.lastIndexOf(end), s.length - end.length, message);
};
Assert.stringStartsWith = function(s,start,message) {
	message = Assert.msg("string starts with "+start, message);
	return Assert.equals(s.indexOf(start), 0, message);
};

AssertionException = function(msg) {
	this.name = "AssertionException";
	this.message = msg;
	this.getErrorLocation();
};
AssertionException.prototype.getErrorLocation = function() {
	var thisFile = null;
	var stack = (new Error().stack).split("\n");
	for (var i in stack) {
		var call = (/(\([^\(]*\))@(.+):([\d]+)/).exec(stack[i]);
		if (call && call.length == 4) {
			var f = call[2];
			var l = call[3];
			if (thisFile == null) {
				thisFile = f;
			} else if (thisFile != f) {
				this.fileName = f;
				this.lineNumber = l;
				return;
			}
		}
	}
};