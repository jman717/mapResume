const Class = require('./../class');
const table_main = require('./table_main');

var main = module.exports = table_main.extend({
	dbo: null
	,construct: function(parent){
		var t = this;
		var funcName = 'tables.main.construct';
		t.parent = parent;
		t.set_dbo();
	}
	,table_check: function(jo, callback){
		var t = this;
		var funcName = 'tables.main.tbls_check';
		var q;
		try{
			if(typeof jo == 'undefined')
				throw new Error('no json object defined');
			if(typeof jo.tbls == 'undefined')
				throw new Error('no json.tbls object defined');
			var tot = jo.tbls.length;
			var cnt = 0;
			for(var i=0; i<tot; i++){
				try{
					q = 'DESC ' + t.schema + '.' + jo.tbls[i] + ' ';
					t.dbo.query(q, function(row){
						cnt++;
						if(row == null)
							throw new Error('nothing returned for query='+q);			
						if((cnt) == tot)
							callback(t);
					});
				}catch(e){
					throw new Error('table('+jo.tbls[i]+') does not exist');
				}
			}
		}catch(e){
			console.log(funcName+' error: '+e.message);			
			throw new Error(e.message);
		}
	}
});