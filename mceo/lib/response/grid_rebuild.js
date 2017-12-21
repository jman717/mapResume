const Class = require('./../class');
const zseed = require('./../tables/seed/main');


var grid_rebuild = module.exports = Class.extend({
	parent: null,
	log: null,
	dbo: null,
	module: 'grid_rebuild.js',
	jo: null,
	construct: function(parent, jo){
		var t = this;

		try{		
			t.parent = parent;
			t.log = parent.log;
			t.logger = parent.logger;
			t.dbo = parent.dbo;
			t.jo = jo;
			t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		};
	},
	init: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
			
		return this;
	},
	process_tasks: function(){
		var t = this;
		try{
			t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
			if(t.dbo != null){
				//to seed new table data
				var seed = new zseed(t);
				seed.return_jo();
				var msg = "seed table finished";
				throw new Error(msg); 
			}
			return t;
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	}
});
