var _ = require('lodash');

function isWdioContext() {
	return _.isObject(browser) && _.isFunction(browser.addCommand);
}

function registerLogCommands(log) {
	if (isWdioContext()) {
		browser.addCommand('testableLogTrace', function async() {
			return log.trace.apply(log, arguments);
		});
		browser.addCommand('testableLogDebug', function async() {
			return log.debug.apply(log, arguments);
		});
		browser.addCommand('testableLogInfo', function async() {
			return log.info.apply(log, arguments);
		});
		browser.addCommand('testableLogError', function async() {
			return log.error.apply(log, arguments);
		});
		browser.addCommand('testableLogFatal', function async() {
			return log.fatal.apply(log, arguments);
		});
	}
}

function registerCsvCommands(csv) {
	if (isWdioContext()) {
		browser.addCommand('testableCsvGet', function async(name, index) {
			return csv.open(name).get(index);
		});
		browser.addCommand('testableCsvRandom', function async(name) {
			return csv.open(name).random();
		});
		browser.addCommand('testableCsvNext', function async(name, options) {
			return csv.open(name).next(options);
		});
	}
}

function registerResultsCommands(results) {
	if (isWdioContext()) {
		browser.addCommand('testableResult', function(resource, url) {
			return results(resource, url);
		})
		browser.addCommand('testableTiming', function async(result, name, val, units) {
			return result.timing(name, val, units);
		});
		browser.addCommand('testableCounter', function async(result, name, val, units) {
			return result.counter(name, val, units);
		});
		browser.addCommand('testableHistogram', function async(result, name, key, val) {
			return result.histogram(name, key, val);
		});
	}
}

function registerInfoCommands(info) {
	if (isWdioContext()) {
		browser.addCommand('testableInfo', function () {
			return info;
		});
	}
}

function registerStopwatchCommands(stopwatch) {
	if (isWdioContext()) {
		browser.addCommand('testableStopwatch', function async(code, metricName, resource) {
			return stopwatch(code, metricName, resource);
		});
	}
}


module.exports.registerLogCommands = registerLogCommands;
module.exports.registerCsvCommands = registerCsvCommands;
module.exports.registerResultsCommands = registerResultsCommands;
module.exports.registerInfoCommands = registerInfoCommands;
module.exports.registerStopwatchCommands = registerStopwatchCommands;