const Class = require('./../class');
const table_main = require('./table_main');

var return_jo = module.exports = table_main.extend({
	name: 'return_jo'
	,dbo: null
	,parent: null
	,construct: function(parent){
		var t = this;
		var funcName = 'tables.return_jo.construct';
		t.parent = parent;
		t.set_dbo();
	}
});