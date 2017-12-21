/*!
 * setf
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var Class = require('./class');

var set = module.exports = Class.extend({
	parent: null
	,sv: false
	,construct: function(){
		var t = this;
		var funcName='set.construct';		
		return this;
	}
	,vars(jo, obj){
		var t = this;
		var funcName='set.vars';

		if(typeof jo == 'object' && typeof jo.vars  == 'object' && typeof obj == 'object'){
			for(var i in jo.vars){
				if(t.parent.debug.show_var)
					console.log(funcName+' name('+i+') value('+jo.vars[i]+')');
				obj[i] = jo.vars[i];
			}
		}
		return t;
	} 
});

/*
var set = module.exports = function(parent) {
	var t=this

	t.parent=parent;
	t.settings = {};
	t.sv = false;
	return t;
};

set.prototype.vars = function vars(setting, val) {
	var t=this;
	var funcName='set.js var';
	if(setting=='debug.show_var')
		if(val)
			t.sv=true;
	if (typeof val=='undefined') {
		if(t.sv)
			console.log(funcName+' debug 20.00 setting('+setting+') typeof('+typeof t.settings[setting]+')');
	// app.get(setting)
		return this.settings[setting];
	};

	// set value
	t.settings[setting] = val;
	if(t.sv)
		console.log(funcName+' debug 20.01 setting('+setting+')=('+val+')');

	return t;
};

set.prototype.show = function show() {
	var t=this;
	var funcName='set.js show';

	for(var i in t.settings)
		console.log(funcName+' name('+i+') value('+t.settings[i]+')');

	if(t.sv)
		console.log(funcName);

	return t;
};
set.prototype.json = function json(jo) {
	var t=this;
	var funcName='set.js json';
	
	if(typeof jo=='object'){
		if(typeof jo.vars!='undefined')
			for(var i in jo.vars)
				t.vars(i, jo.vars[i]);
		if(typeof jo.render!='undefined'){
			for(var i in jo.render){
				var o='./response/'+jo.render[i];
				console.log(funcName+' render='+o);
				var r=require(o);
				var render=new r(t.parent);
			};
		};
	};

	if(t.sv)
		console.log(funcName);

	return t;
};
*/