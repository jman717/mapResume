'use strict';

/*!
 * token
 */

const Class = require('./class');
const crypto = require('crypto'); 
//var set = require('./set');

/**
 * Module dependencies.
 * @private
 */
 
var token = module.exports = Class.extend({
	parent: null,
	log: null,
	size: 0,
	construct: function(parent) {
		var t = this;
		var fn='token.construct';
		t.log = parent.log;
		t.logger = parent.logger;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		t.parent = parent;
		return t;
	},
	get: function(co, func){
		var t = this;
		var fn = 'token.get';
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		//if(t.crypto == null)
		//	t.crypto = new crypto();
		try{			
			crypto.randomBytes(t.size, (err, buf) => {
				if (err) throw err;
				t.logger.debug(`${buf.length} bytes of random data: ${buf.toString('hex')}`).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
				func(co, buf.toString('hex'));
			});
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	set_size: function(n){
		this.size = n;
		return this;
	}
});
 
/*
var token = module.exports = function(parent) {
	var t=this;

	t.settings = {};
	t.set=new set(t);
	t.vars('parent', parent);
	t.sf=parent.vars('debug.show_funcName');
	return t;
};

token.prototype.vars = function vars(setting, val) {
	return this.set.vars(setting, val);
};

token.prototype.get_random = function get_random() {
	return crypto.randomBytes(16).toString("hex");

};
*/