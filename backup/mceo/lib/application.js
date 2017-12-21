/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
const crypto = require('crypto');

'use strict';

/**
 * Module dependencies.
 * @private
 */

/**
 * Application prototype.
 */

var app = exports = module.exports = {};

/**
 * Variable for trust proxy inheritance back-compat
 * @private
 */

 /*
var trustProxyDefaultSymbol = '@@symbol:trust_proxy_default';
*/

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @private
 */

app.init = function init(jo) {
	var t=this;
/*
  this.cache = {};
  this.engines = {};
  */
	t.ss=false;
  
	t.defaultConfiguration();
	t.set=new t.setter(t);
	t.set.json(jo);
};


/**
 * Initialize application configuration.
 * @private
 */

app.defaultConfiguration = function defaultConfiguration() {
	var t=this;
	var env = process.env.NODE_ENV || 'development';
};

app.vars = function vars(setting, val) {
	return this.set.vars(setting, val);
};

app.new_token = function new_token() {
	return new this.token(this);
};

app.new_users_queue = function new_users_queue(parent) {
	return new this.users_queue(parent);
};

app.new_users = function new_users(parent) {
	return new this.users(parent);
};

app.new_response = function new_response(parent) {
	return new this.response(parent);
};

app.new_mysql_obj = function new_mysql_obj(parent) {
	return new this.mysql_obj(parent);
};

app.new_error_messages = function new_error_messages(parent) {
	return new this.error_messages(parent);
};
