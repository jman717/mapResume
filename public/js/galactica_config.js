3
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
	
document.addEventListener("keydown", function(event) {
	//alert('listner key pressed='+event.which);
	var act;
	switch(event.which){
		case 33:	//page up
			act="pg_up";
			break;
		case 34:	//page down
			act="pg_down";
			break;
		case 35:	//last page
			act="last";
			break;
		case 36:	//first page
			act="first";
			break;
		case 116:	//reload page
			window.location.reload();
			break;
		default:
			return true;
	};
	object_main.do_new_data_action({
		"action":act
	});
	event.preventDefault();
	return false;
});

var onload=function(){
	alert('onload look at this=http://jsfiddle.net/danypd69/quuvR/2/');
	
	object_main=new main();
};

var main=function(){
	object_main=this;
	var t=object_main;
	
	t.use_test_data=false;
	t._colNames=[];
	t._colModel=[];
	t._json_data=null;
	t._page=0;
	t._records=0;
	t._lastpage=0;
	t._rowNum=0;
	t._id_count=null;
	t._id_start=null;
	t._pg_down='pg_down';
	t._pg_up='pg_up';
	t._action=null;
	t._grid_data=null;
	t._colModel_names=null;
	t.search_object=new search_object();
	t._base_url='http://localhost:3000';
	t._bible=new galactica_bible();
	t.tab_name=["saved_searches","search","manual_entry"];
	t.grid_configs=[];
	t.selected_tab_index=1;
	t.after_grid_init=function(){return this};
	t.init();
};

main.prototype.flip=function(t){
alert('jrm debug 10.00');		
	this.search_object.flip(t);
};

main.prototype.search=function(t){
	this.search_object.set_search(t);
	this.search_object.search();
};

main.prototype.get_search_object=function(){
	return this.search_object;
};

main.prototype.set_action=function(v){
	this._action=v;
};

main.prototype.get_action=function(){
	return this._action;
};

main.prototype.add_colModel_names=function(v){
	this._colModel_names=v;
};

main.prototype.get_colModel_names=function(){
	return this._colModel_names;
};

main.prototype.add_GridData=function(v){
	this._grid_data=v;
};

main.prototype.get_GridData=function(){
	return this._grid_data;
};

main.prototype.clear_colNames=function(){
	this._colNames=[];
};

main.prototype.add_colName=function(v){
	this._colNames[this._colNames.length]=v;
};

main.prototype.get_colNames=function(){
	return this._colNames;
};

main.prototype.clear_colModel=function(){
	this._colModel=[];
};

main.prototype.add_colModel=function(v){
	this._colModel[this._colModel.length]=v;
};

main.prototype.get_colModel=function(){
	return this._colModel;
};

main.prototype.add_page=function(v){
	this._page=v;
};

main.prototype.get_page=function(){
	return this._page;
};

main.prototype.add_records=function(v){
	this._records=v;
};

main.prototype.get_records=function(){
	return this._records;
};

main.prototype.set_id_start=function(v){
	this._id_start=v;
};

main.prototype.get_id_start=function(){
	return this._id_start;
};

main.prototype.add_lastpage=function(v){
	this._lastpage=v;
};

main.prototype.get_lastpage=function(){
	return this._lastpage;
};

main.prototype.get_rowNum=function(){
	return this.get_grid_object().selected_tab_config.rowNum;
};

main.prototype.getWhichGrid=function(){
	return this.get_grid_object().selected_tab_config.which_grid_name;
};

main.prototype.getWhichPGrid=function(){
	return this.get_grid_object().selected_tab_config.which_pgrid_name;
};
main.prototype.getMultiSelect=function(){
	return this.get_grid_object().selected_tab_config.multiselect;
};

main.prototype.getCellEdit=function(){
	return this.get_grid_object().selected_tab_config.cellEdit;
};

main.prototype.getFilterToolBar=function(){
	return this.get_grid_object().selected_tab_config.filterToolBar;
};

main.prototype.getCaption=function(){
	return this.get_grid_object().selected_tab_config.caption;
};

