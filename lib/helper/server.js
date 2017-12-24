"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2017-11-22
*/

/* org
const	rq = require('request-json')
			,url = require("url")
			,db = require('../../lib/mysql_object')
			,mc = require('../../mceo')
			,lg = require('../../lib/logger.js');
		*/

const	mceo = require('../../mceo')
		,getIP = require('ipware')().get_ip
		,url = require('url')
		,db = require('../../lib/mysql_object')
		,lg = require('../../lib/logger.js');


var owner = null;
const setOwner = function(v){
	owner = v;
};
const getOwner = function(){
	return owner;
};

class server{
	constructor(){
		var t = this;
		t.log = new lg(function(tx){
			t.logger = tx.log;
			t.dbo = new db({log: tx, logger: tx.log});
		});
		t.routes = {
			getMapAccess: "/get/map/access"
			,getMapAccessData : "/get/map/access/data"
			,getGridRebuild : "/get/grid/rebuild"
			,postPing: "/post/ping"
			,postMsg: "/post/msg"
		};
		/*
		var params = {
			"host": dbov.vars.server,
			"database": dbov.vars.database,
			"user": dbov.vars.user,
			"password": dbov.vars.password
		};
		t.dbo = dbo.createConnection(params);
		*/
		setOwner(t);
	}
	
	destroy(){
		var t = this;
		t = null;
	}

	getMainParams(req, res){
		var t = getOwner();
		var app = t.log.tagline.appender('stopwatch');
		var stw = new app().setConfig({"format": "total execution time(@stop - @start = @elapsed/mili)"});
		stw.setStart();
t.logger.debug('getMainParams dbo typeof=' + typeof t.dbo).tag(t.log.rte).tag(t.log.lne).tagline();			
		return {
			stw: stw
			,log: t.log
			,logger: t.logger
			,dbo: t.dbo
			,routes: t.routes
			,req: req
			,res: res
		};
	}
	
	processRoute(req, res){
		var t = getOwner(), mp;
		var route = req.path;
		t.req = req;
		t.res = res;
		t.log.rte.setInput(route);
		t.log.act.setInput('post');
		t.log.reqIP.setInput(getIP(req).clientIp);
		t.logger.debug('route(' + route + ')').tag(t.log.rte).tag(t.log.reqIP).tag(t.log.act).tag(t.log.lne).tagline();
		switch(route){
			case t.routes.getMapAccess:
				t.log.act.setInput('get');
				mp = t.getMainParams(req, res);
				mp.resource = {id: 1};
				mp.render = {module: 'map_access'};
				mp.tasks = {to_do:['get_token','render']};
				new mceo({vars: mp}).process();
				break;
			case t.routes.getMapAccessData:
				t.log.act.setInput('get');
				var url_parts = url.parse(req.url, true);
				var query = url_parts.query;
				mp = t.getMainParams(req, res);
				mp.uid = req.query.uid;
				mp.cid = req.query.cid;
				mp.resource = {id: 1};
				mp.render = {module: 'map_access'};
				mp.tasks = {to_do:['do_table_check','get_init']};
				new mceo({vars: mp}).process();
				break;
			case t.routes.getGridRebuild:
				t.log.act.setInput('get');
				mp = t.getMainParams(req, res);
				mp.resource = {id: 2};
				mp.render = {module: 'grid_rebuild'};
				mp.tasks = {};
				new mceo({vars: mp}).process();
				break;
			case t.routes.postPing:
				t.log.act.setInput('post');
				var json = {"status": "success", "route":"postPing"}
				res.end(JSON.stringify(json));
				break;
			case t.routes.postMsg:
				t.log.act.setInput('post');
				var bod = req.body;
				t.log.cli.setInput(bod.client);
				switch(bod.type){
					case "debug":
						t.logger.debug(bod.msg).tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
						break;
					case "error":
						t.logger.error(bod.msg).tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
						break;
					default:
						t.logger.error('bod.type not defined').tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
				}
				var json = {"status": "success", "route":"postMsg"};
				res.json(json);
				res.end('\n');
				break;
			default:
				t.logger.error('no route is defined for (' + route + ')').tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
		}
	}
}

module.exports = server;
			