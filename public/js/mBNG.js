
var mBNG = Class.extend({
	map: null,
	jParams: null,
	bingMap_id: 'bingMap',
	construct: function(jo) {
		var t = this;
		t.jParams = jo;
	},
	set_locations: function(){
		var t = this;
		var fn='map_marker_grid.set_locations';
		try{
			var mgd = mceo.map_marker_grid.grid_data_jo;
			if(typeof mgd != 'object')
				throw new Error('no data object');
			if(typeof mgd.ggrid != 'object')
				throw new Error('no data.ggrid object');
			if(typeof mgd.ggrid.data != 'object')
				throw new Error('no data.ggrid.data object');
			var d = mgd.ggrid.data;
			for(var i=0; i < d.length; i++)
				d[i].location = new Microsoft.Maps.Location(d[i].lat, d[i].lon);
			return t;
		}catch(e){
			alert(fn+' error: '+e.message);
		}
	},
	refresh_pins: function(){
		var t = this;
		var fn = "mBNG.refresh_pins";
		t.map.entities.clear(); 
		var mo, mp;
		var data = mceo.map_marker_grid.grid_data_jo.ggrid.data;
		try{
			t.refresh_boundingBox();
			for(var i=0; i < data.length; i++){
				if(data[i].include == 'yes'){
					mo = {text: data[i].id, icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png', height: 18, width: 20, anchor: new Microsoft.Maps.Point(13, 26) };
					data[i].pushPin = new Microsoft.Maps.Pushpin(data[i].location, mo);
					Microsoft.Maps.Events.addHandler(data[i].pushPin, 'mouseup', t.displayLoc);
					t.map.entities.push(data[i].pushPin);
				}
			}
		}catch(e){
			alert(fn+' error: '+e.message);
		}
	},
	refresh_boundingBox(){
		var t = this;
		var fn = "mBNG.refresh_boundingBox";
		try{
			var data = mceo.map_marker_grid.grid_data_jo.ggrid.data;
			if(typeof data[0].location != 'undefined'){
				var LLA = [];
				var cnt = 0;
				for(var i=0; i < data.length; i++){
					if(data[i].include == 'yes'){
						LLA[cnt] = data[i].location;
						cnt++;
					}
				}	
				try{
					var boundingBox = Microsoft.Maps.LocationRect.fromLocations(LLA);
				}catch(e){
					throw new Error('boundingBox problem');
				}
				t.map.setView({bounds:boundingBox });
			}
		}catch(e){
			//alert(fn+' error: '+e.message);   //Firefox will report an error here, just ignore it.
		}
	},
	render: function() {
		var t = this;
		var fn = "mBNG.render";
		try{
			var mgd = mceo.map_marker_grid.grid_data_jo;
			if(typeof mgd == 'undefined')
				throw new Error("data is not set");
			if(typeof mgd.map == 'undefined')
				throw new Error( "data.map is not defined");
			if(typeof mgd.map.init == 'undefined')
				throw new Error( "data.map.init is not defined");

			var mapOptions = {
				credentials : t.jParams.creds
//				,center     : boundingBox.center
				,mapTypeId  : Microsoft.Maps.MapTypeId.road
//				,bounds		: boundingBox
			};
			
			//see this site: http://stackoverflow.com/questions/26937358/can-i-adjust-my-bing-maps-view-locationrect-bounding-box-by-a-small-amount
			t.map = new Microsoft.Maps.Map(t.jParams.loc, mapOptions);
			
//alert(fn+' zoom='+t.map.zoom);			
			t.refresh_pins();
			var map = mceo.map_marker_grid.grid_data_jo.map;
			if(map.zoom.default > 0)
				t.map.setView({zoom: map.zoom.default});
			//t.map.setView({zoom:0});
			//t.map.SetView(boundingBox);
			//t.map.Loaded += (s,e)=>{t.map.SetView(boundingBox);};
			//t.map.setView({ bounds: boundingBox });
//alert(fn+' zoom='+mgd.map.init.zoom);
			//t.map.setView({ zoom: mgd.map.init.zoom });



			

			
			
			//see from here: https://pastebin.com/jDjxxM4V

/*			
			var boundingBox = Microsoft.Maps.LocationRect.fromLocations(d[0].location, d[1].location); 
			t.map = new Microsoft.Maps.Map(t.jParams.loc, {
				credentials: t.jParams.creds
				,bounds: boundingBox
			});
*/
			/*
			this.map = new Microsoft.Maps.Map(this.jParams.loc, {
				credentials: this.jParams.creds
				,center: new Microsoft.Maps.Location(t.data.map.init.lat, t.data.map.init.lon)
			});
			*/
			
			/*
			var boundingBox = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(47.618594, -122.347618), new Microsoft.Maps.Location(47.620700, -122.347584), new Microsoft.Maps.Location(47.622052, -122.345869)); 
map = new Microsoft.Maps.Map(document.getElementById('SDKmap'), {credentials: 'Your Bing Maps Key', bounds: boundingBox});
*/
			
			//var customIcon = "http://www.longtrek.com/LongTrek/Tutorial-MapBoard_files/pushpin1-blue-40x40.png"; 
			// Retrieve the location of the map center 
/*
            var center = t.map.getCenter();
			t.map.entities.clear(); 
			//var pushpinOptions = {text: '99'}; 
			//var Options = {width: null, height: null, htmlContent: "<div style='font-size:12px;font-weight:bold;border:solid 2px;background-color:LightBlue;width:100px;'>Custom Pushpin</div>"}; 
			//var pin= new Microsoft.Maps.Pushpin(center, Options); 
			// Add a handler to the pushpin drag
			var mountainOptions = {text: '34', icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png', height: 18, width: 20, anchor: new Microsoft.Maps.Point(13, 26) };
			var mountainPin = new Microsoft.Maps.Pushpin(mountainHome,mountainOptions);
			var littletonOptions = {text: '35', icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png', height: 18, width: 20, anchor: new Microsoft.Maps.Point(13, 26) };
			var littletonPin = new Microsoft.Maps.Pushpin(littletonApt,littletonOptions);
			//var pin = new Microsoft.Maps.Pushpin(center,{text: "12", icon: 'http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/location-pin-icon.png', width: 40, height: 40});
			Microsoft.Maps.Events.addHandler(mountainPin, 'mouseup', t.displayLoc);
			t.map.entities.push(mountainPin);
			Microsoft.Maps.Events.addHandler(littletonPin, 'mouseup', t.displayLoc);
			t.map.entities.push(littletonPin);
*/			

			/*
            // Add a pin to the center of the map
            var pin = new Microsoft.Maps.Pushpin(center, {text:'50', draggable: false}); 
            //var pin = new Microsoft.Maps.Pushpin(center, {icon:customIcon, width:40, height: 40}); 			
			*/
				
			//var pin = new Microsoft.Maps.Pushpin(center,{text: "12", icon: 'http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/location-pin-icon.png'});
			//var pin = new Microsoft.Maps.Pushpin(center,{text: "12", icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Outside-Azure-icon.png'});
			//var pin = new Microsoft.Maps.Pushpin(center,{text: "12", width:40, height: 40, icon: '/images/Pelfusion-Long-Shadow-Media-Maps-Pin-Place.ico'});
			//var pin = new Microsoft.Maps.Pushpin(center,{text: "12", width:6, height: 6, icon: '/images/Carlosjj-Google-Jfk-Maps.ico'});	
//			var pin = new Microsoft.Maps.Pushpin(center,{text: "12", icon: '/images/Blackvariant-Button-Ui-App-Pack-One-Lite-Icon.ico'});	

			

				// Add a handler to the pushpin drag
//            Microsoft.Maps.Events.addHandler(pin, 'mouseup', this.displayLoc);

//            this.map.entities.push(pin);

//check here https://blogs.bing.com/maps/2013/05/22/image-overlays-with-bing-maps-javascript/
/*
createCanvasPins();
var pin = new Microsoft.Maps.Pushpin(center, {
	text: 'cool'
    ,icon: '/images/Blackvariant-Button-Ui-App-Pack-One-Lite-Icon.ico'
	,width: 24
	,height: 24
});
*/

//from https://www.bingmapsportal.com/ISDK/AjaxV7#Pushpins5


/*
var pushpin = new Canvas()
{
	Width = 35,
	Height = 35,
	Margin = new Thickness(-12, -12, 0, 0)
};

pushpin.Children.Add(new Ellipse()
{
	Fill = new SolidColorBrush(Colors.Blue),
	Stroke = new SolidColorBrush(Colors.White),
	StrokeThickness = 5,
	Width = 35,
	Height = 35
});

MapLayer.SetPosition(pushpin, center);
*/
/*
var pin = new Microsoft.Maps.Pushpin(center, {draggable: true}); 

// Add a handler to the pushpin drag
Microsoft.Maps.Events.addHandler(pin, 'mouseup', DisplayLoc);

map.entities.push(pin);
*/
/*
var pin = new Microsoft.Maps.Pushpin(center, {draggable: true});
Microsoft.Maps.Events.addHandler(pin, 'mouseup', DisplayLoc);
this.map.entities.push(pin);
*/

//Add the pushpin to the Canvas Entity Collection
                  //canvasLayer.push(pin);
				  //this.map.entities.push(pin);

			
			/*
			var customIcon = "/images/Pelfusion-Long-Shadow-Media-Maps-Pin-Place.ico"; 
			var pushpin= new Microsoft.Maps.Pushpin(pin, {icon:customIcon, width:32, height: 32}); 
			this.map.entities.push(pushpin); 
			*/

		}catch(e){
			alert(fn+' error: '+e.message);
		}
	},
	set_height: function (h){
		var fn='mBNG.set_height';
		try{ 
			var x = document.getElementById(this.bingMap_id).style.height=h+'px'; 
			//$('#' + this.bingMap_id).css('height', h+'px');
		}catch(e){
			alert(fn+' set_height error: '+e.message);
		}
	},
	displayLoc: function (e){
		var fn = "mBNG.displayLoc";
//alert(fn+' pushin='+e.targetType);
		if (e.targetType == 'pushpin'){
			//var pinLoc = e.target.getLocation();
			//alert("The location of the pushpin is now " + pinLoc.latitude + ", " + pinLoc.longitude);	
			//alert("The id is now " + e.target.getText());	

			if(mceo.relationships.state != mceo.relationships.state_open){
				$("#relationshipsData").click();
			}else{
				/*
				$("#relationshipsData").click();
				mceo.locations.open_fully();
				*/
			}
			mceo.map_marker_grid.row_select(e.target.getText());
		}
	}	
});
