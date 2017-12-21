/*!
 * mysql_connection
 */

'use strict';

var mysql      = require('mysql');

/**
 * Module dependencies.
 * @private
 */

var mysql_connection = module.exports = function(parent) {
	var t=this;

	t.settings = {};
	t.parent=parent;
	t.superparent=parent.parent; //parent.parent goes back to application.js
	t.set=new t.superparent.setter(t);  
	t.parent.vars('users_obj', this);
	t.sf=t.superparent.vars('debug.show_funcName');
	t.ss=t.superparent.vars('debug.show_sql');
	
	t.con = t.connectThis();

	return t;
};

mysql_connection.prototype.vars = function vars(setting, val) {
	var t=this.parent.vars('users_obj');
	return t.set.vars(setting, val);
};

mysql_connection.prototype.connectThis = function(){
	var connection = mysql.createConnection({
	  server     : 'localhost'
	  ,host       : 'localhost'
	  ,user       : 'root'
	  ,password : '.-0P~[!v'
	});	
	
	connection.connect(function(err) {
		if(! err) {
			console.log("sql connect");
		} else
			console.log("error sql connect");
	  // connected! (unless `err` is set)
	});
	
	return connection;
};

mysql_connection.prototype.query = function(q, res){
	var t = this;
	t.con.query(q, function(err, rows, fields) {
	  if (!err) {
		/*
		if(rows.length == 1)
			console.log('The solution is debug 10.00: ', rows);
		else
			console.log('The solution is debug 10.01: ', rows.length);
		*/
		res(rows);
	  }else{
		var msg = 'Error while performing Query.';
		console.log(msg);
		res(null);
		//throw new Error(msg);
	  };
	});
};

mysql_connection.prototype.close = function(){
	this.con.end();
};