main.prototype.colNames=function(v){
	this._colNames=v;
};

main.prototype.colNames=function(){
	return this._colNames;
};

main.prototype.colModel=function(v){
	this._colModel=v;
};

main.prototype.colModel=function(){
	return this._colModel;
};

main.prototype.get_id_count=function(){
	var t=object_main;
	var funcName='main.get_id_count';
	try{
		var idc=t._id_count;
		if(idc==null)
			idc=t.get_id_start()+1;
		else
			idc++;
		t._id_count=idc;
		return t._id_count;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.onPaging=function(pgButton){
	var t=object_main;
	var funcName='main.onPaging';
	
	switch(true){
		case (pgButton.indexOf('records') > -1):
			setTimeout(
				function() { 
					alert(funcName+' work here on getting the new recNum event('+pgButton+') rownum('+$(t.getWhichGrid()).getGridParam("rowNum")+')'); 
				}, 1);
			break;
			t.do_new_data_action({
				"action":"pg_down"
			});
			break;
		case (pgButton.indexOf('next') > -1):
			t.do_new_data_action({
				"action":"pg_down"
			});
			break;
		case (pgButton.indexOf('prev') > -1):
			t.do_new_data_action({
				"action":"pg_up"
			});
			break;
		case (pgButton.indexOf('first') > -1):
			t.do_new_data_action({
				"action":"first"
			});
			break;
		case (pgButton.indexOf('last') > -1):
			t.do_new_data_action({
				"action":"last"
			});
			break;
	};
};

main.prototype.do_new_data_action=function(jo){
	var t=object_main;
	var funcName='main.do_new_data_action';
	try{
		if(typeof jo=='undefined')
			throw "json object not defined";
		if(typeof jo.action!='undefined'){
			t.set_action(jo.action);
			t.mass_unloadable_grids();
			t.get_grid_object().get_db_object().get_data();
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.mass_unloadable_grids=function(jo){
	var t=object_main;
	var funcName='main.mass_unloadable_grids';
	var grid_name;
	try{
		for(var i=0;i<t.tab_name.length;i++){
			if(typeof t.grid_configs[i]!='undefined'){
				if(t.grid_configs[i].selected_tab_config.mass_unloadable_grid){
					t.grid_configs[i].load_grid=true;
					grid_name=t.grid_configs[i].selected_tab_config.which_grid_name;
					//alert(funcName+' unloading grid('+grid_name+')');
					$(grid_name).GridUnload();
				};
			};
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.init=function(){
	var t=object_main;
	var funcName='main.init';
	var e,n;
	try{
		for(var i=0;i<t.tab_name.length;i++){
			t.grid_configs[i]=new jqGrid_config(t.tab_name[i], i, t.get_config(i), t);
			n=t.tab_name[i]+'_id';
			t._id_count=null;
			e=document.getElementById(n);
			e.selected_tab_index=i;
			e.onclick=t.tab_click;
			if(i==t.selected_tab_index)
				e.click();
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.reDefineColWidth=function(){
	var t=object_main;
	var funcName='main.reDefineColWidth';
	try{
		var colModel=t.get_colModel();
		/*
		var ii,cml;
		ii=0;
		cml=colModel.length;
		if(t.getMultiSelect()){
			ii++;
			colModel.length++;
		};
		*/
		var thd = $("thead:first", $(t.getWhichGrid())[0].grid.hDiv)[0];
		var i,ii,px;
		ii=0;
		if(t.getMultiSelect())
			ii++;
		for(i=0; i<colModel.length; i++ ){			
			px=colModel[i].width+'px';
		    //$("tr.ui-jqgrid-labels th:eq(" + i + ")", thd).attr("title", 'search for column values below');
		    $("tr.ui-jqgrid-labels th:eq(" + ii + ")", thd).css('width',px);
			$(t.getWhichGrid()).find('td:eq('+ii+')').each(function(){$(this).css('width',px);}); 	// will set the column widths
			ii++;
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.grid_init=function(){
	var t=object_main;
	var funcName='main.grid_init';

	var data=t.get_GridData()
	var names=t.get_colModel_names();
	var gData=[];

	for (var i = 0; i < data.length; i++) {
		gData[i] = {};
		for (var j = 0; j < data[i].length; j++) 
			gData[i][names[j]] = data[i][j];
	};

//temp stuff	
var mydata = [
	{id: "1",  invdate: "2007-10-01", name: "test test test test test test",   note: "note",   amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00"},
	{id: "2",  invdate: "2007-10-02", name: "test2",  note: "note2 note2 note2 note2 note2 note2 note2",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00"},
	{id: "3",  invdate: "2007-09-01", name: "test3",  note: "note3",  amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00"},
	{id: "4",  invdate: "2007-10-04", name: "test4",  note: "note4",  amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00"},
	{id: "5",  invdate: "2007-10-31", name: "test5 test5 test5 test5 test5 test5 test5",  note: "note5",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00"},
	{id: "6",  invdate: "2007-09-06", name: "test6",  note: "note6",  amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00"},
	{id: "7",  invdate: "2007-10-04", name: "test7",  note: "note7",  amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00"},
	{id: "8",  invdate: "2007-10-03", name: "test8",  note: "note8",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00"},
	{id: "9",  invdate: "2007-09-01", name: "test9",  note: "note9",  amount: "400.00", tax: "30.00", closed: false, ship_via: "TN", total: "430.00"},
	{id: "10", invdate: "2007-09-08", name: "test10", note: "note10", amount: "500.00", tax: "30.00", closed: true,  ship_via: "TN", total: "530.00"},
	{id: "11", invdate: "2007-09-08", name: "test11", note: "note11", amount: "500.00", tax: "30.00", closed: false, ship_via: "FE", total: "530.00"},
	{id: "12", invdate: "2007-09-10", name: "test12", note: "note12 note12 note12 note12 note12 note12", amount: "500.00", tax: "30.00", closed: false, ship_via: "FE", total: "530.00"}
];

	try{
		t._id_count=null;	
		$(t.getWhichGrid()).jqGrid({
			datatype: 'local',
			data: mydata,
			colNames: ['Id', 'Client', 'Date', 'Amount in EUR', 'Tax in EUR', 'Total in EUR (bla bla bla)', 'Closed', 'Shipped via', 'Notes'],
			colModel: [
				{name: 'id', index: 'id', width: 45, align: 'center', sorttype: 'int', frozen: true},
				{name: 'name', index: 'name', width: 70, editable: true, frozen: true},
				{name: 'invdate', index: 'invdate', width: 80, align: 'center', sorttype: 'date',
					formatter: 'date', formatoptions: {newformat: 'm/d/Y'}, datefmt: 'm/d/Y'},
				{name: 'amount', index: 'amount', width: 75, formatter: 'number', align: 'right', editable: true},
				{name: 'tax', index: 'tax', width: 50, formatter: 'number',
					formatoptions: {decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 4, defaultValue: '0.0000'},
					align: 'right', editable: true, editoptions: {readonly: true}},
				{name: 'total', index: 'total', width: 60, formatter: 'number', align: 'right', editable: true},
				{name: 'closed', index: 'closed', width: 70, align: 'center', editable: true,
					formatter: 'checkbox', edittype: 'checkbox', editoptions: {value: 'Yes:No', defaultValue: 'Yes'}},
				{name: 'ship_via', index: 'ship_via', width: 60, align: 'center', formatter: 'select', editable: true,
					edittype: 'select', editoptions: {value: 'FE:FedEx;TN:TNT;IN:Intim', defaultValue: 'Intime'}},
				{name: 'note', index: 'note', width: 70, sortable: false, editable: true}
			],
			rowNum: 10,
			rowList: [5, 10, 20],
			pager: $(t.getWhichPGrid()),
			gridview: true,
			rownumbers: true,
			sortname: 'invdate',
			viewrecords: true,
			sortorder: 'desc',
			caption: 'Frozen columns with wrapped of texts in cells and column headers',
			height: '100%',
			shrinkToFit: false,
			width: 550,
			loadComplete: function () {
				t.fixPositionsOfFrozenDivs.call(this);
			}			
		});
		$(t.getWhichGrid()).jqGrid('gridResize', {
			minWidth: 450,
			stop: function () {
				fixPositionsOfFrozenDivs.call(this);
				fixGboxHeight.call(this);
			}
		});
		$(t.getWhichGrid()).bind("jqGridResizeStop", function () {
			t.resizeColumnHeader.call(this);
			t.fixPositionsOfFrozenDivs.call(this);
			t.fixGboxHeight.call(this);
		});
		t.resizeColumnHeader.call($(t.getWhichGrid())[0]);
		$(t.getWhichGrid()).jqGrid('setFrozenColumns');
		$(t.getWhichGrid()).triggerHandler("jqGridAfterGridComplete");
		t.fixPositionsOfFrozenDivs.call($(t.getWhichGrid())[0]);		
		return this;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

/*
main.prototype.set_colors=function(){
	var t=object_main;
	var funcName='main.set_colors';
	var ids =$(t.getWhichGrid()).jqGrid('getDataIDs');
	try{
		//maybe this: http://code-cocktail.in/ultimate-tweets/apply-new-class-jqgrid-column/
		//try this: http://stackoverflow.com/questions/19975125/jqgrid-how-to-apply-extra-classes-to-header-columns
	
	
		alert(funcName+' ids='+ids.length);
		$(t.getWhichGrid()).jqGrid('setCell', ids[4], 'MedRoomCallLetters', '', '',{style:'background:#F0E68C;color:black;text-align:center;'});
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.applyClassesToHeaders = function () {
	//Takes css classes assigned to each column in the jqGrid colModel 
	//and applies them to the associated header.
	var t=object_main;
	var funcName='main.applyClassesToHeaders';
	var grid=$(t.getWhichGrid());
	try{
		var trHead = jQuery("thead:first tr", grid.hdiv);
		var colModel = grid.getGridParam("colModel");

		for (var iCol = 0; iCol < colModel.length; iCol++) {
			var columnInfo = colModel[iCol];
			if (columnInfo.class) {
				var headDiv = jQuery("th:eq(" + iCol + ") div", trHead);
				headDiv.addClass(columnInfo.class);
			}
		}
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};
*/

main.prototype.fixPositionsOfFrozenDivs=function(){
	var t=object_main;
	var funcName='main.fixPositionsOfFrozenDivs';
	try{
alert(funcName);
		var $rows;
		if (this.grid.fbDiv !== undefined) {
			$rows = $('>div>table.ui-jqgrid-btable>tbody>tr', this.grid.bDiv);
			$('>table.ui-jqgrid-btable>tbody>tr', this.grid.fbDiv).each(function (i) {
				var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
				if ($(this).hasClass("jqgrow")) {
					$(this).height(rowHight);
					rowHightFrozen = $(this).height();
					if (rowHight !== rowHightFrozen) {
alert(funcName+' debug 10.00');
						$(this).height(rowHight + (rowHight - rowHightFrozen));
					}
				}
			});
			$(this.grid.fbDiv).height(this.grid.bDiv.clientHeight);
			$(this.grid.fbDiv).css($(this.grid.bDiv).position());
		}
		if (this.grid.fhDiv !== undefined) {
			$rows = $('>div>table.ui-jqgrid-htable>thead>tr', this.grid.hDiv);
			$('>table.ui-jqgrid-htable>thead>tr', this.grid.fhDiv).each(function (i) {
				var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
				$(this).height(rowHight);
				rowHightFrozen = $(this).height();
alert(funcName+' debug 10.02 rowHight('+rowHight+') rowHightFrozen('+rowHightFrozen+')');	
$(this).height(50);
				if (rowHight !== rowHightFrozen) {
					$(this).height(rowHight + (rowHight - rowHightFrozen));
				}
			});
			$(this.grid.fhDiv).height(this.grid.hDiv.clientHeight);
			$(this.grid.fhDiv).css($(this.grid.hDiv).position());
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.fixGboxHeight=function(){
	var t=object_main;
	var funcName='main.fixGboxHeight';
alert(funcName);
	try{
		var gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight(),
			pagerHeight = $(this.p.pager).outerHeight();

		$("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
		gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight();
		pagerHeight = $(this.p.pager).outerHeight();
		$("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.resizeColumnHeader=function(){
	var t=object_main;
	var funcName='main.resizeColumnHeader';
	try{
alert(funcName);
		var rowHight, resizeSpanHeight,
			// get the header row which contains
			headerRow = $(this).closest("div.ui-jqgrid-view")
				.find("table.ui-jqgrid-htable>thead>tr.ui-jqgrid-labels");

		// reset column height
		headerRow.find("span.ui-jqgrid-resize").each(function () {
			this.style.height = '';
		});

		// increase the height of the resizing span
		resizeSpanHeight = 'height: ' + headerRow.height() + 'px !important; cursor: col-resize;';
		headerRow.find("span.ui-jqgrid-resize").each(function () {
			this.style.cssText = resizeSpanHeight;
		});

		// set position of the dive with the column header text to the middle
		rowHight = headerRow.height();
		headerRow.find("div.ui-jqgrid-sortable").each(function () {
			var $div = $(this);
			$div.css('top', (rowHight - $div.outerHeight()) / 2 + 'px');
		});
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.set_colors=function(){
	var t=object_main;
	var funcName='main.set_colors';
	var ids =$(t.getWhichGrid()).jqGrid('getDataIDs');
	try{
		//maybe this: http://code-cocktail.in/ultimate-tweets/apply-new-class-jqgrid-column/
		//try this: http://stackoverflow.com/questions/19975125/jqgrid-how-to-apply-extra-classes-to-header-columns
	
	
		alert(funcName+' ids='+ids.length);
		$(t.getWhichGrid()).jqGrid('setCell', ids[4], 'MedRoomCallLetters', '', '',{style:'background:#F0E68C;color:black;text-align:center;'});
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.onSearchClick=function(){
	var t=object_main;
	var funcName='main.onSearchClick';
	try{
		alert(funcName);
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.get_grid_object=function(){
	return this.grid_configs[this.selected_tab_index];
};

main.prototype.tab_click=function(){
	var t=object_main;
	var funcName='main.tab_click';
	try{
		//alert(funcName+' selected_tab_index('+this.selected_tab_index+')');
		t.selected_tab_index=this.selected_tab_index;
		
		t.process();
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.process=function(){
	var t=object_main;
	var funcName='main.process';
	try{
		if(!t.get_grid_object().load_grid)
			return;
		//$(t.getWhichGrid()).GridUnload();  //need to do something different here
		t.set_action(null);
		t.getData();
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.prepareData=function(){
	var t=object_main;
	var funcName='main.prepareData';
	try{
		t.clear_colNames();
		t.clear_colModel();
		var cn=t._json_data.dbData.column_names;
		for(var i=0;i<cn.length;i++){
			if(typeof t._bible.dbData_to_jqGrid[cn[i]]=='undefined')
				throw "cannot find ("+cn[i]+") in bible";
			//alert(funcName+' colName('+t._bible.dbData_to_jqGrid[cn[i]].colName+') i('+i+')');
			t.add_colName(t._bible.dbData_to_jqGrid[cn[i]].colName);
			t.add_colModel(t._bible.dbData_to_jqGrid[cn[i]].colModel);
		};
		t.add_colModel_names(t._json_data.dbData.column_names);
		t.add_GridData(t._json_data.dbData.data);
		t.add_page(t._json_data.dbData.pager.page);
		t.add_records(t._json_data.dbData.pager.records);
		t.add_lastpage(t._json_data.dbData.pager.lastpage);
		t.set_id_start(t._json_data.dbData.pager.id_start);
		return this;
	}catch(e){
		if(typeof e.message=='undefined')
			alert(funcName+" error("+e+")");
		else
			alert(funcName+" error("+e.message+")");
	};
};

main.prototype.getData=function(){
	var t=object_main;
	var funcName='main.getData';
	try{
		if(t.use_test_data)
			t._json_data=t.get_test_data();
		else
			t.get_grid_object().get_db_object().get_data();
		return this;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.get_config=function(idx){
	var t=object_main;
	var funcName='main.get_config';
	try{
		switch(idx){
			case 0:
				return new saved_searches_jqGrid_config();
			case 1:
				return new search_jqGrid_config();
			case 2:
				return new manual_entry_jqGrid_config();
		};
		throw new Error(funcName+' error: no config defined. Selected tab='+t.selected_tab_index);
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.get_json_data_call=function(){
	var t=object_main;
	var funcName='main.get_json_data_call';
	try{
		return {
			"jqGrid":{
				"pager":{
					"page": t.get_page()
					,"records": t.get_records()
					,"rowNum": t.get_rowNum()
					,"action": t.get_action()
				}
			}
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

main.prototype.get_test_data=function(){
	var t=object_main;
	var funcName='main.get_test_data';
	try{
		switch(t.selected_tab_index){
			case 0:
				return saved_searches_test_data;
			case 1:
				return search_test_data;
			case 2:
				return manual_entry_test_data;
		};
		throw new Error(funcName+' error: no config defined. Selected tab='+t.selected_tab_index);
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

var saved_searches_jqGrid_config=function(){
	var t=this;
	t._gname='row_jqGrid_saved_search';
	t.which_grid_name='#' + t._gname;
	t.which_pgrid_name='#p' + t._gname;
	t.caption='Saved Searches';
	t.multiselect=false;
	t.rowNum=10;
	t.cellEdit=false;
	t.mass_unloadable_grid=false;
	t.filterToolBar=false;
};

var search_jqGrid_config=function(){
	var t=this;
	t._gname='row_jqGrid_search';
	t.which_grid_name='#' + t._gname;
	t.which_pgrid_name='#p' + t._gname;
	t.caption='Service Paths';
	t.multiselect=false;
	t.rowNum=15;
	t.mass_unloadable_grid=true;
	t.cellEdit=false;
	t.filterToolBar=false;
};

var manual_entry_jqGrid_config=function(){
	var t=this;
	t._gname='row_jqGrid_manual_entry';
	t.which_grid_name='#' + t._gname;
	t.which_pgrid_name='#p' + t._gname;
	t.caption='Manual Entry Records';
	t.rowNum=15;
	t.multiselect=true;
	t.cellEdit=true;
	t.mass_unloadable_grid=true;
	t.filterToolBar=false;
};


var search_object=function(){
	var t=this;
	t._params_json=null;
};

search_object.prototype.get_params=function(){
	return this._params_json;
};

search_object.prototype.flip=function(t){
	var funcName='search_object.flip';
	try{
		var d='fa fa-caret-down fa-lg';
		var r='fa fa-caret-right fa-lg';
		
		var sc=$("#search_caret");
		var cl=sc.attr('class');
		switch(t.id){
			case 'headingSearch':
				$("#search_caret").attr('class', r);
				$("#data_caret").attr('class', d);
				break;
			case 'headingData':
				$("#search_caret").attr('class', d);
				$("#data_caret").attr('class', r);
				break;
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

search_object.prototype.set_search=function(t){
	var to=object_main;
	var funcName='search_object.search';
	try{
		var scl=$("#search_call_letters").val();
		var scn=$("#search_channel_number").val();
		var so=$("#search_options").val();
		var jo={
				"type":"search"
				,"search":{
					"cl":scl
					,"cn":scn
					,"o":so
			}
		};
		to.search_object._params_json=jo;
		//alert(funcName+' call_letters('+scl+') channel numbers('+scn+') options('+so+')');
		
		to.mass_unloadable_grids();
		to.after_grid_init=function(){
			$("#headingData").click();
			return this;
		};

	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};
search_object.prototype.search=function(){
	var t=object_main;
	var funcName='search_object.search';
	try{
		t.get_grid_object().get_db_object().get_data();
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};