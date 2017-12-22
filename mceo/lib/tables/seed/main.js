const Class = require('./../../class');
const table_main = require('./../table_main');

var main = module.exports = table_main.extend({
	schema: null,
	name: 'main',
	log: null,
	construct: function(parent){
		var t = this;
		t.parent = parent;
		t.log = t.parent.log;
		t.logger = t.parent.logger; 
		t.dbo = t.parent.dbo;
		t.schema = t.parent.dbo.schema;  
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
	},
	return_jo:function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		var jo = {name: "return_jo", ret_id: 1000};
		try{
			jo.gdata = [
				{ id : "1", "include" : "yes", "name" : "seattle, wa", "contact": "", "message": "", "lat": 47.606210, "lon": -122.332071 },
				{ id : "2", "include" : "yes", "name" : "denver, co", "contact": "", "message": "", "lat": 39.739236, "lon": -104.990251 },
				{ id : "3", "include" : "yes", "name" : "new york, ny", "contact": "", "message": "", "lat": 40.712784, "lon": -74.005941 },
			];
			jo.map = {zoom: {default: 5}};
			jo.map.init = {
				lat: 38.826992
				,lon: -104.932282
				,zoom: 9
			};
			jo.ggrid = { //set your grid id
					data: null,
					datatype: 'local',
					width: 500, //specify width; optional
					colNames:['tag','include','item'], //define column names
					colModel:[
					{name:'id', index:'id', key: true, width:20}
					,{name: "include", width: 25, align: "center",
					formatter: "checkbox", formatoptions: { disabled: false},
					edittype: "checkbox", editoptions: {value: "Yes:No", defaultValue: "Yes"},
					stype: "select", searchoptions: { sopt: ["eq", "ne"], 
						value: ":Any;true:Yes;false:No" } }
					,{name:'name', index:'name', width:100}
					], //define column models
					loadtext		: "Loading data...",
					pager: '#pager', //set your pager div id
					sortname: 'id', //the column according to which data is to be sorted; optional
					viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
					sortorder: "asc", //sort order; optional
					caption:"default info" //title of grid
				}
			t.set(jo, t, t.return_jo_2);
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}		
	},
	return_jo_2:function(owner){
		var t = owner;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		var jo = {name: "return_jo", ret_id: 1001};
		try{
			jo.gdata = [
				{ id : "34", "include" : "yes", "name" : "jim manton home address", "contact": "", "web": "", "message": "yes", "lat": 38.826992, "lon": -104.932282,"msg_msg": "front range mountains above Manitou Springs"}
				,{ id : "35", "include" : "yes", "name" : "jim manton denver address", "contact": "", "web": "", "message": "yes", "lat": 39.579405, "lon": -105.048436,"msg_msg": "apartment in south Denver, tech center location" }
				,{ id : "36", "include" : "no", "name" : "centurylink littleton", "contact": "yes", "web": "http://www.centurylink.com/new-customer/service/home/?pid=P_O:B:T1:US_CO:42561127A81:CLR&Campaign=B_Q_G_Brand_Colorado+Springs_T1_RV&keyword=centurylink&utm_medium=cpc&matchtype=e&utm_source=bing&utm_term=centurylink&utm_source=bing&utm_medium=cpc&utm_campaign=B_Q_G_Brand_Colorado%20Springs_T1_RV&utm_term=centurylink&utm_content=B%3EOther%3ECenturyLink%3ECore%20Terms%3ECore%3EEM&userGuid=2a4e6b1a-f6ef-4a40-baa0-3fa4d24c0ec7", "message": "yes", "lat": 39.571664, "lon": -104.997616 , "contact_msg": "contact message","msg_msg": "telecom"}
				,{ id : "37", "include" : "no", "name" : "pgi colorado springs", "contact": "", "web": "https://www.pgi.com/", "message": "yes", "lat": 38.900160, "lon": -104.872048 ,"msg_msg": "Global leader in web conferencing and collaboration technology: iMeet, GlobalMeet and GlobalMeet Audio give you a collaborative advantage." }
				,{ id : "38", "include" : "no", "name" : "pgi slk india", "contact": "", "web": "https://www.pgi.com/", "message": "yes", "lat": 12.9716, "lon": 77.5946 ,"msg_msg": "Manage offshore development team for MicroSoft partnered software development." }
				,{ id : "39", "include" : "no", "name" : "luxottica dallas tx", "contact": "", "web": "http://www.luxottica.com/en", "message": "", "lat": 32.893639, "lon": -96.894864 }
				,{ id : "40", "include" : "no", "name" : "p & t storm plotters hutchenson ks", "contact": "", "web": "", "message": "yes", "lat": 38.060845, "lon": -97.929774  ,"msg_msg": "weather tracking"}
				,{ id : "41", "include" : "no", "name" : "blockbuster ft worth tx", "contact": "", "web": "http://www.blockbuster.com/", "message": "yes", "lat": 32.755488, "lon": -97.330766  ,"msg_msg": "video rentals"}
				,{ id : "42", "include" : "no", "name" : "pclender honolulu hi", "contact": "", "web": "", "message": "yes", "lat": 21.306944, "lon": -157.858333  ,"msg_msg": "mortgage lending"}
				,{ id : "43", "include" : "no", "name" : "pclender philippine", "contact": "", "web": "", "message": "yes", "lat": 14.6041667, "lon": 120.9822222  ,"msg_msg": "Manage offshort development team for mortgage lending SaaS software."}
				,{ id : "44", "include" : "no", "name" : "barclays bank london uk", "contact": "yes", "web": "https://www.banking.barclaysus.com/index.html?refid=BBDMSPSTPEX0217&gclid=CNH466fmndQCFcIdfwodX0UFcQ", "message": "yes", "lat": 51.507351, "lon": -0.127758 ,"contact_msg": "contact message","msg_msg": "banking, check sorting"}
			];
			jo.map = {zoom: {default: 0}};
			jo.map.init = {
				lat: 38.826992
				,lon: -104.932282
				,zoom: 9
			};
			jo.ggrid = { //set your grid id
					data: null,
					datatype: 'local',
					width: 500, //specify width; optional
					colNames:['tag','include','item','contact','web','message'], //define column names
					colModel:[
					{name:'id', index:'id', key: true, width:20},
					{name: "include", width: 25, align: "center",
					formatter: "checkbox", formatoptions: { disabled: false},
					edittype: "checkbox", editoptions: {value: "Yes:No", defaultValue: "Yes"},
					stype: "select", searchoptions: { sopt: ["eq", "ne"], 
						value: ":Any;true:Yes;false:No" } },
					{name:'name', index:'name', width:100},
					{name:'contact', index:'contact', width:30, align: "center", edittype: "select"},
					{name:'web', index:'web', width:15, align: "center", edittype: "select"},
					{name:'message', index:'message', width:30, align: "center", edittype: "select"}
					], //define column models
					loadtext		: "Loading data...",
					pager: '#pager', //set your pager div id
					sortname: 'id', //the column according to which data is to be sorted; optional
					viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
					sortorder: "asc", //sort order; optional
					caption:"jim manton online resume" //title of grid
				}
			t.set(jo, t, null);
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}		
	},
	set: function(jo, owner, callback){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		try{
			var q = 'DELETE FROM ' + t.schema + '.'+jo.name+' ';
			q += 'WHERE ret_id='+jo.ret_id+' ';
			t.dbo.query(q, function(err, rows){    
				q  = 'INSERT INTO ' + t.schema + '.'+jo.name+' ';               
				q += 'SET ret_id='+jo.ret_id+' ';
				q += ',description="access denied" ';
				q += ",jo='"+JSON.stringify(jo)+"' ";          
				t.dbo.query(q, function(rows){
					t.logger.debug('record('+jo.ret_id+') added').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
					if(callback != null)
						callback(owner);
					else{
						t.parent.parent.res.write('grid rebuilt');
						t.parent.parent.res.end('\n');
					}
				});       
			});
		}catch(e){
			t.logger.error('').tag(t.log.err.setInput(e.message)).tag(t.log.rte).tag(t.log.lne).tagline();			
		}		
	}
});