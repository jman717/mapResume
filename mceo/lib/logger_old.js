
const Class = require('./class');
const log4js = require('log4js');
const fs = require('fs');
		
const logger = module.exports = Class.extend({
	sjo: null,
	log: null,
	logger_file_name: null,
	construct: function(jo){
		var t = this;
		var fn = 'logger.construct';
		t.sjo = jo;
		log4js.loadAppender('file');
		fs.stat("/var/log/", function (err, stats){
			// Log4J setup.
			var fname = 'mceoAPI.log';
			if (typeof stats == 'undefined')
				t.logger_file_name = fname;
			else
				t.logger_file_name = '/var/log/' + fname;
			log4js.addAppender(log4js.appenders.file(t.logger_file_name), 'messageLog', log4js.appenders.RollingFileAppender);

			t.log = log4js.getLogger('messageLog');

			t.log.setLevel('DEBUG');

			t.clear_logs();
			// End of Log4J setup
		});
	},
	functions: function(msg){
		var t = this;
		var fn = 'logger.functions';
		if(t.sjo.show_functions)
			t.log.info(msg);
	},
	debug: function(msg){
		var t = this;
		var fn = 'logger.debug';
		if(t.sjo.show_debug)
			t.log.debug(msg);
	},
	error: function(msg){
		this.log.error(msg);
	},
	fatal: function(msg){
		this.log.fatal(msg);
	},
	clear_logs: function(msg){
		var t = this;
		var fn = 'logger.clear_logs';
		if(t.sjo.clear_logs){
			fs.writeFile(t.logger_file_name, "", function (err) {
				t.log.info('Log file has been flushed clean.');
				t.log.trace('Trace');
				t.log.debug('Debug');
				t.log.info('Info');
				t.log.warn('Warn');
				t.log.error('Error');
				t.log.fatal('Fatal');
				if (err) return console.log(err);
				console.log(t.logger_file_name + ' file has been wiped clean for new input.\n');
				if(typeof t.sjo.callback != 'undefined'){
					t.log.debug(fn + " callback(" + t.sjo.callback_name + ')');
					t.sjo.callback(t.sjo.parent);
				}
			});
		}
	},
	info: function(msg){
		var t = this;
		var fn = 'logger.info';
		if(t.sjo.show_info)
			t.log.info(msg);
	},
	trace: function(msg){
		var t = this;
		var fn = 'logger.trace';
		if(t.sjo.show_trace)
			t.log.info(msg);
	},
	warn: function(msg){
		var t = this;
		var fn = 'logger.warn';
		if(t.sjo.show_warn)
			t.log.info(msg);
	}
});