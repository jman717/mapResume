
String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};

/*!
 * response
 */

'use strict';

var set = require('./set');

/**
 * Module dependencies.
 * @private
 */

var response = module.exports = function(parent) {
	var t=this;

	t.settings = {};
	t.parent=parent;
	t.superparent=parent.parent; //parent.parent goes back to application.js
	t.set=new t.superparent.setter(t);  
	t.parent.vars('response_obj', this);
	t.sf=t.superparent.vars('debug.show_funcName');
	return t;
};

response.prototype.vars = function vars(setting, val) {
	var t=this.parent.vars('response_obj');
	return t.set.vars(setting, val);
};

response.prototype.init = function init() {
	var t=this.parent.vars('response_obj');
	var funcName='response.js init';
	if(t.sf)
		console.log(funcName);

	return t;
};

response.prototype.render = function render() {
	var t=this.parent.vars('response_obj');
	var funcName='response.js render';

	if(t.sf)
		console.log(funcName);

	var ret = {};
	ret._dat = t.get_return_jo().replaceAll('"', '#');
	
	t.vars('res').render(t.vars('ret.page'), ret);
};

response.prototype.get_return_jo = function get_return_jo() {
	var t=this.parent.vars('response_obj');
	var funcName='response.js get_return_jo';
	if(t.sf)
		console.log(funcName);
	
	//delete t.get_json_control()['user'];
	var ret={};
	ret.cid=t.vars('ret.cid');
	ret.uid=t.vars('ret.uid');
	ret.type=t.vars('ret.type');
	ret.base_url=t.vars('ret.base_url');
	ret.error={};
	ret.error.code=t.vars('ret.error.code');
	var cod='Code (' + ret.error.code + ') ';
	switch(ret.error.code){
		case 0:
			//do nothing. This means a successful response
			break;
		case 999:  //default error code
		case 1001:
			ret.error.message=cod+'Unknown UID (' + ret.uid + ').';
			break;
		case 1002:
			ret.error.message=cod+'UID (' + ret.uid + ') exists more than once.';
			break;
	};
	var s = JSON.stringify(ret);
	if(t.sf)
		console.log(funcName+' ret='+s);
	return s;
};

