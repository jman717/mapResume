const Class = require('./../class');
const token = require('./../token');
const access_queue = require('./../access_queue');
const access = require('./../access');
const return_jo = require('./return_jo');

var map_access = module.exports = Class.extend({
	parent: null
	,token: null
	,tasks_number: -1
	,response_token: null
	,return_jo: null
	,access_queue: null
	,access: null
	,page: 'pages/index'
	,jo: null
	,construct: function(parent, jo){
		var t = this;
		var funcName = 'map_access.construct';
		t.parent = parent;
		t.jo = jo;
		if(t.parent.debug.show_funcName)
			console.log(funcName);
	}
	,init: function(){
		var t = this;
		var funcName = 'map_access.init';
		if(t.parent.debug.show_funcName)
			console.log(funcName);
			
		return this;
	}
	,process_tasks: function(){
		var t = this;
		var funcName = 'map_access.process_tasks';
		if(t.parent.debug.show_funcName)
			console.log(funcName);
			
		if(typeof t.jo == 'object' && typeof t.jo.to_do == 'object'){
			if(t.tasks_number < t.jo.to_do.length){
				try{
					t.tasks_number++;
					t[t.jo.to_do[t.tasks_number]]();
				}catch(e){
					console.log(funcName+' error: Task('+t.jo.to_do[t.tasks_number]+') has no method associated with it.');
				}
			}
		}	
		return this;
	}
	,token_loaded: function(){
		var t = this;
		var funcName = 'map_access.token_loaded';
		if(t.parent.debug.show_funcName)
			console.log(funcName);
			
		if(t.token == null)
			t.token = new token(this);
			
		return t.token;
	}
	,get_token: function(){
		var t = this;
		var funcName = 'map_access.get_token';
		if(t.parent.debug.show_funcName)
			console.log(funcName);
		t.token_loaded().set_size(20).get(this, t.response_token);	
	}
	,response_token: function(co, tok){
		var t = co;
		var funcName = 'map_access.response_token';
		if(t.parent.debug.show_funcName)
			console.log(funcName);
		t.response_token = tok;	
		t.process_tasks();
	}
	,get_init: function(){
		var t = this;
		var funcName = 'map_access.get_init';
		if(t.parent.debug.show_funcName)
			console.log(funcName);
			
		try{
			t.return_jo = new return_jo(t);	

			t.parent.res.writeHead(200, {'content-type': 'text/json' });
			t.parent.res.write(JSON.stringify(t.return_jo.get()));
			t.parent.res.end('\n');
		}catch(e){
			console.log(funcName+' error: '+e.message);
		}
	}
	,render: function(){
		var t = this;
		var funcName = 'map_access.render';
		if(t.parent.debug.show_funcName)
			console.log(funcName);

		t.parent.res.render(t.page, {mceo_cid: t.response_token});
	}
});
