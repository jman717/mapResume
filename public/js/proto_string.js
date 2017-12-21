//Trims off beginning and end empty string
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g,'');
};

//A default date format for date time columns
String.prototype.formatForTable = function(){
	
	var dObj   = new Date(this.toString().replace('T',' '));

	var month  = dObj.getMonth()+1;
	var day    = dObj.getDate();
	var year   = dObj.getFullYear();
	var hour   = dObj.getHours();
	var minute = dObj.getMinutes();
	var second = dObj.getSeconds();

	if(hour == 0){
		hour = 12;
		ordinal = 'AM';
	}else if(hour >= 1 && hour <= 11){
		ordinal = 'AM';
	}else if(hour == 12 ){
		ordinal = 'PM';
	}else{
		hour = hour - 12;
		ordinal = 'PM';
	}
	
	//convert to string for length checks below
	minute = minute.toString();
	second = second.toString();

	minute = minute.length==1?'0'+minute:minute;
	second = second.length==1?'0'+second:second;
	
	return month+'/'+day+'/'+year+'&nbsp;&nbsp;&nbsp;'+hour+':'+minute+':'+second+' '+ordinal;
	
};

String.prototype.isValid = function(type){

	switch(type){
	
	case 'ip':
		
		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this))  
			return true;
		
		return false;
		break;
		
	case 'inputEditKeyCode':
		
		var int = parseInt(this);

		//ignore key when editing a field: enter, backspace, arrows, ctrl, shift, home, end, alt, delete
		var keyCodesToIgnore = [8, 13, 16, 17, 18, 35, 36, 37, 38, 39, 40, 46];
		
		if( $.inArray(int, keyCodesToIgnore) > -1 )
			return false;
		
		return true;
		break;
	
	case 'string':

		if(typeof this.valueOf() == 'string')
			return true;
			
		return false;
		
		break;
	
	case 'int':

		if(isNaN(parseInt(this.valueOf())) && typeof parseInt(this.valueOf()) != 'integer')
			return false;
			
		return true;
		
		break;
		
	default:
		throw "No type to validate";
	
	}
	
};


String.prototype.toChrCodeArray = function(){
	
	    var encoded = [];
	    
	    for (var i=0; i < this.length; i++){
	        encoded.push(this.charCodeAt(i).toString());
	    }

	    return encoded;
	
};

String.prototype.removeLineBreaks = function(replacementString){
	
	if(replacementString == undefined || replacementString == null || typeof replacementString != 'string')
		replacementString = ' ';
		
	
	return this.replace(/(\r|\n|\r\n)/gm, replacementString);
}

String.prototype.replaceDashWithUnderscore = function(){
	return this.replace(/-/g,'_');
}

String.prototype.replaceUnderscoreWithDash = function(){
	return this.replace(/_/g,'-');
}
