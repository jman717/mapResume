
gb={"re":{
		"HeadEnd" : function(c,o,r){return _gb.HeadEnd(c,o,r);}
		,"PriBak" : function(c,o,r){return _gb.PriBak(c,o,r);}
		,"Market" : function(c,o,r){return _gb.Market(c,o,r);}
		,"PreEncManuf" : function(c,o,r){return _gb.PreEncManuf(c,o,r);}
		,"PreEncUnitName" : function(c,o,r){return _gb.PreEncUnitName(c,o,r);}
		,"ID" : function(c,o,r){return _gb.ID(c,o,r);}
		,"FreeTextSearch" : function(c,o,r){return _gb.FreeTextSearch(c,o,r);}
		,"manual_entry" : function(c,o,r){return _gb.manual_entry(c,o,r);}
		,"sencore" : function(c,o,r){return _gb.sencore(c,o,r);}
		,"pre_enc" : function(c,o,r){return _gb.pre_enc(c,o,r);}
		,"axc" : function(c,o,r){return _gb.axc(c,o,r);}
	}
};

var galactica_bible=function(){
	var t=this;
	t.dbData_to_jqGrid={
		"id":{"colName":"id","colModel":{"name":"id","index":"id","width":60,"titlex":"id","frozen":true,"hidden":false,"sorttype": "number","align":"center","search":false,"formatter":gb.re.ID}}
		,"item_id":{"colName":"item id","colModel":{"name":"item_id","index":"item_id","frozen":true,"titlex":"item id","width":80,"sortable":true,"sorttype": "text","align":"center","search":false,"searchoptions":{"clearSearch":false}}}
		,"MedRoomCallLetters":{"colName":"call letters","colModel":{"name":"MedRoomCallLetters","frozen":true,"index":"MedRoomCallLetters","titlex":"media room call letters","width":95,"align":"center","editable":false,"sortable":true,"sorttype": "Text","search":true,"searchoptions":{"clearSearch":false},"formatter":gb.re.FreeTextSearch}}
		,"MedRoomTunerPosition":{"colName":"channel","colModel":{"name":"MedRoomTunerPosition","frozen":true,"index":"MedRoomTunerPosition","titlex":"media room tuner position","width":60,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"formatter":gb.re.FreeTextSearch}}
		,"PreAmbPriBak":{"colName":"server","colModel":{"name":"PreAmbPriBak","index":"PreAmbPriBak","titlex":"primary/backup servers","width":60,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"formatter":gb.re.PriBak}}
		,"PreAmbHeadEnd":{"colName":"he","colModel":{"name":"PreAmbHeadEnd","index":"PreAmbHeadEnd","titlex":"headend","width":40,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"formatter":gb.re.HeadEnd}}
		,"PreAmbMarket":{"colName":"market","colModel":{"name":"PreAmbMarket","index":"PreAmbMarket","titlex":"market","width":50,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"formatter":gb.re.Market}}
		,"PreAmbIQ_ChannelName":{"colName":"channel name","colModel":{"name":"PreAmbIQ_ChannelName","index":"PreAmbIQ_ChannelName","titlex":"channel name","width":180,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"formatter":gb.re.FreeTextSearch}}
		,"RecAcqTVE":{"colName":"tve","colModel":{"name":"RecAcqTVE","index":"RecAcqTVE","titlex":"tve manual entry","width":60,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqFeed":{"colName":"feed","colModel":{"name":"RecAcqFeed","index":"RecAcqFeed","titlex":"feed manual entry","width":60,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqFormat":{"colName":"format","colModel":{"name":"RecAcqFormat","index":"RecAcqFormat","titlex":"format manual entry","width":60,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqContactNumber":{"colName":"contact number","colModel":{"name":"RecAcqContactNumber","index":"RecAcqContactNumber","titlex":"contact number manual entry","width":150,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqLocation":{"colName":"location","colModel":{"name":"RecAcqLocation","index":"RecAcqLocation","titlex":"location manual entry","width":150,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqReceiverType":{"colName":"receiver type","colModel":{"name":"RecAcqReceiverType","index":"RecAcqReceiverType","titlex":"receiver type manual entry","width":100,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqSatellite":{"colName":"satellite","colModel":{"name":"RecAcqSatellite","index":"RecAcqSatellite","titlex":"satellite manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqTransponder":{"colName":"transponder","colModel":{"name":"RecAcqTransponder","index":"RecAcqTransponder","titlex":"transponder manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqPolarity":{"colName":"polarity","colModel":{"name":"RecAcqPolarity","index":"RecAcqPolarity","titlex":"polarity manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqCBandFreq":{"colName":"c band freq","colModel":{"name":"RecAcqCBandFreq","index":"RecAcqCBandFreq","titlex":"c band frequency manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqLBandFreq":{"colName":"l band freq","colModel":{"name":"RecAcqLBandFreq","index":"RecAcqLBandFreq","titlex":"l band frequency manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqSymbolRate":{"colName":"symbol rate","colModel":{"name":"RecAcqSymbolRate","index":"RecAcqSymbolRate","titlex":"symbole rate","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqFEC":{"colName":"fec","colModel":{"name":"RecAcqFEC","index":"RecAcqFEC","titlex":"FEC manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqACPPE":{"colName":"acppe","colModel":{"name":"RecAcqACPPE","index":"RecAcqACPPE","titlex":"acppe manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqVCTNetID":{"colName":"vct net id","colModel":{"name":"RecAcqVCTNetID","index":"RecAcqVCTNetID","titlex":"vct net id manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqProgramNumber":{"colName":"program number","colModel":{"name":"RecAcqProgramNumber","index":"RecAcqProgramNumber","titlex":"program number manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqModulation":{"colName":"modulation","colModel":{"name":"RecAcqModulation","index":"RecAcqModulation","titlex":"modulation manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqRollOff":{"colName":"roll off","colModel":{"name":"RecAcqRollOff","index":"RecAcqRollOff","titlex":"roll off manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqUaAnchor":{"colName":"ua anchor","colModel":{"name":"RecAcqUaAnchor","index":"RecAcqUaAnchor","titlex":"ua anchor manual entry","width":120,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqProgramUA":{"colName":"program ua","colModel":{"name":"RecAcqProgramUA","index":"RecAcqProgramUA","titlex":"program ua manual entry","width":120,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"RecAcqTidSN":{"colName":"tid sn","colModel":{"name":"RecAcqTidSN","index":"RecAcqTidSN","titlex":"tid sn manual entry","width":75,"align":"center","editable":true,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.manual_entry}}
		,"SencManuf":{"colName":"manuf","colModel":{"name":"SencManuf","index":"SencManuf","titlex":"sencore manufacturer","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencUnitAlias":{"colName":"unit alias","colModel":{"name":"SencUnitAlias","index":"SencUnitAlias","titlex":"sencore unit alias","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencHwModel":{"colName":"hw model","colModel":{"name":"SencHwModel","index":"SencHwModel","titlex":"sencore hw model","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencMgmtIpAddress":{"colName":"ip","colModel":{"name":"SencMgmtIpAddress","index":"SencMgmtIpAddress","titlex":"sencore manufacturer ip address","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencLocation":{"colName":"location","colModel":{"name":"SencLocation","index":"SencLocation","titlex":"sencore location","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencUnitNote":{"colName":"unit note","colModel":{"name":"SencUnitNote","index":"SencUnitNote","titlex":"sencore unit note","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencInputCardType":{"colName":"card type","colModel":{"name":"SencInputCardType","index":"SencInputCardType","titlex":"sencore input card type","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencInputHwLocation":{"colName":"hw location","colModel":{"name":"SencInputHwLocation","index":"SencInputHwLocation","titlex":"sencore input hw location","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencInputPort":{"colName":"port","colModel":{"name":"SencInputPort","index":"SencInputPort","titlex":"sencore input port","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"SencInputTSPresence":{"colName":"presence","colModel":{"name":"SencInputTSPresence","index":"SencInputTSPresence","titlex":"sencore ts presence","width":75,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.sencore}}
		,"PreEncManuf":{"colName":"manuf","colModel":{"name":"PreEncManuf","index":"PreEncManuf","titlex":"pre encoding manufacturer","width":60,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":false,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncUnitName":{"colName":"unit name","colModel":{"name":"PreEncUnitName","index":"PreEncUnitName","titlex":"pre encoding unit name","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncEncoderModel":{"colName":"model","colModel":{"name":"PreEncEncoderModel","index":"PreEncEncoderModel","titlex":"pre encoding model","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncMgmtIpAddress":{"colName":"ip","colModel":{"name":"PreEncMgmtIpAddress","index":"PreEncMgmtIpAddress","titlex":"pre encoding management ip address","width":80,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncDeviceLocation":{"colName":"device location","colModel":{"name":"PreEncDeviceLocation","index":"PreEncDeviceLocation","titlex":"pre encoding device location","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncInputName":{"colName":"input name","colModel":{"name":"PreEncInputName","index":"PreEncInputName","titlex":"pre encoding input name","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncInputCardType":{"colName":"card type","colModel":{"name":"PreEncInputCardType","index":"PreEncInputCardType","titlex":"pre encoding input card type","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncInputCardNum":{"colName":"card number","colModel":{"name":"PreEncInputCardNum","index":"PreEncInputCardNum","titlex":"pre encoding input card number","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncInputPortNum":{"colName":"port","colModel":{"name":"PreEncInputPortNum","index":"PreEncInputPortNum","titlex":"pre encoding input port number","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncInputSrvID":{"colName":"srv id","colModel":{"name":"PreEncInputSrvID","index":"PreEncInputSrvID","titlex":"pre encoding input srv id","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncInputIpAddr":{"colName":"input ip","colModel":{"name":"PreEncInputIpAddr","index":"PreEncInputIpAddr","titlex":"pre encoding input ip address","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncInputUdpPort":{"colName":"port","colModel":{"name":"PreEncInputUdpPort","index":"PreEncInputUdpPort","titlex":"pre encoding input udp port","width":60,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncOutputName":{"colName":"name","colModel":{"name":"PreEncOutputName","index":"PreEncOutputName","titlex":"pre encoding output name","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncOutputCardType":{"colName":"card type","colModel":{"name":"PreEncOutputCardType","index":"PreEncOutputCardType","titlex":"pre encoding output card type","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncOutputCardNum":{"colName":"card number","colModel":{"name":"PreEncOutputCardNum","index":"PreEncOutputCardNum","titlex":"pre encoding output card number","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncOutputPortNum":{"colName":"port","colModel":{"name":"PreEncOutputPortNum","index":"PreEncOutputPortNum","titlex":"pre encoding output port number","width":60,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncOutputIpAddr":{"colName":"output ip","colModel":{"name":"PreEncOutputIpAddr","index":"PreEncOutputIpAddr","titlex":"pre encoding output ip address","width":80,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncOutputUdpPort":{"colName":"udp port","colModel":{"name":"PreEncOutputUdpPort","index":"PreEncOutputUdpPort","titlex":"pre encoding output udp port","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncPriSwitchUnitName":{"colName":"unit name","colModel":{"name":"PreEncPriSwitchUnitName","index":"PreEncPriSwitchUnitName","titlex":"pre encoding primary switch unit name","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncPriSwitchPort":{"colName":"port","colModel":{"name":"PreEncPriSwitchPort","index":"PreEncPriSwitchPort","titlex":"pre encoding primary switch port","width":60,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncBakSwitchUnitName":{"colName":"backup name","colModel":{"name":"PreEncBakSwitchUnitName","index":"PreEncBakSwitchUnitName","titlex":"pre encoding backup switch unit name","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"PreEncBakSwitchPort":{"colName":"backup port","colModel":{"name":"PreEncBakSwitchPort","index":"PreEncBakSwitchPort","titlex":"pre encoding backup switch port","width":60,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.pre_enc}}
		,"AXCManuf":{"colName":"manuf","colModel":{"name":"AXCManuf","index":"AXCManuf","titlex":"axc manufacturer","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCUnitName":{"colName":"name","colModel":{"name":"AXCUnitName","index":"AXCUnitName","titlex":"axc unit name","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCEncoderModel":{"colName":"model","colModel":{"name":"AXCEncoderModel","index":"AXCEncoderModel","titlex":"axc encoder model","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCMgmtIpAddress":{"colName":"ip","colModel":{"name":"AXCMgmtIpAddress","index":"AXCMgmtIpAddress","titlex":"axc management ip address","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCDeviceLocation":{"colName":"location","colModel":{"name":"AXCDeviceLocation","index":"AXCDeviceLocation","titlex":"axc device location","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCInputName":{"colName":"name","colModel":{"name":"AXCInputName","index":"AXCInputName","titlex":"axc input name","width":120,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCInputCardType":{"colName":"card type","colModel":{"name":"AXCInputCardType","index":"AXCInputCardType","titlex":"axc input card type","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCInputCardNum":{"colName":"card number","colModel":{"name":"AXCInputCardNum","index":"AXCInputCardNum","titlex":"axc input card number","width":80,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCInputPortNum":{"colName":"port number","colModel":{"name":"AXCInputPortNum","index":"AXCInputPortNum","titlex":"axc input port number","width":80,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCInputSrvID":{"colName":"server id","colModel":{"name":"AXCInputSrvID","index":"AXCInputSrvID","titlex":"axc input server id","width":160,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCInputIpAddr":{"colName":"ip","colModel":{"name":"AXCInputIpAddr","index":"AXCInputIpAddr","titlex":"axc input ip address","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCInputUdpPort":{"colName":"ip","colModel":{"name":"AXCInputUdpPort","index":"AXCInputUdpPort","titlex":"axc input udp port","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCOutputName":{"colName":"output name","colModel":{"name":"AXCOutputName","index":"AXCOutputName","titlex":"axc output name","width":110,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCOutputCardType":{"colName":"output type","colModel":{"name":"AXCOutputCardType","index":"AXCOutputCardType","titlex":"axc output card type","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCOutputCardNum":{"colName":"output number","colModel":{"name":"AXCOutputCardNum","index":"AXCOutputCardNum","titlex":"axc output card number","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCOutputPortNum":{"colName":"port number","colModel":{"name":"AXCOutputPortNum","index":"AXCOutputPortNum","titlex":"axc output port number","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCOutputIpAddr":{"colName":"ip address","colModel":{"name":"AXCOutputIpAddr","index":"AXCOutputIpAddr","titlex":"axc output ip address","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCOutputUdpPort":{"colName":"udp port","colModel":{"name":"AXCOutputUdpPort","index":"AXCOutputUdpPort","titlex":"axc output upd port","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCPriSwitchUnitName":{"colName":"unit name","colModel":{"name":"AXCPriSwitchUnitName","index":"AXCPriSwitchUnitName","titlex":"axc primary switch unit name","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCPriSwitchPort":{"colName":"primary port","colModel":{"name":"AXCPriSwitchPort","index":"AXCPriSwitchPort","titlex":"axc primary switch unit port","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCBakSwitchUnitName":{"colName":"switch name","colModel":{"name":"AXCBakSwitchUnitName","index":"AXCBakSwitchUnitName","titlex":"axc backup switch unit name","width":100,"align":"center","editable":false,"sortable":true,"sorttype": "text","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
		,"AXCBakSwitchPort":{"colName":"backup port","colModel":{"name":"AXCBakSwitchPort","index":"AXCBakSwitchPort","titlex":"axc backup switch unit port","width":70,"align":"center","editable":false,"sortable":true,"sorttype": "number","search":true,"searchoptions":{"clearSearch":false},"cellattr":gb.re.axc}}
	};
};

galactica_bible.prototype.popup=function(js){	
	if(typeof _gp=='undefined')
		_gp=new grid_popups();
	_gp.process(js);
};

galactica_bible.prototype.axc=function(rowId, val, rawObject){	
	return " class='axc'";
};
galactica_bible.prototype.pre_enc=function(rowId, val, rawObject){	
	return " class='pre_enc'";
};

galactica_bible.prototype.sencore=function(rowId, val, rawObject){	
	return " class='sencore'";
};

galactica_bible.prototype.manual_entry=function(rowId, val, rawObject){	
	return " class='manual_entry'";
};

galactica_bible.prototype.Market=function(cellvalue, options, rowObject){	
	var js='{##proc##:##Market##}';
	
	return '<a href="#" onclick="_gb.popup(\''+js+'\');" style="color:#000066; text-decoration: underline;">'+cellvalue+'</a>';
};

galactica_bible.prototype.PriBak=function(cellvalue, options, rowObject){	
	var js='{##proc##:##PriBak##}';
	return '<a href="#" onclick="_gb.popup(\''+js+'\');" style="color:#000066; text-decoration: underline;">'+cellvalue+'</a>';
};

galactica_bible.prototype.HeadEnd=function(cellvalue, options, rowObject){	
	var js='{##proc##:##HeadEnd##}';
	return '<a href="#" onclick="_gb.popup(\''+js+'\');" style="color:#000066; text-decoration: underline;">'+cellvalue+'</a>';
};

galactica_bible.prototype.PreEncManuf=function(cellvalue, options, rowObject){	
	var js='{##proc##:##PreEncManuf##}';
	return '<a href="#" onclick="_gb.popup(\''+js+'\');" style="color:#000066; text-decoration: underline;">'+cellvalue+'</a>';
};

galactica_bible.prototype.PreEncUnitName=function(cellvalue, options, rowObject){	
	var js='{##proc##:##PreEncUnitName##}';
	return '<a href="#" onclick="_gb.popup(\''+js+'\');" style="color:#000066; text-decoration: underline;">'+cellvalue+'</a>';
};

galactica_bible.prototype.FreeTextSearch=function(cellvalue, options, rowObject){	
	var js='{##proc##:##FreeTextSearch##,##titlex##:##'+options.colModel.titlex+'##,##name##:##'+options.colModel.name+'##,##cellvalue##:##'+cellvalue+'##}';
	return '<a href="#" onclick="_gb.popup(\''+js+'\');" style="color:#000066; text-decoration: underline; text-decoration-color: #f4d03f;">'+cellvalue+'</a>';
};

galactica_bible.prototype.ID=function(cellvalue, options, rowObject){	
	return object_main.get_id_count();
};

_gb=new galactica_bible();
