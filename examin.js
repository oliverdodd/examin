/*	examin.js - simple unit testing framework for javascript
 *
 * Copyright (c) 2010 Oliver C Dodd [http://01001111.net]
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
Examin = {
	testCases: []
};
Examin.registerTest = function(testCase) {
	Examin.testCases.push(testCase);
};
Examin.registerTests = function(testCases) {
	for (var i in testCases) {
		Examin.testCases.push(testCases[i]);
	}
};
Examin.runTests = function(e) {
	e = e || document.body;
	for (var i in Examin.testCases) {
		var testCase = Examin.testCases[i];
		testCase.run();
		e.innerHTML += testCase.getResults();
	}
}