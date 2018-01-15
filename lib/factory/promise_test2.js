"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-08
*/
const base = require('./base');

module.exports = class promise_test2 extends base{
	constructor() {
		super();
		var t = this;
	}
	
	result(){
		var t = this;
		//t.opts.reject('reject here debug 10.02');		
		t.opts.resolve('resolve here for promise_test2');		
	}
	
	setup(){
		var t = this;
		console.log('setup');	
		return t;
	}
	
	process(){
		var t = this;
		console.log('process');	
		t.result();
	}
}