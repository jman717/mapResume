var jqGrid_config=function(name, index, config){
	var t=this;
	t.tab_name=name;
	t.selected_tab_index=index;
	t.load_grid=true;
	t.selected_tab_config=config;
	t.set_db_object(new db_object());
};

jqGrid_config.prototype.set_db_object=function(v){
	this.db_object=v;
};

jqGrid_config.prototype.get_db_object=function(){
	return this.db_object;
};

var db_object=function(){
	var t=this;
	//alert('db_object');
};

db_object.prototype.get_data=function(){
	var t=this;
	var funcName="db_object.get_data";
	var to=object_main;
	try{
	
		if(!to.get_grid_object().load_grid)
			return;
			
		var cdata=to.get_json_data_call();
		var gurl;
		if(to.search_object.get_params()!=null){
			var jo=to.search_object.get_params();
			if(typeof jo.type=='undefined')
				throw new Error(" no type is defined");
			if(jo.type!='search')
				throw new Error(" search is not defined");
			if(typeof jo.search=='undefined')
				throw new Error(" no search is defined");
			cdata['search']=jo.search;
		};
		switch(to.selected_tab_index){
			case 0:
				break;
			case 1:
				gurl=to._base_url + '/getData';
				break;
			case 2:
				gurl=to._base_url + '/getManualData';
				break;
		};
		//alert('get_data for tab('+to.selected_tab_index+') url('+gurl+')');

		$.ajax({
							type: 'POST'
							,data: JSON.stringify(cdata)
							,contentType: 'application/json'
							,dataType: "json"
							,cache: false
							,url: gurl					
							,success: function(data) {
								to._json_data=data;
								to.get_grid_object().load_grid=false;
								to.prepareData().grid_init().after_grid_init();
								to.after_grid_init=function(){return this};

							}
							,error: function (error) {
								alert('error; ' + eval(error));
							}
						});
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

var grid_popups=function(){
	var t=this;
	var funcName='grid_popups._construct';
	t._dialog=$('#dialog');
};

grid_popups.prototype.process=function(js){
	var t=this;
	var funcName='grid_popups.process';
	try{
		var jsx=js.replaceAll('##','"');
		var jo=JSON.parse(jsx);
		switch(jo.proc){
			case "HeadEnd":
				return t.HeadEnd();
			case "PriBak":
				return t.PriBak();
			case "PreEncManuf":
				return t.PreEncManuf();
			case "PreEncUnitName":
				return t.PreEncUnitName();
			case "Market":
				return t.Market();
			case "FreeTextSearch":
				return t.FreeTextSearch(jo);
		};
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

grid_popups.prototype.save_options_html=function(){
	return '<li style="color:green;background-color:powderblue;">'
				+'&nbsp;&nbsp;<input type="radio" value="1" name="test[]" id="myid1">'
				+'<label for="myid1" title="include for a saved search">&nbsp;include</label>'
				+'&nbsp;&nbsp;<input type="radio" value="1" name="test[]" id="myid1">'
				+'<label for="myid1" title="remove from a save search">&nbsp;remove</label>'
				+'&nbsp;&nbsp;<a class="btn btn-primary" href="#" title="save or remove from search parameters"><i class="icon-user"></i>&#xf1b0;</a>'
			+'</li><br>';
};

grid_popups.prototype.do_dialog=function(jo){
	var t=this;
	var funcName='grid_popups.do_dialog';
	try{
		var stitle =(typeof jo.title!='undefined')?jo.title:'title goes here';
		var xwidth =(typeof jo.width!='undefined')?jo.width:'300px';
		t._dialog.dialog({
			modal: true
			,autoOpen: true
			,dialogClass: "no-close"
			,title: stitle
			,width: xwidth
			,buttons: {
				"1": { id: 'close', text: 'close', click: function(){ $(this).dialog("close"); }, "class": "orange" },
				"2": { id: 'search', text: 'F', click: function(){ $(this).dialog("close"); }, "class": "orange" }
			}
		});
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

grid_popups.prototype.HeadEnd=function(){
	var t=this;
	var funcName='grid_popups.HeadEnd';
	try{
		t._dialog.html('<ul type="none">'      
				+t.save_options_html()
				+'<li>'
					+'<input type="radio" value="1" name="radio_xxx" id="myid1">'
					+'<label for="myid1">&nbsp;vho1</label>'
				+'</li>'
				+'<li>'
					+'<input type="radio" value="2" name="radio_xxx" id="myid2" checked>'
					+'<label for="myid2">&nbsp;vho2</label>'
				+'</li>'
			+'</ul>');
		t.do_dialog({
			title:'Headend'
		});
		return true;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

grid_popups.prototype.PriBak=function(){
	var t=this;
	var funcName='grid_popups.PriBak';
	try{
		t._dialog.html('<ul type="none">'      
				+t.save_options_html()
				+'<li>'
					+'<input type="checkbox" value="1" name="test[]" id="myid1" checked>'
					+'<label for="myid1">&nbsp;primary</label>'
				+'</li>'
				+'<li>'
					+'<input type="checkbox" value="2" name="test[]" id="myid2">'
					+'<label for="myid2">&nbsp;backup</label>'
				+'</li>'
			+'</ul>');
		t.do_dialog({
			title:'Primary Backup Servers'
		});
		return true;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

grid_popups.prototype.PreEncManuf=function(){
	var t=this;
	var funcName='grid_popups.PreEncManuf';
	try{
		t._dialog.html('<ul type="none">'      
				+t.save_options_html()
				+'<li>'
					+'<input type="checkbox" value="1" name="test[]" id="myid1" checked>'
					+'<label for="myid1">&nbsp;harmonics</label>'
				+'</li>'
			+'</ul>');
		t.do_dialog({
			title:'Manufacturer'
		});
		return true;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

grid_popups.prototype.FreeTextSearch=function(jo){
	var t=this;
	var funcName='grid_popups.FreeTextSearch';
	try{
		var titlex=jo.titlex.toProperCase();
		t._dialog.html('<ul type="none">'      
				+t.save_options_html()
				+'<li>'
					+'<label for="myid1">'+jo.cellvalue+'</label>'
				+'</li>'
				+'<li>'
					+'<label for="myid1">wildcard search:&nbsp;</label><input for="myid1" type="text" size="50" name="myid1" title="enter any text combination of letters or numbers to search upon"><br>'
				+'</li>'
			+'</ul>');
		t.do_dialog({
			title:titlex
			,width: "400px"
		});
		return true;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

grid_popups.prototype.PreEncUnitName=function(){
	var t=this;
	var funcName='grid_popups.PreEncUnitName';
	try{
		t._dialog.html('<ul type="none">'      
				+t.save_options_html()
				+'<li>'
					+'<input type="checkbox" value="1" name="test[]" id="myid1" checked>'
					+'<label for="myid1">&nbsp;harmonics</label>'
				+'</li>'
			+'</ul>');
		t.do_dialog({
			title:'Unit Name'
		});
		return true;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

grid_popups.prototype.Market=function(){
	var t=this;
	var funcName='grid_popups.Market';
	try{
		t._dialog.html('<ul type="none">'   
				+t.save_options_html()
				+'<li>'
					+'<input type="checkbox" value="1" name="test[]" id="myid1" checked>'
					+'<label for="myid1">&nbsp;(clsp) Colorado Springs, CO</label>'
				+'</li>'
			+'</ul>');
		t.do_dialog({
			title:'Markets'
			,width: "400px"
		});
		return true;
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};