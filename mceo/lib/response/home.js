/*!
 * setf
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var home = module.exports = function(parent) {
	var t=this
	var funcName='home._construct';
	
	t.parent=parent;
	t.set=new parent.setter(t);
	t.set.json({
		vars:{
			'debug.show_var':true
			,'object name':'/response/home.js'
		}
	});
	t.set.show();
	t.init();
};

home.prototype.init = function init() {
	var t=this;
	var funcName='home.js init';
	var p=t.parent;
	
	try{
		p.set.show();
		var uid=p.vars('req').query.uid;
		var url=p.vars('req').protocol + '://' + p.vars('req').get('host');
		var res=p.vars('res');
		var path=p.vars('vpath') + "pages/galactica/index"
		var response=p.new_response(t);
		var token=p.new_token();
		var tok=token.get_random();
		token.set.json({
			vars:{
				'debug.show_var':true
				,'object name':'/response/home.js token'
				,'token':tok
			}
		});
		response.set.json({
			vars:{
				'debug.show_var':true
				,'object name':'/response/home.js response'
				,'ret.uid':uid
				,'ret.base_url':url
				,'ret.user.id':0
				,'ret.cid':tok
				,'ret.type':'na'
				,'ret.error.code':999
				,'ret.page':path
				,'res':res
			}
		});
		//token.set.show();
		var users=p.new_users(t);
		var users_queue=p.new_users_queue(t);
		users.after_create=response.render;
		users.after_check=response.render;
		users.after_add=response.render;
		users.users_queue_add=users_queue.add;
		var users_table='users';
		users.set.json({
			vars:{
				'debug.show_var':true
				,'object name':'/response/home.js users'
				,'table':users_table
				,'uid':uid
				,'is_checked':false
			}
		});
		users_queue.after_create=users.add;
		users_queue.after_add_to_queue=users.init;
		users_queue.set.json({
			vars:{
				'debug.show_var':true
				,'object name':'/response/home.js users_queue'
				,'table':'users_queue'
				,'users_table':users_table
				,'uid':uid
				,'token':tok
			}
		});
		//users.set.show();
		//users_queue.set.show();
		
		//t.set.show();
		users.init();
		users_queue.init()
			.set_new();
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};

	return t;
};

home.prototype.vars = function vars(setting, val) {
	return this.set.vars(setting, val);
};

/*

app.render_home = function render_home(req,res,vpath) {
	var t=this;
	var response=t.new_response();
	t.vars('response_obj',response);
	response.vars('debug.show_var',true)
		.vars('object name','server.js response')
		.vars('ret.uid',req.query.uid)
		.vars('ret.base_url',req.protocol + '://' + req.get('host'))
		.vars('res',res)
		.vars('ret.user.id',0)
		.vars('ret.cid',null)
		.vars('ret.page', vpath + "pages/galactica/index")
		.vars('ret.type','na')
		.vars('ret.error.code',0);
	var token=t.new_token();
	token.vars('debug.show_var',true)
		.vars('object name','server.js token')
		.vars('token', crypto.randomBytes(16).toString("hex"));
	var users=t.new_users();
	var users_queue=t.new_users_queue();
	t.vars('users_obj',users);
	t.vars('users_queue_obj',users_queue);
	users.after_create=response.render;
	users.after_check=response.render;
	users.after_add=response.render;
	users.users_queue_add=users_queue.add;
	users.vars('debug.show_var',true)
		.vars('object name','server.js users')
		.vars('table','users')
		.vars('uid',req.query.uid)
		.vars('is_checked',false);
	users_queue.after_create=users.add;
	users_queue.after_add_to_queue=users.init;
	users_queue.vars('debug.show_var',true)
		.vars('object name','server.js users_queue')
		.vars('table','users_queue')
		.vars('users_table',users.vars('table'))
		.vars('uid',req.query.uid)
		.vars('token', token.vars('token'))
	users_queue.init()
		.set_new();
};
*/