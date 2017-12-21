/*!
 * setf
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var access = module.exports = function(parent) {
	var t=this
	var funcName='access._construct';
	
	t.parent=parent;
	t.set=new parent.setter(t);
	t.set.json({
		vars:{
			'debug.show_var':true
			,'object name':'/response/access.js'
		}
	});
	t.set.show();
	t.init();
};

access.prototype.init = function init() {
	var t=this;
	var funcName='access.js init';
	var p=t.parent;
	
	try{
		p.set.show();
		var uid=p.vars('req').query.uid;
		var url=p.vars('req').protocol + '://' + p.vars('req').get('host');
		var res=p.vars('res');
		var path=p.vars('vpath') + "pages/map/index"
		var response=p.new_response(t);
		var token=p.new_token();
		var tok=token.get_random();
		token.set.json({
			vars:{
				'debug.show_var':true
				,'object name':'/response/access.js token'
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
				,'object name':'/response/access.js users'
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
				,'object name':'/response/access.js users_queue'
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

access.prototype.vars = function vars(setting, val) {
	return this.set.vars(setting, val);
};
