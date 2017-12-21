const Class = require('./../../class');
const table_main = require('./../table_main');

var main = module.exports = table_main.extend({
	schema: 'mceo'
	,name: 'main'
	,construct: function(parent){
		var t = this;
		var funcName = 'tables.seed.main.construct';
		t.parent = parent;
		t.set_dbo();
	}
	,return_jo:function(){
		var t = this;
		var funcName = 'tables.seed.main.return_jo';
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
			console.log(funcName+' error: '+e.message);			
		}		
	}
	,return_jo_2:function(owner){
		var t = owner;
		var funcName = 'tables.seed.main.return_jo';
		var jo = {name: "return_jo_2", ret_id: 1001};
		try{
			jo.gdata = [
				{ id : "34", "include" : "yes", "name" : "jim manton XXXhome address", "contact": "", "message": "yes", "lat": 38.826992, "lon": -104.932282 }
				,{ id : "35", "include" : "yes", "name" : "jim manton denver address", "contact": "", "message": "yes", "lat": 39.579405, "lon": -105.048436 }
				,{ id : "36", "include" : "no", "name" : "centurylink littleton", "contact": "yes", "message": "", "lat": 39.571664, "lon": -104.997616 }
				,{ id : "37", "include" : "no", "name" : "pgi colorado springs", "contact": "", "message": "yes", "lat": 38.900160, "lon": -104.872048 }
				,{ id : "38", "include" : "no", "name" : "luxottica dallas tx", "contact": "", "message": "", "lat": 32.893639, "lon": -96.894864 }
				,{ id : "39", "include" : "no", "name" : "p & t storm plotters hutchenson ks", "contact": "", "message": "yes", "lat": 38.060845, "lon": -97.929774 }
				,{ id : "40", "include" : "no", "name" : "blockbuster ft worth tx", "contact": "", "message": "yes", "lat": 32.755488, "lon": -97.330766 }
				,{ id : "41", "include" : "no", "name" : "pclender honolulu hi", "contact": "", "message": "yes", "lat": 21.306944, "lon": -157.858333 }
				,{ id : "42", "include" : "no", "name" : "genisys london uk", "contact": "yes", "message": "yes", "lat": 51.507351, "lon": -0.127758 }
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
					colNames:['tag','include','item','contact','message'], //define column names
					colModel:[
					{name:'id', index:'id', key: true, width:20}
					,{name: "include", width: 25, align: "center",
					formatter: "checkbox", formatoptions: { disabled: false},
					edittype: "checkbox", editoptions: {value: "Yes:No", defaultValue: "Yes"},
					stype: "select", searchoptions: { sopt: ["eq", "ne"], 
						value: ":Any;true:Yes;false:No" } }
					,{name:'name', index:'name', width:100}
					,{name:'contact', index:'contact', width:30, align: "center", edittype: "select"}
					,{name:'message', index:'message', width:30, align: "center", edittype: "select"}
					], //define column models
					loadtext		: "Loading data...",
					pager: '#pager', //set your pager div id
					sortname: 'id', //the column according to which data is to be sorted; optional
					viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
					sortorder: "asc", //sort order; optional
					caption:"jim manton resume" //title of grid
				}
			t.set(jo, t, null);
		}catch(e){
			console.log(funcName+' error: '+e.message);			
		}		
	}
	,set: function(jo, owner, callback){
		var t = this;
		var funcName = 'tables.seed.main.query';
		try{
			var q = 'DELETE FROM ' + t.schema + '.'+jo.name+' ';
			q += 'WHERE ret_id='+jo.ret_id+' ';
			t.dbo.query(q, function(row){    
				q  = 'INSERT INTO ' + t.schema + '.'+jo.name+' ';               
				q += 'SET ret_id='+jo.ret_id+' ';
				q += ',description="access denied" ';
				q += ",jo='"+JSON.stringify(jo)+"' ";          
				t.dbo.query(q, function(row){
					console.log(funcName+' record('+jo.ret_id+') added');             
					if(callback != null)
						callback(owner);
				});       
			});
		}catch(e){
			console.log(funcName+' error: '+e.message);			
		}		
	}
});