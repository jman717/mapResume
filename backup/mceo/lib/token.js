/*!
 * token
 */

const Class = require('./class');
const crypto = require('crypto'); 
//var set = require('./set');

'use strict';

/**
 * Module dependencies.
 * @private
 */
 
var token = module.exports = Class.extend({
	parent: null
	,size: 0
	,construct: function(parent) {
		var t = this;
		var funcName='token.construct';
		t.parent = parent;
		return t;
	}
	,get: function(co, func){
		var t = this;
		var funcName = 'token.get';
		//if(t.crypto == null)
		//	t.crypto = new crypto();
		try{			
			crypto.randomBytes(t.size, (err, buf) => {
				if (err) throw err;
				//console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
				func(co, buf.toString('hex'));
			});
		}catch(e){
			console.log(funcName+' error: '+e.message);
		}
	}
	,set_size: function(n){
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