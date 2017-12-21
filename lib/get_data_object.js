var this_object;

function get_data_object(common_data_object) {
	this_object = this;
	var t = this_object;
	t.cdo=common_data_object;
	t.cdo.set_columns([
		'0 as id'
		,'MedRoomCallLetters'
		,'MedRoomTunerPosition'
		,'LOWER(PreAmbPriBak) AS PreAmbPriBak'
		,'LOWER(PreAmbHeadEnd) AS PreAmbHeadEnd'
		,'LOWER(PreAmbMarket) AS PreAmbMarket'
		,'LOWER(PreAmbIQ_ChannelName) AS PreAmbIQ_ChannelName'
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
		,'LOWER(SencManuf) AS SencManuf'
		,'LOWER(SencUnitAlias) AS SencUnitAlias'
		,'LOWER(SencHwModel) AS SencHwModel'
		,'SencMgmtIpAddress'
		,'LOWER(SencLocation) AS SencLocation'
		,'LOWER(SencInputCardType) AS SencInputCardType'
		,'LOWER(SencInputPort) AS SencInputPort'
		,'LOWER(SencInputTSPresence) AS SencInputTSPresence'
		,'LOWER(PreEncManuf) AS PreEncManuf'
		,'LOWER(PreEncUnitName) AS PreEncUnitName'
		,'LOWER(PreEncEncoderModel) AS PreEncEncoderModel'
		,'LOWER(PreEncMgmtIpAddress) AS PreEncMgmtIpAddress'
		,'LOWER(PreEncDeviceLocation) AS PreEncDeviceLocation'
		,'LOWER(PreEncInputName) AS PreEncInputName'
		,'LOWER(PreEncInputCardType) AS PreEncInputCardType'
		,'PreEncInputCardNum'
		,'LOWER(PreEncInputSrvID) AS PreEncInputSrvID'
		,'LOWER(PreEncInputIpAddr) AS PreEncInputIpAddr'
		,'LOWER(PreEncInputUdpPort) AS PreEncInputUdpPort'
		,'LOWER(PreEncOutputName) AS PreEncOutputName'
		,'PreEncOutputPortNum'
		,'LOWER(PreEncOutputIpAddr) AS PreEncOutputIpAddr'
		,'LOWER(PreEncOutputUdpPort) AS PreEncOutputUdpPort'
		,'LOWER(PreEncPriSwitchUnitName) AS PreEncPriSwitchUnitName'
		,'LOWER(PreEncPriSwitchPort) AS PreEncPriSwitchPort'
		,'LOWER(PreEncBakSwitchUnitName) AS PreEncBakSwitchUnitName'
		,'LOWER(PreEncBakSwitchPort) AS PreEncBakSwitchPort'
		,'LOWER(AXCManuf) AS AXCManuf'
		,'LOWER(AXCEncoderModel) AS AXCEncoderModel'
		,'AXCMgmtIpAddress'
		,'LOWER(AXCDeviceLocation) AS AXCDeviceLocation'
		,'LOWER(AXCInputName) AS AXCInputName'
		,'LOWER(AXCInputCardType) AS AXCInputCardType'
		,'AXCInputCardNum'
		,'AXCInputPortNum'
		,'LOWER(AXCInputSrvID) AS AXCInputSrvID'
		,'AXCInputIpAddr'
		,'AXCInputUdpPort'
		,'LOWER(AXCOutputCardType) AS AXCOutputCardType'
		,'LOWER(AXCOutputCardNum) AS AXCOutputCardNum'
		,'AXCOutputPortNum'
		,'LOWER(AXCOutputIpAddr) AS AXCOutputIpAddr'
		,'AXCOutputUdpPort'
		,'LOWER(AXCPriSwitchUnitName) AS AXCPriSwitchUnitName'
		,'AXCPriSwitchPort'
		,'LOWER(AXCBakSwitchUnitName) AS AXCBakSwitchUnitName'
		,'AXCBakSwitchPort'
	]);
};

get_data_object.prototype.process=function(req,res){
	var t=this_object;
	var funcName="get_data_object.process";
	
	try{
		t.cdo.process(req,res);
	}catch(e){
		console.log(funcName+' error:'+e.message);
	}
};

// export the class
exports.get_data_object = get_data_object;
