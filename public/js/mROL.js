"use strict";

/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2018-01-24
*/

var owner;
class roles_grid{
	constructor(parent) {
		var t = this;
		owner = t;
		t.parent = parent;
		t.grid_data_jo = null;
		t.set_data();
	}

	set_data(){
		var t = this;
		var fn='roles_grid.set_data';
		t.grid_jo = t.return_jo_2();
		t.grid_data_jo = t.set_funcs(t.grid_jo);
		t.set_grid();
	}

	set_funcs(	){
		var t = this;
		var fn='roles_grid.set_funcs';
		try{
			grid_data_jo.ggrid.onSelectRow = t.onSelectRow;
			grid_data_jo.ggrid.onCellSelect = t.onCellSelect;
			grid_data_jo.ggrid.beforeSelectRow = t.beforeSelectRow;
			grid_data_jo.ggrid.loadComplete = t.loadComplete;
			var col = grid_data_jo.ggrid.colModel;
			for(var i=0;i<col.length;i++){
				if(col[i].name == 'web')
					col[i].formatter = t.webFormatter;
				if(col[i].name == 'contact')
					col[i].formatter = t.contactFormatter;
				if(col[i].name == 'message')
					col[i].formatter = t.messageFormatter;
			}
			return grid_data_jo;
		}catch(e){
			alert('error: ' + e.message);
		}
	}

	set_grid(){
		var t = this;
		var fn='roles_grid.set_grid';
		try{
//alert(fn + " debug 10.00 = " + JSON.stringify(t.grid_data_jo.ggrid));			
			$("#grid").jqGrid(t.grid_data_jo.ggrid);    
//alert(fn + " debug 10.01");			

			//center the caption
			$("#grid").closest("div.ui-jqgrid-view")
				.children("div.ui-jqgrid-titlebar")
				.css("text-align", "center")
				.children("span.ui-jqgrid-title")
				.css("float", "none");
			//alert(fn);
		}catch(e){
			alert(fn+' error: '+e.message);
		}
	}

	webFormatter(cellvalue, options, rowObject){
		if(cellvalue == '')
			return '';
		return '<a href="'+mceo.roles_grid.getWebUrl(rowObject.id)+'" title="show web page" target="_blank"><i class=\"fa fa-internet-explorer fa-2x\" style=\"color:blue\" /></a>'
	}

	contactFormatter(cellvalue, options, rowObject){
		if(cellvalue == '')
			return '';
		return '<a href="#" title="get details" onClick="mceo.server_data.contactOnClick(this,' + rowObject.id + ');return false;"><i class=\"fa fa-user fa-2x\" style=\"color:blue\" /></a>'
	}

	messageFormatter(cellvalue, options, rowObject){
		if(rowObject.message == 'yes')
			return '<a href="#" title="get details" onClick="mceo.server_data.messageOnClick(this,'+rowObject.id+');return false;"><i class=\"fa fa-commenting-o fa-2x\" style=\"color:blue\" /></a>'
		else
			return '';
	}

	return_jo_2(){
		var t = owner;
		var fn='roles_grid.set_grid';
		var jo = {name: "return_jo", ret_id: 1001};
		try{
			jo.ggrid = { //set your grid id
					data: [
						{ id : "1", "roles" : "TEST-ROLE-B1", "alias": "some new name", "use" : "yes"}
						,{ id : "2", "roles" : "TEST-ROLE-B2", "alias": "", "use" : "no"}
						,{ id : "3", "roles" : "TEST-ROLE-B3", "alias": "another used name", "use" : "yes"}
						,{ id : "4", "roles" : "Assign Role", "alias": "role goes here", "use" : "no"}
						,{ id : "5", "roles" : "TEST-ROLE-B4", "alias": "captain obvious", "use" : "yes"}
						,{ id : "6", "roles" : "HIPAA compliance Officer", "alias": "person in change", "use" : "yes"}
						,{ id : "7", "roles" : "Facilities Manager", "alias": "building supervisor", "use" : "yes"}
						,{ id : "8", "roles" : "Project Manager", "alias": "", "use" : "no"}
						,{ id : "9", "roles" : "Approval Authority", "alias": "signitory", "use" : "yes"}
					],
					datatype: 'local',
					width: 800, //specify width; optional
					colNames:['id','roles','alias','use'], //define column names
					colModel: [
						{name:'id', index:'id', key: true, width:20}
						,{name:'roles', index:'roles', width:100}
						,{name:'alias', index:'contact', width:100, align: "center",editable:true, edittype: "textarea"}
						,{name: "use", width: 25, align: "center",
							formatter: "checkbox", formatoptions: { disabled: false},
							edittype: "checkbox", editoptions: {value: "Yes:No", defaultValue: "Yes"},
							stype: "select", searchoptions: { sopt: ["eq", "ne"], 
								value: ":Any;true:Yes;false:No"}}
					], //define column models
					loadtext		: "Loading data...",
					cellEdit: true,
					pager: '#pager', //set your pager div id
					sortname: 'id', //the column according to which data is to be sorted; optional
					viewrecords: true, //if true, displays the total number of records, etc. as: "View X to Y out of Z” optional
					sortorder: "asc", //sort order; optional
					caption:"roles mock up in a jqGrid" //title of grid
				}
			return jo;
		}catch(e){
			alert(fn+' error: '+e.message);
		}		
	}
}