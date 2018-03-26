"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-03-21
*/
const base = require('./base');

module.exports = class roles_grid extends base{
	constructor() {
		super();
		var t = this;
		t.page = null;
	}	
	
	init(jo){
		jo.parent.log({"type":"debug", "text": "debug 22.01", "classO":"roles_grid.init", "file":"roles_grid.js"});
		return jo;
	}
	
	render(jo){
		var t = this;
		var g = jo.parent.getVars({"vars":"globals"});
		t.page = g.views_pages_dir + '/roles';
		jo.parent.log({"type":"debug", "text": "debug 22.02 dir(" + t.page + ")", "classO":"roles_grid.render", "file":"roles_grid.js"});
		g.res.render(t.page, {});
		return jo;
	}
}