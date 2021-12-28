//let env = "DEVLOCAL";
let env = "DEV";
//let env = "PROD";
//let env = "UAT";

let API_URL = "";
let API_URL_DB = "";

if (env === 'DEV') {
    API_URL      = "https://api-dev-int.cfsb.com/api/v2/";  // For DEV Env
    API_URL_DB   = "https://api-dev-int.cfsb.com/api/v2/wiresdb/";  // For DEV Env
} else if (env === 'UAT') {
    API_URL      = "https://api-uat-int.cfsb.com/api/v2/";  // For UAT Env
    API_URL_DB   = "https://api-uat-int.cfsb.com/api/v2/wiresdb/";  // For UAT Env
} else if(env === 'PROD'){
    API_URL      = "https://api-prod-int.cfsb.com/api/v2/";  // For PROD Env
    API_URL_DB   = "https://api-prod-int.cfsb.com/api/v2/wiresdb/";  // For DEV Env
} else if(env === 'DEVLOCAL'){
    API_URL = "http://localhost:3001/";  // For Local Env, Don't Modify
}

// For Local Env
if(env==="DEVLOCAL"){
    window.constVar = {
        env       : env,
        API_URL   : API_URL,
        API_KEY   : "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88",
        Login_Url : API_URL+"login",
        WireBatch_Url : API_URL+"v_wireBatch",
        Wires_Url     : API_URL+"v_wire",
        WiresGroup_Url: API_URL+"v_wireByGroup",
        Wire_tbl_Url  : API_URL+"wire",
        WireDetails_Url : API_URL+"getWireDetails",
        Usr_Permission_Url   : API_URL+"wireAppPermission",
        WireDictionary_Url   : API_URL+"wireDictionary",
        ACHFileRecord_Url    : API_URL+"ACHFileRecord",  
        ACHBatchRecord_Url   : API_URL+"ACHBatchRecord",  
        ACHDetailEntry_Url   : API_URL+"ACHEntryDetail",  
        ACHAddendaList_Url   : API_URL+"ACHAddendaRecord_NEW",  
        WireDocList_Url      : API_URL+"wireDoc",  
        WireExport_Url  : API_URL+"getExportData",
        DepositList_Url : API_URL+"v_deposit",
        Wirein_Url      : API_URL+"v_wireByVaccount",
        WireinManual_Url : API_URL+"v_wireManual",
        WireinPosted_Url : API_URL+"v_wirePost",
        //WireInExport_Url : API_URL+"wirePost",
        WireInExport_Url : API_URL+"wirepost2ofac",
        WirePost2Fiserv_Url    : API_URL+"wirePost2",
        WireinPostedActual_Url : API_URL+"v_wirePosted",
        WireinManualResolved_Url : API_URL+"v_wireManualResolved",
        WirePost2_Url            : API_URL+"wirePost2",
        WireoutForOFAC_Url       : API_URL+"v_wireout",
        WireoutForOFACGenerated_Url   : API_URL+"v_wireout_posted",
        WireoutForPosting_Url  : API_URL+"v_wireout_post",
        WireoutManual_Url      : API_URL+"v_wireoutManual",
        WireoutManualResolved_Url : API_URL+"v_wireoutManualResolved",
        WireoutPartners_Url       : API_URL+"v_wireoutPartner",
        WireoutPartnersPosting_Url  : API_URL+"v_wireoutPartner_post",
        WireoutPartnersCompleted_Url   : API_URL+"v_wireoutPartner_posted",
        WireFileList_Url          : API_URL+"wireFile",
        WireEODPost_Url           : API_URL+"posteod",
        FedPDList_Url             : API_URL+"fedPDFmsg",
        SENDFEDLINEMSG_URL        : API_URL+"fedDirectSend",
        SENDDIRECTWIRE_URL        : API_URL+"SendDirectWire",
        FedShortAck_Url           : API_URL+"fedShortAck",
        FedWireErr_Url            : API_URL+"fedWireErr"
    }
} else {
    // For DEV & Production Env
    window.constVar = {
        env       : env,
        API_URL   : API_URL,
        API_KEY   : "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88",
        Login_Url : API_URL+"user/session?service=cfsb_ldap",
        Customer_Url  : API_URL_DB+"_table/ACHCustomers",
        WireBatch_Url : API_URL_DB+"_table/v_wireBatch",
        Wires_Url     : API_URL_DB+"_table/v_wire",
        WiresGroup_Url: API_URL_DB+"_table/v_wireByGroup",
        Wire_tbl_Url  : API_URL_DB+"_table/wire",
        WireDetails_Url : API_URL+"getWireDetails?filter=",
        Usr_Permission_Url   : API_URL_DB+"_table/wireAppPermission?filter=",
        WireDictionary_Url   : API_URL_DB+"_table/wireDictionary",
        ACHFileRecord_Url    : API_URL_DB+"_table/ACHFileRecord_NEW",  
        ACHBatchRecord_Url   : API_URL_DB+"_table/ACHBatchRecord_NEW?filter=",  
        ACHDetailEntry_Url   : API_URL_DB+"_table/ACHEntryDetail_NEW?filter=",  
        ACHAddendaList_Url   : API_URL_DB+"_table/ACHAddendaRecord_NEW?filter=",  
        WireDocList_Url      : API_URL_DB+"_table/wireDoc?filter=",  
        WireExport_Url  : API_URL+"getExportData",
        DepositList_Url : API_URL_DB+"_table/v_deposit",
        Wirein_Url      : API_URL_DB+"_table/v_wireByVaccount",
        WireinManual_Url : API_URL_DB+"_table/v_wireManual",
        WireinPosted_Url : API_URL_DB+"_table/v_wirePost",
        //WireInExport_Url : API_URL+"wirePost",
        WireInExport_Url : API_URL+"wirepost2ofac",
        WirePost2Fiserv_Url    : API_URL+"wirePost2",
        WireinPostedActual_Url : API_URL_DB+"_table/v_wirePosted",
        WireinManualResolved_Url : API_URL_DB+"_table/v_wireManualResolved",
        WirePost2_Url            : API_URL+"wirePost2",
        WireoutForOFAC_Url       : API_URL_DB+"_table/v_wireout",
        WireoutForOFACGenerated_Url   : API_URL_DB+"_table/v_wireout_posted",
        WireoutForPosting_Url   : API_URL_DB+"_table/v_wireout_post",
        WireoutManual_Url       : API_URL_DB+"_table/v_wireoutManual",
        WireoutManualResolved_Url : API_URL_DB+"_table/v_wireoutManualResolved",
        WireoutPartners_Url          : API_URL_DB+"_table/v_wireoutPartner",
        WireoutPartnersPosting_Url   : API_URL_DB+"_table/v_wireoutPartner_post",
        WireoutPartnersCompleted_Url : API_URL_DB+"_table/v_wireoutPartner_posted",
        WireFileList_Url   : API_URL_DB+"_table/wireFile",
        WireEODPost_Url    : API_URL+"posteod",
        FedPDList_Url      : API_URL_DB+"_table/fedPDFmsg",
        SENDFEDLINEMSG_URL        : API_URL+"fedDirectSend",
        SENDDIRECTWIRE_URL        : API_URL+"SendDirectWire",
        FedShortAck_Url           : API_URL_DB+"_table/fedShortAck",
        FedWireErr_Url            : API_URL_DB+"_table/fedWireErr"
    }
}