
'use strict';

/**
 * Module dependencies.
 */


//var mixin = require('merge-descriptors');
const Class = require('./class');
const application = require('./application');
const setter = require('./set');
//var users_queue = require('./users_queue');
//var users = require('./users');
const response = require('./response');
const zseed = require('./tables/seed/main');

/**
 * Expose `createApplication()`.
 */

//exports = module.exports = createApplication;

/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */

var mceo = module.exports = Class.extend({
	set: null,
	env: null,
	module: 'mceo.js',
	log: null,
	req: null,
	res: null,
	uid: null,
	resource: null,
	cid: null,
	render: {
		module: null
	},
	tasks: [],
	schema: null,
	lib_dir: null,
	vpath: null,
	env: null,
	construct: function(jo){
		var t = this;
		t.sjo = jo;
		t.log = jo.vars.log;
		t.logger = jo.vars.logger;
		t.init(t);
////		t.log = new lg({
////			callback: t.init_dbo,
////			callback_name: 'mceo.init_dbo',
////			parent: t,
////			clear_logs: true,
////			show_functions: true,
////			show_debug: true,
////			show_info: true,
////			show_warn: true,
////			show_trace: true
////		});
	},
////	init_dbo: function(owner){
////		var t = owner;
////		var fn = 'mceo.init_dbo';
////		t.logger.trace(fn).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
////		t.dbo = new mso({
////			callback: t.init,
////			callback_name: 'mceo.init',
////			parent: t			
////		});
////	},
	init: function(owner){
		var t = owner;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		t.set = new setter(t);
		t.set.vars(t.sjo, t);
	},
	process: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();

		try{
			
			var o='./response/' + t.render.module;
			t.logger.debug(' render=' + o).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
			var r = require(o);
			var render = new r(t, t.tasks);
			render.init().process_tasks();
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	vars: function(jo){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		t.set.vars(jo, t);
		return t;
	}
});

/*
function createApplication(jo) {
	var app = function() {};
	mixin(app, application, false);
	app.setter = setter;
	app.token = token;
	app.users_queue = users_queue;
	app.users = users;
	app.response = response;

  app.init(jo);
  return app;
}
*/

