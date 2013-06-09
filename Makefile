clean:
	rm -Rf build/

tests:
	mkdir -p build/test
	cp test/test_runner.html build/test/
	browserify test/*.spec.js > build/test/test.js