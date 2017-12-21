const Class = require('./../class');

var table_main = module.exports = Class.extend({
	schema: null,
	log: null,
	dbo: null,
	parent: null,
	check_access: function(owner){
		var t = owner;
		if(t.log == null){
			t.log = owner.log;
			t.logger = owner.logger;
		}
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		var tname = "access", uname = "users";

		try{
			var q = 'SELECT COUNT(*) AS	cnt FROM ' + t.schema + '.'+tname+' AS acc, ' + t.schema + '.'+uname+' AS usr ';
			q += 'WHERE acc.uid_id = usr.id ';
			q += 'AND usr.uid = "' + t.parent.parent.uid + '" ';
			t.dbo.query(q, function(err, rows){
				if(rows[0].cnt == 0)
					t.parent.return_jo.return_code = 2;
				t.parent.get_init();
			});
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}		
	},
	post_access_queue: function(jo){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		var tname = "access", uname = "users", aname="access_queue";

		try{
			jo.owner.return_jo.return_code=2;
			var xcid=t.parent.parent.cid;
			var q = 'SELECT COUNT(*) AS cnt FROM ' + t.schema + '.'+tname+' AS acc, ' + t.schema + '.'+uname+' AS usr ';
			q += 'WHERE acc.uid_id = usr.id ';
			q += 'AND usr.uid = "' + t.parent.parent.uid + '" ';
			t.logger.debug("q1=" + q).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
			t.dbo.query(q, function(err, rows){
				try{
					if(rows[0].cnt > 0){
						q  = 'SELECT COUNT(*) AS cnt, acc.uid_id AS uid_id FROM ' + t.schema + '.'+tname+' AS acc, ' + t.schema + '.'+uname+' AS usr ';
						q += 'WHERE acc.uid_id = usr.id ';
						q += 'AND usr.uid = "' + t.parent.parent.uid + '" ';
						q += 'GROUP BY acc.uid_id ';
						t.logger.debug("q1="+q).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
						t.dbo.query(q, function(err, rows){
							try{
								if(rows[0].cnt > 0){
									var xuid_id=rows[0].uid_id;
									var q = 'SELECT COUNT(*) AS cnt FROM ' + t.schema + '.'+aname+' ';
									q += 'WHERE uid_id = ' + xuid_id+' ';				
									q += 'AND cid = "' + xcid + '" ';				
									q += 'AND resource_id = ' + t.parent.parent.resource.id + ' ';
									t.logger.debug("q2="+q).tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
									t.dbo.query(q, function(err, rows){
										try{
											if(rows[0].cnt>0){
												jo.owner.return_jo.return_code=3;
												jo.callback(jo.owner);
												return;
											}
											jo.owner.return_jo.return_code=0;
											var q = 'INSERT INTO ' + t.schema + '.'+aname+' (uid_id, resource_id, cid, return_code) ';
											q += 'VALUES(' + t.parent.parent.resource.id + ',' + xuid_id + ',"' + xcid + '",0)';				
											t.logger.debug("q("+q+")").tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
											t.dbo.query(q, function(err, rows){
												try{
													t.logger.debug("q("+q+") record inserted").tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
													jo.callback(jo.owner);
													return;
												}catch(e){
													t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
												}
											});
										}catch(e){
											t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
										}
									});
								}
							}catch(e){
								t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
							}
						});
					}else{
						jo.callback(jo.owner);
					};
				}catch(e){
					t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
				}
			});
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	}
});