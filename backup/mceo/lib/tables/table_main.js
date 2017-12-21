const Class = require('./../class');

var table_main = module.exports = Class.extend({
	schema: null
	,dbo: null
	,parent: null
	,check_access: function(owner){
		var t = owner;
		var funcName = 'tables.main.check_access';
		t.parent.return_jo.return_code = 2;
		t.parent.get_init();
		
	}
	,set_dbo: function(){
		var t = this;
		var funcName = 'tables.main.set_dbo';
		try{
			if(t.dbo == null){
				if(typeof t.parent.dbo == 'object'){
					t.dbo = t.parent.dbo;
				}else{	
					t.dbo = t.parent.parent.dbo;
				}	
			}
		}catch(e){
			console.log(funcName+' error: '+e.message);			
		}
	}
});