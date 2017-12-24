"use strict";

const fs = require('fs')
	,log4js = require('log4js')
	,conf = require('../configs/logger.js')
	,tl = require('log4js-tagline');

/*
const logRoute = new log4jsRoute(log4js, {"format": "(route(@route))", "route": "/"});

log4jsExtend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)"
});
*/

//log4js.configure('./lib/appenders/main.json');	
	
exports = module.exports = class logger{
	constructor(callback) {
		var t = this;
		var app;
		log4js.configure({
			appenders: { mc: { type: conf.vars.log_file_type, filename: conf.vars.log_file_name, daysToKeep: conf.vars.log_file_days_to_keep }},
			categories: { default: { appenders: [conf.vars.appender_name], level: 'trace' } }
		});		

		t.tagline = new tl(log4js, {
			display: ["trace", "debug", "info", "warn", "error", "fatal", "mark"]
		});
		app = t.tagline.appender('route');
		t.rte = new app().setConfig({"format": "rte(@route)"}).setInput('/');
		app = t.tagline.appender('anyMsg');
		t.bod = new app().setConfig({"format": "body(@body)", "replace": "@body"});
		app = t.tagline.appender('anyMsg');
		t.act = new app().setConfig({"format": "act(@action)", "replace": "@action"});
		app = t.tagline.appender('anyMsg');
		t.remoteIP = new app().setConfig({"format": "reqIP(@ip)", "replace": "@ip"});
		app = t.tagline.appender('anyMsg');
		t.cli = new app().setConfig({"format": "client(@action)", "replace": "@action"});
		app = t.tagline.appender('anyMsg');
		t.qry = new app().setConfig({"format": "qry(@action)", "replace": "@action"});
		app = t.tagline.appender('error');
		t.err = new app().setConfig({"format": "msg(@error)"});
		app = t.tagline.appender('line');
		t.lne = new app().setConfig({"format": "lne(@name(): @file:@line:@column)"});
		app = t.tagline.appender('counter');
		t.cnt = new app().setConfig({"format": "cnt(@count)", "type": "daily"});
		app = t.tagline.appender('stopwatch');
		t.stw = new app().setConfig({"format": "stopwatch(@stop - @start = @elapsed/mili)"});
		app = t.tagline.appender('organizational');
		t.org = new app().setConfig({"format": "someId(@org)"});

		if(!conf.vars.throttle_debug_messages)
			t.err.useCounter(false);   //use this to see all error messages.
		t.log = log4js.getLogger(conf.vars.appender_name);
		t.clear_logs(callback);
		callback(t);
	}
	
	clear_logs(){
		var t = this;
		if(conf.vars.clear_logs){
			fs.writeFile(conf.vars.log_file_name, "", function (err) {
				t.log.info('Log file has been flushed clean.').tagline();;
				t.log.trace('Entering cheese testing').tagline();;
				t.log.debug('Got cheese.').tagline();;
				t.log.info('Cheese is Gouda.').tagline();;
				t.log.warn('Cheese is quite smelly.').tagline();;
				t.log.error('Cheese is too ripe!').tagline();
				t.log.fatal('Cheese was breeding ground for listeria.').tagline();
				/*
				t.clfn.info('Indicates class and function name.');
				t.soapdown.error('Indicates the WMS SOAP service is down.');
				t.sql_q.info('Indicates an SQL statement.');
				*/
				if (err) return console.log(err);
			});
		}
		return t;
	}
};