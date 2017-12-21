const Class = require('./../class');
const table_main = require('./table_main');

var return_jo = module.exports = table_main.extend({
	name: 'return_jo',
	dbo: null,
	parent: null,
	construct: function(parent){
		var t = this;
		t.parent = parent;
		t.log = t.parent.log;
		t.logger = t.parent.logger;
		t.dbo = t.parent.dbo;
		t.schema = t.parent.dbo.schema;
	}
});