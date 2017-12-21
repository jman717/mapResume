var this_object;

function common_data_object(db_object) {
	this_object = this;
	var t = this_object;
	t._db_object=null;
	t.set_db_object(db_object);
	t._rowNum=null;
	t._default_rowNum=null;
	t._page=null;
	t._total=null;
	t._schema=null;
	t._is_search=false;
	t._search_json=null;
	t._id_start;
	t._vho2_gsummary=null;
	t.set_rowNum(0);
	t.set_default_rowNum(15);
	t.set_page(0);
	t.set_id_start(0);
	t.set_total(0);
	t._pg_down='pg_down';
	t._pg_up='pg_up';
	t._first='first';
	t._last='last';
	t._any_combo='any_combo';
	t.set_schema('GALACTICA');
	t.set_vho2_gsummary('VHO2_GSUMMARY');
	t.set_columns([]);
};

common_data_object.prototype.get_page_up=function(){
	var t=object_main;
	var funcName='common_data_object.get_page_up';
	try{
		alert(funcName);
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

common_data_object.prototype.get_page_down=function(){
	var t=object_main;
	var funcName='common_data_object.get_page_down';
	try{
		alert(funcName);
	}catch(e){
		alert(funcName+" error("+e.message+")");
	};
};

common_data_object.prototype.set_search_json=function(v){
	this_object._search_json=v;
};

common_data_object.prototype.get_search_json=function(){
	return this_object._search_json;
};

common_data_object.prototype.set_is_search=function(v){
	this_object._is_search=v;
};

common_data_object.prototype.get_is_search=function(){
	return this_object._is_search;
};

common_data_object.prototype.set_vho2_gsummary=function(v){
	this_object._vho2_gsummary=v;
};

common_data_object.prototype.get_vho2_gsummary=function(){
	return this_object._vho2_gsummary;
};

common_data_object.prototype.set_schema=function(v){
	this_object._schema=v;
};

common_data_object.prototype.get_schema=function(){
	return this_object._schema;
};
common_data_object.prototype.set_columns=function(v){
console.log('set_columns size='+v.length);
	this_object._columns=v;
};

common_data_object.prototype.get_columns=function(){
	return this_object._columns;
};

common_data_object.prototype.set_default_rowNum=function(v){
	this_object._default_rowNum=v;
};

common_data_object.prototype.get_default_rowNum=function(){
	return this_object._default_rowNum;
};

common_data_object.prototype.set_db_object=function(v){
	this_object._db_object=v;
};

common_data_object.prototype.get_db_object=function(){
	return this_object._db_object;
};

common_data_object.prototype.set_rowNum=function(v){
	var t=this_object;
	t._rowNum=v;
	if(v==0)
		t._rowNum=t._default_rowNum;
};

common_data_object.prototype.get_rowNum=function(){
	return this_object._rowNum;
};

common_data_object.prototype.set_id_start=function(v){
	this_object._id_start=v;
};

common_data_object.prototype.get_id_start=function(){
	return this_object._id_start;
};

common_data_object.prototype.set_page=function(v){
	var t=this_object;
	t._page=v;
	if(v==0)
		t._page=1;
};

common_data_object.prototype.get_page=function(){
	return this_object._page;
};

common_data_object.prototype.get_data_query=function(){
	var t=this_object;
	var funcName="common_data_object.get_data_query"
	
	try{	
		t.set_id_start(((t.get_page() * t.get_rowNum()) - t.get_rowNum()));
		//var q = 'SELECT * from ' + t._schema + '.' + t._vho2_gsummary;
		var cols=t.get_columns();
		var q = 'SELECT ';
		for(var i in cols){
			if(i>0)
				q += ', ';
			q += cols[i];
		};
		q += ' from ' + t.get_schema() + '.' + t.get_vho2_gsummary();
		if(t.get_is_search())
			q += t.get_search_where_clause();
		q += ' LIMIT ' + t.get_id_start() +', ' + t.get_rowNum();
		console.log("getdata debug 30.05 start("+t.get_id_start()+") row num("+t.get_rowNum()+")");
		//console.log("getdata debug 30.05 q("+q+")");
		return q;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}
};

common_data_object.prototype.get_search_where_clause=function(){
	var t=this_object;
	var funcName="common_data_object.get_search_where_clause"
	
	try{	
		var wildcard_start='',wildcard_end='%', sAnd='';
		var q=' WHERE ';
		var gsj=t.get_search_json();
		if(typeof gsj=='undefined')
			throw ' json search object is not defined';
		if(typeof gsj.o=='undefined')
			throw ' json search opion is not defined';
		if(typeof gsj.cl=='undefined')
			throw ' json cl or call letters is not defined';
		if(typeof gsj.cn=='undefined')
			throw ' json cn or channel number is not defined';
		switch(gsj.o){
			case t._any_combo:
				wildcard_start='%';
				break;				
		};			
		//console.log(funcName+' debug 10.00 json='+JSON.stringify(gsj));		
		if(gsj.cl.length > 0){
			q += sAnd + ' MedRoomCallLetters LIKE "'+wildcard_start+gsj.cl.toUpperCase()+wildcard_end+'"'
			sAnd = ' AND ';
		};
		if(gsj.cn.length > 0){
			q += sAnd + ' MedRoomTunerPosition LIKE "'+wildcard_start+gsj.cn+wildcard_end+'"'
			sAnd = ' AND ';
		};
		return q;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}
};

common_data_object.prototype.get_totals_query=function(){
	var t=this_object;
	var funcName="common_data_object.get_totals_query"
	
	try{
		var q = 'SELECT COUNT(*) AS tot FROM ' + t._schema + '.' + t._vho2_gsummary;
		if(t.get_is_search())
			q += t.get_search_where_clause();
		return q;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}
};

common_data_object.prototype.set_total=function(v){
	this_object._total=v;
};

common_data_object.prototype.get_total=function(){
	return this_object._total;
};

common_data_object.prototype.set_client_data_for_return=function(rows){
	var t=this_object;
	var funcName="common_data_object.set_client_data_for_return"
	
	try{
		var total=t.get_total();
		var page=t.get_page();
		var lastpage=Math.ceil(total / t.get_rowNum());
		var ids=t.get_id_start();
		console.log('The query2 count is('+rows.length+') total('+total+') last page('+lastpage+')');
		var cdata=[];
		var cns=[];
		var y=0, cdl;
		for(var i=0;i<rows.length;i++){
			cdl=cdata.length;
			cdata[cdl]=[];
			y=0;
			for(var x in rows[i]){
				if(i==0)
					cns[cns.length]=x;
				cdata[cdl][y]=rows[i][x];
				y++;
			};
		};
		var data={
			"dbData":{
				"column_names":cns
				,"pager":{
					"page": page
					,"records": total
					,"lastpage": lastpage
					,"id_start": ids
				}
				,"data": cdata
			}
		};
		return data;
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}
};

common_data_object.prototype.process=function(req,res){
	var t=this_object;
	var funcName="common_data_object.process";
	
console.log(funcName+' action='+req.body.jqGrid.pager.action);	
console.log(funcName+' rowNum='+req.body.jqGrid.pager.rowNum);	
console.log(funcName+' records='+req.body.jqGrid.pager.records);	
console.log(funcName+' id_start='+req.body.jqGrid.pager.id_start);	
console.log(funcName+' search='+typeof req.body.search);	
	try{
		var page=req.body.jqGrid.pager.page;
		var action=req.body.jqGrid.pager.action;
		var rowNum=req.body.jqGrid.pager.rowNum;
		var records=req.body.jqGrid.pager.records;
		var last_page;
		switch(action){
			case t._pg_down:
				page++;
				if(page>rowNum)
					page=0;
				break;
			case t._pg_up:
				page--;
				if(page<0)
					page=0;
				break;
			case t._first:
				page=0;
				break;
			case t._last:
				page=0;
				if((records-rowNum)>0)
					page=Math.ceil(records/rowNum);
				break;
		};
		t.set_is_search(false);
		if(typeof req.body.search=='object'){
			t.set_is_search(true);
			t.set_search_json(req.body.search);
			page=1;
			records=0;
		};
console.log(funcName+' page='+page);	
		t.set_page(page);
		t.set_rowNum(rowNum);
		var q=t.get_data_query();
		var qt=t.get_totals_query();
		t.get_db_object().query(qt, function(trow){
			t.set_total(trow[0].tot);
			t.get_db_object().query(q, function(drows){
				res.send(t.set_client_data_for_return(drows));
			});
		});
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}
};

// export the class
exports.common_data_object = common_data_object;
