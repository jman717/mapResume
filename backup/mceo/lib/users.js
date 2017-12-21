/*!
 * users
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var users = module.exports = function(parent) {
	var t=this;

	t.settings = {};
	t.parent=parent;
	t.superparent=parent.parent; //parent.parent goes back to application.js
	t.set=new t.superparent.setter(t);  
	t.parent.vars('users_obj', this);
	t.sf=t.superparent.vars('debug.show_funcName');
	t.ss=t.superparent.vars('debug.show_sql');
	t.dbo=t.superparent.vars('dbo');
	t.after_create=function(){};
	t.after_check=function(){};
	t.after_add=function(){};
	return t;
};

users.prototype.vars = function vars(setting, val) {
	var t=this.parent.vars('users_obj');
	return t.set.vars(setting, val);
};

users.prototype.init = function init() {
	var t=this.parent.vars('users_obj');
	var funcName='users.js init';
	if(t.sf)
		console.log(funcName);
		
	t.after_check=t.add;
	t.check();

	return t;
};

users.prototype.add = function add() {
	var t=this.parent.vars('users_obj');
	var funcName='users.js add';
	try{
		if(t.sf)
			console.log(funcName);
		var q = 'SELECT COUNT(*) AS cnt FROM ' + t.superparent.vars('schema') + '.' + t.vars('table') + ' ';
		q += 'WHERE uid = "' + t.vars('uid') + '"';
		if(t.ss)
			console.log(funcName+' q='+q);
		t.dbo.query(q, function(row){
			if(t.ss)
				console.log(funcName+' count='+row[0].cnt);
			switch(row[0].cnt){
				case 0:
					t.parent.vars('response_obj').vars('ret.error.code', 1001);
					t.after_add();
					break;
				case 1:
					var q = 'SELECT id FROM ' + t.parent.vars('schema') + '.' + t.vars('table') + ' ';
					q += 'WHERE uid = "' + t.vars('uid') + '"';
					if(t.ss)
						console.log(funcName+' q='+q);
					t.dbo.query(q, function(row){
						t.parent.vars('response_obj').vars('ret.user.id', row[0].id);
						t.users_queue_add();
					});

					break;
				default:
					t.parent.vars('response_obj').vars('ret.error.code', 1002);
					t.after_add();
			}; 
		});

		return t;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};
};

users.prototype.check= function check() {
	var t=this.parent.vars('users_obj');
	var funcName='users.js check';
console.log(funcName+' JRM DEBUG 444');	
	try{
		if(t.sf)
			console.log(funcName);
		
		var q = 'DESC ' + t.superparent.vars('schema') + '.' + t.vars('table') + ' ';
		if(t.ss)
			console.log(funcName+' q='+q);
		t.dbo.query(q, function(row){
			if(row == null){
	console.log(funcName+' jrm debug 10.00');		
				t.create();
			}else{
	console.log(funcName+' jrm debug 10.01');		
				t.after_check();
			};
		});
		return t;

		if(t.sf)
			console.log(funcName + ' q=' + q);

		return t;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};
};

users.prototype.create = function create() {
	var t=this.parent.vars('users_obj');
	var funcName='users.js create';
	if(t.sf)
		console.log(funcName);

	try{
		var q = 'CREATE TABLE ' + t.superparent.vars('schema') + '.' + t.vars('table') + ' (';
		q += 'id int not null auto_increment';
		q += ',cuid varchar(20) not null';
		q += ',datetime timestamp';
		q += ',lat varchar(20) not null';
		q += ',lon varchar(20) not null';
		q += ',uid int not null';
		q += ',primary key (id)';
		q += ')';
		if(t.ss)
			console.log(funcName+' q='+q);
		t.dbo.query(q, function(row){
			t.after_create();
		});
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}};

users.prototype.set_new = function set_new() {
	var t=this.parent.vars('users_obj');
	var funcName='users.js set_new';

	try{
		if(t.sf)
			console.log(funcName);

		return t;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	};
};
