
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
	set: new setter(this)
	,env: null
	,debug: {
		show_var: false
		,show_sql: false
		,show_funcName: false
	}
	,req: null
	,res: null
	,uid: null
	,cid: null
	,render: {
		module: null
	}
	,tasks: []
	,dbo: null 
	,schema: null
	,lib_dir: null
	,vpath: null
	,env: null
	,construct: function(jo){
		var t = this;
		var funcName = 'mceo.construct';
		if(t.debug.show_funcName)
			console.log(funcName);
		
		t.set.parent = this;
		t.set.vars(jo, this);
	}
	,process: function(){
		var t = this;
		var funcName = 'mceo.process';
		if(t.debug.show_funcName)
			console.log(funcName);
		
		var o='./response/'+t.render.module;
		if(t.debug.show_var)
			console.log(funcName+' render='+o);
		var r=require(o);
		var render=new r(this, t.tasks);
		render.init().process_tasks();
	}
	,vars: function(jo){
		var t = this;
		var funcName = 'mceo.vars';
		if(t.debug.show_funcName)
			console.log(funcName);
		this.set.vars(jo, this);
		return this;
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
