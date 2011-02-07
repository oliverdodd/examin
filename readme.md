examin
======
A simple Javascript unit testing utility.


Usage
-----
	MyTest = {
		setup: function() {
			// do something
		},
		test_string: function {
			var s = "test";
			Assert.notNull(s);
			Assert.notBlank(s);
		}
		teardown: function() {
			// do something
		}
	};
	
	var myTestCase = new TestCase(MyTest, "my test case");
	Examin.registerTest(myTestCase);
	Examin.runTests();
	
Assertions (assert.js)
----------------------

+ **Assert.containsKey(a,b,message)**
	- Assert array or object contains key
+ **Assert.equals(arrayOrObject,key,message)**
	- Assert equality
+ **Assert.functionReturns(func,expected,message)**
	- Assert function returns expected value
+ **Assert.greaterThan(a,b,message)**
	- Assert a > b
+ **Assert.greaterThanOrEqualTo(a,b,message)**
	- Assert a >= b
+ **Assert.isBlank(a,message)**
	- Assert a is blank
+ **Assert.isFalse(a,message)**
	- Assert a is false
+ **Assert.isNull(a,message)**
	- Assert a is null
+ **Assert.isNumber(a,message)**
	- Assert a is a number
+ **Assert.isTrue(a,message)**
	- Assert a is true
+ **Assert.isUndefined(a,message)**
	- Assert a is undefined
+ **Assert.lessThan(a,b,message)**
	- Assert a < b
+ **Assert.lessThanOrEqualTo(a,b,message)**
	- Assert a <= b
+ **Assert.notBlank(a,message)**
	- Assert a is not blank
+ **Assert.notEqual(a,b,message)**
	- Assert a is not equal to b
+ **Assert.notNull(a,message)**
	- Assert a is not null
+ **Assert.notNumber(a,message)**
	- Assert a is not a number
+ **Assert.notSame(a,b,message)**
	- Assert a is not the same as b
+ **Assert.notUndefined(a,message)**
	- Assert a is not undefined
+ **Assert.same(a,b,message)**
	- Assert a is the same as b
+ **Assert.stringEndsWith(s,end,message)**
	- Assert s ends with the provided string
+ **Assert.stringStartsWith(s,start,message)**
	- Assert s starts with the provided string

Test Cases (testcase.js)
------------------------

Create a suite of tests by creating an object with a series of methods:

	MyTestSuite = {
		to_test: "",
		
		setup: function()
			MyTestSuite.to_test = 'test';
		},
		checkSomething: function(s)
			Assert.stringStartsWith(s,MyTestSuite.to_test,"string starts with "+ MyTestSuite.to_test);
		},
		test_something: function()
			checkSomething("test");
		},
		test_something2: function()
			checkSomething("test2");
		},
		teardown: function() {
			// do something
		}
	};

The test names must start with *test*.
The method named *setup()* will run before each test and *teardown()* will run after each test.
Helper methods can be named anything that won't clash with these three conventions.

Running Tests (examin.js)
-------------------------

	var testCase1 = new TestCase(MyTestSuite, "my first test");
	var testCase2 = new TestCase(MyTestSuite2, "my second test");
	
	Examin.registerTest(testCase1);
	// or
	Examin.registerTests([testCase1, testCase2]);
	
	Examin.runTests();
	