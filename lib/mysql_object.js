"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-11-22
*/

var mysql = require('mysql')
			,dbov = require('../configs/db.js');

class mysql_connection{
	constructor(jo){
		var t = this;
		t.log = jo.log;
		t.logger = jo.logger;
		t.con = t.connect();
		t.schema = dbov.vars.schema;
	}
	
	connect(){
		var t = this;
		try{
			var connection = mysql.createConnection({
			  server    			: dbov.vars.server
			  ,host     			: dbov.vars.host
				,dbname					: dbov.vars.dbname
			  ,user     			: dbov.vars.user
			  ,password 			: dbov.vars.password
			  ,port 					: dbov.vars.port
				,connect_timeout: dbov.vars.connection_timeout
			});	
			
			connection.connect(function(err){
				try{
					if(!err) {
						t.con = connection;
						t.logger.debug('sql connect ok').tag(t.log.rte).tag(t.log.lne).tagline();			
					} else
						t.logger.error("error sql connect: " + err).tag(t.log.rte).tag(t.log.lne).tagline();			
				}catch(e){
					t.logger.error("").tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
				}
			});
			
			connection.on('error', function(err) {
				t.logger.error("error lost sql connection: " + err).tag(t.log.rte).tag(t.log.lne).tagline();			
				if(err.code === 'PROTOCOL_CONNECTION_LOST'){ 
					t.con = t.connect();
				} else {                                      
					t.logger.fatal("lost sql connection: " + err).tag(t.log.rte).tag(t.log.lne).tagline();			
				}
			});			
		}catch(e){
			t.logger.error("").tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}
	}
	
	query(q, callback){
		var t = this, err='';
		try{
			t.logger.debug('sql=' + q).tag(t.log.rte).tag(t.log.lne).tagline();			
			t.con.query(q, function(err, rows, fields) {
				try{
					if (!err) {
						t.logger.debug(' rows(' + rows.length + ')').tag(t.log.rte).tag(t.log.lne).tagline();			
						callback(err, rows);
					}else{
						var msg = 'Error while performing Query. SQL(' + q + ')';
						t.logger.debug(msg).tag(t.log.rte).tag(t.log.lne).tagline();			
					};
				}catch(e){
					t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
					callback(e.message,null);
				}		
			});			
		}catch(e){
			t.logger.error("").tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}		
	}	
}

module.exports = mysql_connection;
			