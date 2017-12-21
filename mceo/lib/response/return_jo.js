const Class = require('./../class');
const tbl_ret_jo = require('./../tables/return_jo');

var return_jo = module.exports = Class.extend({
	parent: null,
	log: null,
	module: 'return_jo.js',
	return_msg: ['no error',
				'general error message',
				'access denied',
				'access conflict detected'
			],
	return_code: 0,
	gdata: [],
	ggrid: {},
	map: {},
	construct: function(parent){
		var t = this;
		var fn = 'return_jo.construct';
		t.parent = parent.parent;
		t.log = parent.parent.log;
		t.logger = parent.parent.logger;
		t.dbo = parent.parent.dbo;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
	},
	get: function(jo){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		try{
			var rtbl = new tbl_ret_jo(t);
			var xret_id;     
			if(t.return_code > 0)
				xret_id = 1000;	//failed attempt
			else
				xret_id = 1001; //successful attempt
			var q  = 'SELECT jo FROM ' + rtbl.schema + '.' + rtbl.name+' ';
			q += 'WHERE ret_id='+xret_id+' ';
			rtbl.dbo.query(q, function(err, rows){
				try{
					t.logger.debug('records found rows='+typeof rows).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
					var xjo = eval("(" + rows[0].jo + ")");
					var ret_jo = {error: {code: t.return_code, msg: '"'+t.return_msg[t.return_code]+'"'}
						,ggrid: xjo.ggrid
						,map: xjo.map
						,uid: t.parent.uid
					};
					ret_jo.ggrid.data = xjo.gdata;
					jo.callback(ret_jo, jo.owner);
				}catch(e){
					t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
				}
			});
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
			/*
		}
		t.ggrid.data = t.gdata;
		return {error: {code: t.return_code, msg: '"'+t.return_msg[this.return_code]+'"'}
			,ggrid: t.ggrid
			,map: t.map
			,uid: t.parent.uid
		};
		*/
	}
});