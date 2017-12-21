const Class = require('./../class');

var return_jo = module.exports = Class.extend({
	parent: null
	,return_msg: ['no error'
					,'general error message'
					]
	,return_code: 0
	,gdata: [
		{ id : "34", "include" : "yes", "name" : "jim manton home address", "details": "", "message": "yes" },
		{ id : "35", "include" : "yes", "name" : "jim manton denver address", "details": "", "message": "yes" },
		]
	,ggrid: { //set your grid id
			data: null,
			datatype: 'local',
			width: 500, //specify width; optional
			colNames:['tag','include','item','details','message'], //define column names
			colModel:[
			{name:'id', index:'id', key: true, width:20}
			,{name: "include", width: 25, align: "center",
            formatter: "checkbox", formatoptions: { disabled: false},
            edittype: "checkbox", editoptions: {value: "Yes:No", defaultValue: "Yes"},
            stype: "select", searchoptions: { sopt: ["eq", "ne"], 
                value: ":Any;true:Yes;false:No" } }
			,{name:'name', index:'name', width:100}
			,{name:'details', index:'details', width:30, align: "center", edittype: "select"}
			,{name:'message', index:'message', width:30, align: "center", edittype: "select"}
			], //define column models
			loadtext		: "Loading data...",
			pager: '#pager', //set your pager div id
			sortname: 'id', //the column according to which data is to be sorted; optional
			viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
			sortorder: "asc", //sort order; optional
			caption:"jim manton resume" //title of grid
		}
	,map: {
			init: {
				lat: 38.826992
				,lon: -104.932282
			}
		}
	,construct: function(parent){
		var t = this;
		var funcName = 'return_jo.construct';
		t.parent = parent.parent;
		t.log = t.parent.log;
		t.logger = t.parent.logger;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
	}
	,get: function(){
		var t = this;
		t.logger.trace('').tag(t.log.rte).tag(t.log.act).tag(t.log.lne).tagline();
		t.ggrid.data = t.gdata;
		return {error: {code: this.return_code, msg: '"'+this.return_msg[this.return_code]+'"'}
			,ggrid: t.ggrid
			,map: t.map
		};
	}
});