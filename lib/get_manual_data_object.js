var this_object;

function get_manual_data_object(common_data_object) {
	this_object = this;
	var t = this_object;
	t.cdo=common_data_object;
	t.cdo.set_columns([
		'0 as id'
		,'MedRoomCallLetters'
		,'MedRoomTunerPosition'
		,'RecAcqTVE'
		,'RecAcqFeed'
		,'RecAcqFormat'
		,'RecAcqContactNumber'
		,'RecAcqLocation'
		,'RecAcqReceiverType'
		,'RecAcqSatellite'
		,'RecAcqTransponder'
		,'RecAcqPolarity'
		,'RecAcqCBandFreq'
		,'RecAcqLBandFreq'
		,'RecAcqSymbolRate'
		,'RecAcqFEC'
		,'RecAcqACPPE'
		,'RecAcqVCTNetID'
		,'RecAcqProgramNumber'
		,'RecAcqModulation'
		,'RecAcqRollOff'
		,'RecAcqUaAnchor'
		,'RecAcqProgramUA'
	]);
};

get_manual_data_object.prototype.process=function(req,res){
	var t=this_object;
	var funcName="get_manual_data_object.process";
	
	try{
		t.cdo.process(req,res);
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}
};

// export the class
exports.get_manual_data_object = get_manual_data_object;
