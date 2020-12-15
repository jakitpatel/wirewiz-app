export const API_KEY = "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88";

//let env = "DEV";
let env = "PROD";

let API_URL = "http://localhost:3001/";  // For Local Env
let Login_Url = API_URL+"login"; // For Local Env
let WireBatch_Url = API_URL+"v_wireBatch";  // For Local Env
let Wires_Url = API_URL+"wire";  // For Local Env
let Wire_tbl_Url = API_URL+"wire";  // For Production Env
let WireDetails_Url = API_URL+"getWireDetails";  // For Local Env
let Customer_Url = API_URL+"ACHCustomers";  // For Local Env
let Usr_Permission_Url = API_URL+"wireAppPermission";  // For Local Env
let WireDictionary_Url = API_URL+"wireDictionary";  // For Local Env
let ACHFileRecord_Url = API_URL+"ACHFileRecord";  // For Local Env
let ACHBatchRecord_Url = API_URL+"ACHBatchRecord";  // For Local Env
let ACHDetailEntry_Url = API_URL+"ACHEntryDetail";  // For Local Env
let ACHAddendaList_Url = API_URL+"ACHAddendaRecord_NEW";  // For Local Env
let WireDocList_Url = API_URL+"wireDoc";  // For Local Env
let WireExport_Url = API_URL+"getExportData";  // For Local Env

if(env==="PROD"){
    API_URL   = "https://devnycapi01.comfed.local/api/v2/";  // For Production Env
    Login_Url = API_URL+"user/session?service=cfsb_ldap";  // For Production Env
    Customer_Url = API_URL+"cfsb_sqlserver/_table/ACHCustomers";  // For Production Env
    WireBatch_Url = API_URL+"cfsb_sqlserver/_table/v_wireBatch";  // For Production Env
    Wires_Url = API_URL+"cfsb_sqlserver/_table/v_wire?filter=";  // For Production Env
    Wire_tbl_Url = API_URL+"cfsb_sqlserver/_table/wire";  // For Production Env
    WireDetails_Url = API_URL+"getWireDetails?filter=";  // For Production Env
    Usr_Permission_Url = API_URL+"cfsb_sqlserver/_table/wireAppPermission?filter=";  // For Production Env
    WireDictionary_Url = API_URL+"cfsb_sqlserver/_table/wireDictionary";  // For Production Env
    ACHFileRecord_Url = API_URL+"cfsb_sqlserver/_table/ACHFileRecord_NEW";  // For Production Env
    ACHBatchRecord_Url = API_URL+"cfsb_sqlserver/_table/ACHBatchRecord_NEW?filter=";  // For Production Env
    ACHDetailEntry_Url = API_URL+"cfsb_sqlserver/_table/ACHEntryDetail_NEW?filter=";  // For Production Env
    ACHAddendaList_Url = API_URL+"cfsb_sqlserver/_table/ACHAddendaRecord_NEW?filter=";  // For Production Env
    WireDocList_Url = API_URL+"cfsb_sqlserver/_table/wireDoc?filter=";  // For Production Env
    WireExport_Url = API_URL+"getExportData?filter=";  // For Production Env
}

export { API_URL, Login_Url, WireBatch_Url, Wires_Url, Wire_tbl_Url, WireDetails_Url, Customer_Url, 
    Usr_Permission_Url, WireDictionary_Url, ACHFileRecord_Url, ACHBatchRecord_Url, ACHDetailEntry_Url,
    ACHAddendaList_Url, WireDocList_Url, env, WireExport_Url };