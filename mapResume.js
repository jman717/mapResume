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


app.use("/",router);

/*
app.use("*",function(req,res){
  res.sendFile(vpath + "404.html");
});
*/

app.listen(conf.vars.port,function(){
	console.log("Live at Port " + conf.vars.port);
});
