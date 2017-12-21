/*!
 * users_queue
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var users_queue = module.exports = function(parent) {
	var t=this;
	
	t.settings = {};
	t.parent=parent;
	t.superparent=parent.parent; //parent.parent goes back to application.js
	t.set=new t.superparent.setter(t);  
	t.parent.vars('users_queue_obj', this);
	t.sf=t.superparent.vars('debug.show_funcName');
	t.ss=t.superparent.vars('debug.show_sql');
	t.dbo=t.superparent.vars('dbo');
	t.after_create=function(){};
	t.after_add_to_queue=function(){};
	t.after_add=function(){};
	return t;
};

users_queue.prototype.vars = function vars(setting, val) {
	var t=this.parent.vars('users_queue_obj');
	return t.set.vars(setting, val);
};

users_queue.prototype.init = function init() {
	var t=this.parent.vars('users_queue_obj');
	var funcName='users_queue.js init';
	if(t.sf)
		console.log(funcName);
		
	t.check();

	return t;
};

users_queue.prototype.check = function check() {
	var t=this.parent.vars('users_queue_obj');
	var funcName='users_queue.js check';
	if(t.sf)
		console.log(funcName);

	try{
		t.parent.vars('response_obj').vars('ret.type', 'check');
		//look in here get_mCEO_users_queue_object.prototype.check
		var q = 'DESC ' + t.superparent.vars('schema') + '.' + t.vars('table') + ' ';
		if(t.ss)
			console.log(funcName+' q='+q);
		t.dbo.query(q, function(row){
			if(row == null)
				t.create();
			else
				t.add();
		});
		return t;

		if(t.sf)
			console.log(funcName + ' q=' + q);

		return t;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};
};

users_queue.prototype.create = function create() {
	var t=this.parent.vars('users_queue_obj');
	var funcName='users_queue.js create';
	if(t.sf)
		console.log(funcName);

	try{
		var q = 'CREATE TABLE ' + t.superparent.vars('schema') + '.' + t.vars('table') + ' (';
		q += 'id int not null auto_increment';
		q += ',uid int not null';
		q += ',cid varchar(50) not null';
		q += ',type varchar(20) not null';
		q += ',datetime timestamp';
		q += ',primary key (id)';
		q += ')';
		if(t.ss)
			console.log(funcName+' q='+q);
		t.dbo.query(q, function(row){
			t.after_create();
		});
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};
};

users_queue.prototype.add = function add() {
	var t=this.parent.vars('users_queue_obj');
	var funcName='users_queue.js add';
	if(t.sf)
		console.log(funcName);

	try{
		if(t.vars('ret.user.id')>0)
			t.add_to_queue();
		else{
			var q = 'SELECT id FROM ' + t.parent.vars('schema') + '.' + t.vars('users_table') + ' ';
			q += 'WHERE uid = "' + t.vars('uid') + '"';
			if(t.ss)
				console.log(funcName+' q='+q);
			t.dbo.query(q, function(row){
				try{
					t.parent('response_obj').vars('ret.user.id', row[0].id);
					t.add_to_queue();
				}catch(e){
					var uid=t.vars('uid');
					t.parent.vars('response_obj').vars('ret.error.code', 1001);
					t.after_add_to_queue();
				};
			});
		};
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};
};

users_queue.prototype.add_to_queue = function add_to_queue() {
	var t=this.parent.vars('users_queue_obj');
	var funcName='users_queue.js add_to_queue';
	if(t.sf)
		console.log(funcName);

	try{
		console.log(funcName+' WORK HERE');
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};
};

users_queue.prototype.set_new = function set_new() {
	var t=this.parent.vars('users_queue_obj');
	var funcName='users_queue.js set_new';

	if(t.sf)
		console.log(funcName);

	return t;
};
