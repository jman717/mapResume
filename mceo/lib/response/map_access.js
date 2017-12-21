const token = require('./../token');
const Class = require('./../class');
const return_jo = require('./return_jo');
const tmain = require('./../tables/main');

var map_access = module.exports = Class.extend({
	parent: null,
	log: null,
	module: 'map_access.js',
	token: null,
	response_token: null,
	return_jo: null,
	tasks_number: -1,
	tables_main: null,
	page: 'pages/index',
	post_jo: null,
	jo: null,
	construct: function(parent, jo){
		var t = this;
		try{		
			t.parent = parent;
			t.log = parent.log;
			t.logger = parent.logger;
			t.dbo = parent.dbo;
			t.jo = jo;
			t.write_head = false;
			t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		};
	},
	init: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
			
		return this;
	},
	process_tasks: function(){
		try{
			var t = this;
			t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
				
			if(typeof t.jo == 'object' && typeof t.jo.to_do == 'object'){
				if(t.tasks_number < t.jo.to_do.length){
					try{
						t.tasks_number++;
						t.logger.debug('debug 10.00 ='+t.jo.to_do[t.tasks_number]).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
						t[t.jo.to_do[t.tasks_number]]();
					}catch(e){
						t.logger.error('error: Task('+t.jo.to_do[t.tasks_number]+') has no method associated with it.').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
					}
				}
			}	
			return t;
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	token_loaded: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		try{
			
			if(t.token == null)
				t.token = new token(t);
				
			return t.token;
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	confirm: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		t.process_tasks();
	},
	get_token: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		t.token_loaded().set_size(20).get(t, t.res_token);	
	},
	res_token: function(owner, tok){
		var t = owner;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		try{
			t.response_token = tok;	
			t.process_tasks();
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	do_table_check: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		try{
			if(t.tables_main == null)
				t.tables_main = new tmain(t);  
			t.return_jo = new return_jo(t);	
			t.tables_main.table_check({tbls: ['access_queue','return_jo']}, t.tables_main.check_access);
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	get_init: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		try{
			var jo = {callback: t.pre_post, owner: t};
			t.return_jo.get(jo);			
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	pre_post: function(jo, owner){
		var t = owner;
		t.post_jo=jo;
		var pjo = {callback: t.post, owner: t};
		t.tables_main.post_access_queue(pjo);			
	},
	post: function(owner){
		var t = owner;
		try{
			t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();

			t.post_jo.result = 'success';
			t.parent.res.send(t.post_jo);
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	},
	render: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		try{

			t.logger.debug('page(' + t.page + ') response token(' + t.response_token + ')').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
			t.parent.res.render(t.page, {mceo_cid: t.response_token});
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	}
});
