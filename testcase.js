/*	testcase.js - unit test case object
 *
 * Copyright (c) 2010 Oliver C Dodd [http://01001111.net]
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
TestCase = function(testObject,name) {
	testObject = testObject || {};
	this.object = testObject;
	this.name = name || "Untitled Test Case";
	// setup?
	this.setup = testObject.setup !== undefined
		? function() { try { this.object.setup(); } catch(e) { throw("setup failed") } }
		: function() {};
	// teardown?
	this.teardown = testObject.teardown !== undefined
		? function() { try { this.object.teardown(); } catch(e) { throw("teardown failed") } }
		: function() {};
	// find tests
	this.tests = [];
	for (var k in testObject) {
		if ((k+"").search("test") === 0) {
			this.tests.push(k);
		}
	}
	// failures
	this.failures = {};
	this.testsRun = 0;
	this.testsFailed = 0;
};
TestCase.prototype.run = function() {
	var n = this.tests.length;
	for (var i = 0; i < n; i++) {
		var test = this.tests[i];
		try {
			this.setup();
			this.object[test]();
			this.teardown();
		} catch(e) {
			this.failures[test] = e;
			this.testsFailed ++;
		}
		this.testsRun++;
	}
}
TestCase.prototype.getResults = function() {
	var results = this.name+":"+
		" tests="+this.tests.length+
		" run="+this.testsRun+
		" failures="+this.testsFailed;
	if (this.testsFailed >0){
		results += "\n\tFailed Tests:\n";
		for (var testName in this.failures) {
			var e = this.failures[testName];
			results += "\t\t"+testName+": "+e.message+" ("+e.fileName+":"+e.lineNumber+")\n";
		}
	}
	return results;
}