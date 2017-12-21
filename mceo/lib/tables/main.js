const Class = require('./../class');
const table_main = require('./table_main');

var main = module.exports = table_main.extend({
	dbo: null,
	construct: function(parent){
		var t = this;
		try{
			t.parent = parent;
			t.log = t.parent.log;
			t.logger = t.parent.logger;
			t.dbo = t.parent.dbo;
			t.schema = t.parent.dbo.schema;
			t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		};
	},
	table_check: function(jo, callback){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		var q;
		try{
			if(typeof jo == 'undefined')
				throw new Error('no json object defined');
			if(typeof jo.tbls == 'undefined')
				throw new Error('no json.tbls object defined');
			var tot = jo.tbls.length;
			if(tot === 0){
				callback(t);
				return;
			}
			q = 'DESC ' + t.schema + '.' + jo.tbls[0] + ';';
			t.logger.debug('sql(' + q + ')').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
			t.dbo.query(q, function(err, rows){
				try{
					if(rows === null)
						throw new Error('nothing returned for query='+q);			
					jo.tbls.shift();
					t.table_check(jo, callback);
				}catch(e){
					t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
				}
			});
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
			throw new Error(e.message);
		}
	}
});