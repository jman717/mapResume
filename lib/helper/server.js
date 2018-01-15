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
		,url = require('url')
		,db = require('../../lib/mysql_object')
		,pcf = require('../../promise-class-factory')
		,ptf = require('../../promise-toolkit-factory')
		,lg = require('../../lib/logger.js');

var owner = null;
const setOwner = function(v){
	owner = v;
};
const getOwner = function(){
	return owner;
};

class server{
	constructor(jo){
		var t = this;
		t.factory_dir = jo.factory_dir;
		/*
		t.log = new lg(function(tx){
			t.logger = tx.log;
			t.dbo = new db({log: tx, logger: tx.log});
		});
		*/
		new Promise(function (resolve, reject) {
				console.log('test resolve');
				t.log = new lg(function(tx){
					t.logger = tx.log;
					t.dbo = new db({log: tx, logger: tx.log});
				});
				//setTimeout(resolve, msec, arg);
		});
		t.routes = {
			getMapAccess: "/get/map/access"
			,getMapAccessData : "/get/map/access/data"
			,getGridRebuild : "/get/grid/rebuild"
			,postPing: "/post/ping"
			,postMsg: "/post/msg"
			,postTestAsync: "/post/test/async"
			,postTestPromiseFactory: "/post/test/promise/factory"
			,postClassFactory: "/post/test/class/factory"
			,postPromiseToolkit: "/post/test/promise/toolkit/factory"
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
		
		t.log.reqIP.setInput(req.connection.remoteAddress);
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
			case t.routes.postTestAsync:
				t.log.act.setInput('post');
				mp = t.getMainParams(req, res);
				mp.render = {module: 'async_test'};
				mp.tasks = {};
				new mceo({vars: mp}).process();
				break;
			case t.routes.postTestPromiseFactory:
				t.log.act.setInput('post');
				mp = t.getMainParams(req, res);
				mp.render = {module: 'promise_factory'};
				mp.tasks = {};
				new mceo({vars: mp}).process();
				break;
			case t.routes.postPromiseToolkit:
				var f1 = require(t.factory_dir + '/promise_test1');
				var f2 = require(t.factory_dir + '/promise_test2');
				var f1o = new f1();
				var f2o = new f2();
				var toolkit = new ptf().appender('logging', {"type": "log4js-tagline", "log": t.log, "logger": t.logger})
					.appender('classes', {"objs": [{"f1o": f1o},{"f2o": f2o}]})
					.appender('functions', {"flow": 1, "map": ["f1o.init", "f2o.process", "f1o.step1", "f1o.step4", "f2o.set_init_opts"]})
					.appender('functions', {"flow": 2, "map": ["f1o.init", "f1o.step2", "f1o.step5"]})
					.appender('functions', {"flow": 3, "map": ["f1o.init", "f1o.finish"]});
				toolkit.log({"type":"info", "text": "promise toolkit has been created", "classO":"server.processRoute", "file": "helper/server.js"});
				toolkit.run({"flow": 1});
				break;
			case t.routes.postClassFactory:
				t.log.act.setInput('post');
				mp = t.getMainParams(req, res);
console.log('postClassFactory factory_dir='+t.factory_dir);
				var f1 = require(t.factory_dir + '/promise_test1');
				var f2 = require(t.factory_dir + '/promise_test2');
				var f1o = new f1();
				var f2o = new f2();
				mp.name = 'promise_test1';
				var pcfo = new pcf(mp).options({
					"template": {"objs": [{"f1o": f1o},{"f2o": f2o}]
													,"func_map": ["f1o.init", "f2o.process", "f1o.step1", "f1o.step4", "f2o.set_init_opts"]}
				});
				mp.name = 'promise_test2';
				var pcfo2 = new pcf(mp).options({
					"template": {"objs": [{"f1o": f1o},{"f2o": f2o}]
													,"func_map": ["f1o.init", "f1o.step2", "f1o.step5"]}
				});
				var po = new Promise((resolve, reject) => { 
					pcfo.options({
						"init_vars": {}
						,"resolve": resolve
						,"reject": reject
					}).setup().process();
				}); 

				var po2 = new Promise((resolve, reject) => { 
					pcfo2.options({
						"init_vars": pcfo.opts.results
						,"resolve": resolve
						,"reject": reject
					}).setup().process();
				}); 				

				Promise.all([po, po2]).then(values => { 
						t.logger.debug('values='+values).tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
					}, reject => {
						t.logger.error('reject').tag(t.log.err.setInput(reject)).tag(t.log.rte).tag(t.log.lne).tagline();			
					}, resolve => {
						t.logger.debug('resolve='+resolve).tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
					}, reason => {
						t.logger.debug('reason='+reason).tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
					}, results => {
						t.logger.debug('results='+results).tag(t.log.rte).tag(t.log.cli).tag(t.log.act).tag(t.log.lne).tagline();
				});
  
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
			