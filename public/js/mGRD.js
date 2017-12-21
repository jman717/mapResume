
var grid_core = Class.extend({
});

var map_marker_grid = grid_core.extend({
	parent: null,
	server_data: null,
	set_data: null,
	highlight_row: null,
	construct: function(parent) {
		var t = this;
		var fn='map_marker_grid.construct';
		t.parent = parent;
	},
	set_data: function(server_data){
		var t = this;
		var fn='map_marker_grid.set_grid';
		t.server_data = t.set_funcs(server_data);
	},
	set_funcs: function(server_data){
		var t = this;
		var fn='map_marker_grid.set_funcs';
		server_data.ggrid.onSelectRow = t.onSelectRow;
		server_data.ggrid.onCellSelect = t.onCellSelect;
		server_data.ggrid.beforeSelectRow = t.beforeSelectRow;
		server_data.ggrid.loadComplete = t.loadComplete;
		var col = server_data.ggrid.colModel;
		for(var i=0;i<col.length;i++){
			if(col[i].name == 'web')
				col[i].formatter = mceo.map_marker_grid.webFormatter;
			if(col[i].name == 'contact')
				col[i].formatter = mceo.map_marker_grid.contactFormatter;
			if(col[i].name == 'message')
				col[i].formatter = mceo.map_marker_grid.messageFormatter;
		}
		return server_data;
	},
	getContactMsg: function(id){
		var t = mceo.map_marker_grid;
		var fn='map_marker_grid.getContactMsg';
		var d = t.server_data.ggrid.data;
		for(var i=0;i<d.length;i++)
			if(d[i].id == id)
				if(typeof d[i].contact_msg != 'undefined')
					return d[i].contact_msg;
		return null;
	},
	getMsgMsg: function(id){
		var t = mceo.map_marker_grid;
		var fn='map_marker_grid.getMsgMsg';
		var d = t.server_data.ggrid.data;
		for(var i=0;i<d.length;i++)
			if(d[i].id == id)
				if(typeof d[i].msg_msg != 'undefined')
					return d[i].msg_msg;
		return null;
	},
	getWebUrl: function(id){
		var t = mceo.map_marker_grid;
		var fn='map_marker_grid.getWebUrl';
//alert(fn + ' id=' + id);
		var d = t.server_data.ggrid.data;
		for(var i=0;i<d.length;i++)
			if(d[i].id == id)
				if(typeof d[i].web != 'undefined' && d[i].web != ''){
//alert(fn + ' web=' + d[i].web);
					return d[i].web;
				}
		return null;
	},
	webFormatter: function(cellvalue, options, rowObject){
		if(cellvalue == '')
			return '';
		return '<a href="'+mceo.map_marker_grid.getWebUrl(rowObject.id)+'" title="show web page" target="_blank"><i class=\"fa fa-internet-explorer fa-2x\" style=\"color:blue\" /></a>'
	},
	contactFormatter: function(cellvalue, options, rowObject){
		if(cellvalue == '')
			return '';
		return '<a href="#" title="get details" onClick="mceo.server_data.contactOnClick(this,' + rowObject.id + ');return false;"><i class=\"fa fa-user fa-2x\" style=\"color:blue\" /></a>'
	},
	messageFormatter: function(cellvalue, options, rowObject){
		if(rowObject.message == 'yes')
			return '<a href="#" title="get details" onClick="mceo.server_data.messageOnClick(this,'+rowObject.id+');return false;"><i class=\"fa fa-commenting-o fa-2x\" style=\"color:blue\" /></a>'
		else
			return '';
	},
	beforeSelectRow: function (rowid, e) {
		var t = mceo.map_marker_grid;
		var $self = $(this),
			iCol = $.jgrid.getCellIndex($(e.target).closest("td")[0]),
			cm = $self.jqGrid("getGridParam", "colModel"),
			localData = $self.jqGrid("getLocalRow", rowid);
		if (cm[iCol].name === "include") {
			localData.closed = $(e.target).is(":checked");
			var v = (localData.closed) ? 'yes' : 'no';
			$self.jqGrid('setCell', rowid, 'include', v);
			t.set_row({id: rowid, include: v});
			t.highlight_row = rowid;
			t.do_highlight_row();
		}
		return true; // allow selection
	},
	loadComplete: function () {
		var t = mceo.map_marker_grid;
		var fn = 'mGRD.js loadComplete';
		t.do_highlight_row();
	},
	do_highlight_row(){
		var t = this;
		if(t.highlight_row != null)
			$("#grid").jqGrid('setSelection', t.highlight_row, false);
		
	},
	set_row: function(jo){
		var t = this;
		var fn='mGRD.js map_marker_grid.set_row';
		var d = t.server_data.ggrid.data;
		try{
			for(var i=0; i < d.length; i++){
				if(d[i].id == jo.id){
					for(z in jo){
						if(z == 'id')
							continue;
						d[i][z] = jo[z];
					}
				}
			}
			mceo.map.refresh_pins();
		}catch(e){
			alert(fn+' error: '+e.message);					
		}
	},
	onSelectRow: function(rowId, status, e){
		//alert('onSelectRow debug 2 rowId('+rowId+')');
	},
	onCellSelect: function (rowId, iCol, content, event){
//alert('onCellSelect debug 3');
		/*
		mceo.dialog_box.show(
			{title: "Title"
			,text: content
			,buttons:{
					"Ok": function() {
					$(this).dialog('close');
				}
			}
		});
		*/
	},
	row_select: function(id){
		var t = this;
		var fn = 'map_marker_grid.row_select';
		try{
			t.highlight_row = id;
			t.loadComplete();

		}catch(e){
			alert(fn +' error: '+e.message);
		}
	},
	set_grid: function(){
		var t = this;
		var fn='map_marker_grid.set_grid';
		try{
			
			$("#grid").jqGrid(t.server_data.ggrid);    

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
});
