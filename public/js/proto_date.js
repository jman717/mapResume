//A default date format for date time columns
Date.prototype.formatForTable = function(){
	
	var month  = this.getMonth()+1;
	var day    = this.getDate();
	var year   = this.getFullYear();
	var hour   = this.getHours();
	var minute = this.getMinutes();
	var second = this.getSeconds();
	
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

Date.prototype.yyyymmdd = function(){
	var month  = this.getMonth()+1;
	var day    = this.getDate();
	var year   = this.getFullYear();
	
	return year+'-'+month+'-'+day;
};

//return the prev monday of this week
Date.prototype.getPrevDayByNum = function(num){
	
	//set the date to today? no..previous monday...
	var dayNum = this.getDay();
	
	var daysBack = dayNum-num;
	//if we're not on the day number, we
	//need to select the previous day number
	if(num > dayNum){
		daysBack = num;
	}else if(num == dayNum){
		daysBack = 7;
	}
	
	this.setMilliseconds(this.getMilliseconds()-(daysBack*24*60*60*1000));
	
	return this;
};

//return the prev monday of this week
Date.prototype.getPrevMonday = function(){
	
	//set the date to today? no..previous monday...
	var dayNum = this.getDay();

	//if we're not on a monday, we
	//need to select the previous monday
	if(dayNum != 1){
		
		if(dayNum == 0)
			dayNum = 7; 
		
		this.setMilliseconds(this.getMilliseconds()-((dayNum-1)*24*60*60*1000));
	}
	
	return this;
};