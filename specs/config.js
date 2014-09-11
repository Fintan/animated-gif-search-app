//requirejs.config({});
//http://weblog.bocoup.com/effective-unit-testing-with-amd/
//different loading context for each require
(function(window) {
	var contextId = 0;

	window.testRequire = function() {
		var context = requirejs.config({
			urlArgs: 'now=' + Date.now(),
			context: 'test-context' + contextId++
		});

		return context.apply(this, arguments);
	};
}(typeof global === 'undefined' ? this : global));