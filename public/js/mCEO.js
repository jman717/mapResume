
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}

var dialog_box = Class.extend({
	show: function(jo){
		var t = this;
		var fn='dialog_box.show';
		if(typeof jo == 'undefined')
			alert(fn+' error: json object not defined');
		if(typeof jo.text != 'undefined'){	
			$( "#msgbox" ).html('<p>'+jo.text+'</p>');
		}
		if(typeof jo.buttons == 'undefined')
			alert(fn+' error: no buttons are defined for title('+jo.title+')');
		if(typeof jo.title != 'undefined')
			$( "#msgbox" ).dialog({
				title: jo.title
				,modal: true
				,open: function(event, ui) {
					$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
				}
				,buttons: jo.buttons
			});
	}
});

var data = {  
  title: 'Professional Node.js',
  author: 'Pedro Teixeira'
};

var Book = React.createClass({  
  render: function() {
    return (
      <tr>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.author}</td>
      </tr>
    );
  }
});

React.render(<Book data={data}/>, document.getElementById('container'));  

var mCEO = Class.extend({
	canvas: null,
	overlays: null,
	map: null,
	locations: null,
	relationships: null,
	server_data: null,
	map_marker_grid: null,
	dialog_box: null,
	admin_grid: null,
	urlObj: null,
	construct: function(jo) {
		var t = this;
		var fn='mCEO.construct';
		t.dialog_box = new dialog_box();
	},
	init: function(){
		var t = this;
	},
	setMap: function(jo) {
		var t = this;
		var fn='mCEO.setMap';
		t.server_data = new server_data();
		if(typeof jo.bing != 'undefined')
			t.map = new mBNG(jo.bing);
	},
	setBars: function(){
		var t = mceo;
		t.locations = new locations(t.server_data);
		t.relationships = new relationships(t.server_data);
	},
	renderScreen: function(vOpts) {
		var fn='mCEO.renderScreen';
		try{
			var ao = new admin(adminOPTS,'ao',this);
		}catch(e){}
	}
});

var server_data = Class.extend({
	uid: null,
	cid: null,
	server: _base_host,
	construct: function() {
		var t = this;
		var fn='server_data.construct';
		t.uid = getUrlVars()["uid"];
		t.cid = $('#mceo_cid').val();
		//t.init(t.process);
	},
	init: function(callback){
		var t = this;
		var xURL = '/get/map/access/data?uid='+t.uid+'&cid='+t.cid;
		$.ajax(xURL, {
			type: 'GET',
			datatype: 'json',
			contentType: "application/json; charset=utf-8",
			success: function(data) { 
				if (callback) callback(data); 
			},
			error  : function()     { if ( callback ) callback(null); }
		});
	},
	contactOnClick: function(o,id){
		var t = mceo.server_data;
		var fn='mceo.server_data.contactOnClick';
		var cm = mceo.map_marker_grid.getContactMsg(id);
		mceo.dialog_box.show(
			{title: "contact info"
			,text: cm
			,buttons:{
					"Ok": function() {
					$(this).dialog('close');
				}
			}
		});

	},
	messageOnClick: function(o,id){
		var t = mceo.server_data;
		var fn='mceo.server_data.messageOnClick';
		var cm = mceo.map_marker_grid.getMsgMsg(id);
		mceo.dialog_box.show(
			{title: "message info"
			,text: cm
			,buttons:{
					"Ok": function() {
					$(this).dialog('close');
				}
			}
		});
	},
	process: function(data){
		var t = mceo;
		var fn='server_data.process';
		if(data.error.code > 0){
			alert('access to uid ('+data.uid+') error: '+data.error.msg);
		}
		t.map_marker_grid.set_data(data);
		t.map.set_locations();
		t.map.render();
		t.setBars();
		//mceo.locations.flip();
	}
});

var bar_core = Class.extend({
	state: null,
	state_open: 'open',
	state_close: 'close',
	name: null,
	caret: null,
	flip_handled: false,
	map_height: 0,
	caret_down: 'fa fa-caret-down fa-lg',
	caret_right: 'fa fa-caret-right fa-lg',
	flip: function(){
		var t = this;
		var fn='bar_core.'+t.name+'.flip';
		if(t.state == null){
			t.state = t.state_open;
		}else{
			if(t.state == t.state_open)
				t.state = t.state_close;
			else
				t.state = t.state_open;
		}
		switch(t.state){
			case t.state_open:
				try{
					$('#'+t.caret).attr('class', t.caret_down);
				}catch(e){
					//do nothing
					//alert(fn+' debug error 20.00.00 caret down('+t.caret_down+')');
				}
				t.on_open();
				break;
			case t.state_close:
				$('#'+t.caret).attr('class', t.caret_right);
				break;
		}
		if(mceo.map != null){
			mceo.map.set_height(t.map_height);
		}
	}
});

var locations = bar_core.extend({
	construct: function(ser) {
		var t = this;
		t.name = 'locations';
		t.caret = t.name+'_caret';
		t.server_data = ser;
		new Vue({
			el: '#ltitle',
			data: {
				locations_title: 'locations'
			}
		});		
		new Vue({
			el: '#headingSearch'
			,methods: {
				flip: function (){
					mceo.locations.flip();
				}
			}
		});		
		var div = document.getElementById('locations_div');
		div.style.visibility = 'visible';
		t.open_fully();
	},
	open_fully: function(){
		var t = this;
		t.state=t.state_close;
		//t.map_height = (window.screen.availHeight * 85) / 100;
		t.map_height = window.screen.availHeight - 150;
		t.flip();
	},
	on_open: function(){
		//alert('locations open');
	}
});

var relationships = bar_core.extend({
	construct: function(ser){
		var t = this;
		t.name = 'relationships';
		t.caret = t.name+'_caret';
		t.server_data = ser;
		t.map_height = window.screen.availHeight / 2;
		new Vue({
			el: '#ttitle',
			data: {
				topics_title: 'topics'
			}
		});		
		new Vue({
			el: '#relationshipsData'
			,methods: {
				rflip: function (){
alert('mCEO.relationships');
					mceo.relationships.flip();
				}
			}
		});		
		var div = document.getElementById('topics_div');
		div.style.visibility = 'visible';
	},
	on_open: function(){
		var t = this;
		mceo.map_marker_grid.set_grid();
		t.on_open = function(){};
	}
});
