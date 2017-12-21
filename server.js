var express = require("express")
	,favicon = require('serve-favicon')
	,ejs = require('ejs')
	//,jb = require('json-blueprint')
	,hs = require('./lib/helper/server.js')
	,fs = require('fs')
	,conf = require('./configs/server.js')
	,app = express();

var hso = new hs();

var path = require('path');
var lib = path.join(path.dirname(fs.realpathSync(__filename)), './lib');
var router = express.Router();
var vpath = __dirname + '/views/';

//var blueprint = jb();
//blueprint.hello(); test

var gdp,gdo,gmdp,gmdo,comd_data,comd_manual;

////var mceo = require("./mceo");
////var mobileCEO = new mceo({
////	vars:{
////		'dbo': null,
////		'schema':'mceo',
////		'lib_dir':lib,
////		'vpath':vpath,
////		'env':process.env.NODE_ENV || 'development'
////	}
////});

/*
//getting this from: http://stackoverflow.com/questions/11495595/using-html-in-express-instead-of-jade
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
*/

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
//console.log('dirname='+path.join(__dirname,'images','favicon.ico'));
//app.use(favicon(path.join(__dirname,'public/images','favicon.ico')));
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
//app.use(favicon(__dirname + '/public/favicon.ico'));  
//var oneDay = 86400000;

router.post("/getData",function(req,res){
	if(gdo==null){
		comd_data = require(lib + '/common_data_object.js');
		gdo = require(lib + '/get_data_object.js');
		gdp = new gdo.get_data_object(new comd_data.common_data_object(msc));
	};
	gdp.process(req,res);
});

router.post("/getManualData",function(req,res){
	if(gmdo==null){
		comd_manual = require(lib + '/common_data_object.js');
		gmdo = require(lib + '/get_manual_data_object.js');
		gmdp = new gmdo.get_manual_data_object(new comd_manual.common_data_object(msc));
	};
	gmdp.process(req,res);
});

router.use(function (req,res,next) {
	gdp=null,gdo=null,gmdp=null,gmdo=null,comd=null;
	console.log("/" + req.method);
	next();
});

/*
router.get("/",function(req,res){
  res.sendFile(vpath + "index.html");
});
*/

router.get("/home",function(req,res){
	res.render(vpath + "pages/index");
});

router.get("/galactica/home",function(req,res){
	res.render(vpath + "pages/galactica/index");
});

router.get("/about",function(req,res){
  res.sendFile(vpath + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(vpath + "contact.html");
});
/*
http://localhost:3085/get/map/access?uid=f2c2aca33b
http://www.popolana.com:49200/get/map/access?uid=f2c2aca33b
*/
app.get(hso.routes.getMapAccess, hso.processRoute);
app.get(hso.routes.getMapAccessData, hso.processRoute);
app.get(hso.routes.getGridRebuild, hso.processRoute);
////router.get("/map/access",function(req,res){
////
////	// sample http://localhost:3085/map/access?uid=f2c2aca33b
////	
////	console.log('/map/access');
////	//res.sendFile(vpath + "contact.html");
////    //res.render('pages/index');
////
////	mobileCEO.vars({
////		vars:{
////			req: req,
////			res: res,
////			resource: {id: 1},
////			render: {module: 'map_access'},
////			tasks: {to_do:['get_token','render']}			
////			
////		}
////	}).process();
////	
////});
////
////router.get("/map/access/data",function(req,res){
////	console.log('/map/access/data');
////	var url_parts = url.parse(req.url, true);
////	var query = url_parts.query;
////	mobileCEO.vars({
////		vars:{
////			req: req,
////			res: res,
////			resource: {id: 1},
////			uid: req.query.uid,
////			cid: req.query.cid,
////			render: {module: 'map_access'},
////			tasks: {to_do:['do_table_check','get_init']}			
////		}
////	}).process();
////});
////
////router.get("/grid/rebuild",function(req,res){
////
////	// sample http://localhost:3085/grid/rebuild?uid=1df834fe6b
////	
////	console.log('/grid/rebuild');
////	//res.sendFile(vpath + "contact.html");
////    //res.render('pages/index');
////
////	mobileCEO.vars({
////		vars:{
////			req: req,
////			res: res,
////			resource: {id: 2},
////			render: {module: 'grid_rebuild'},
////			tasks: {}			
////			
////		}
////	}).process();
////	
////});


app.use("/",router);

/*
app.use("*",function(req,res){
  res.sendFile(vpath + "404.html");
});
*/

app.listen(conf.vars.port,function(){
	console.log("Live at Port " + conf.vars.port);
});
