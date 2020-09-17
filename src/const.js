export const API_KEY = "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88";


export const API_URL   = "https://devnycapi01.comfed.local/api/v2/";  // For Production Env
export const Login_Url = API_URL+"user/session?service=cfsb_ldap";  // For Production Env
export const Customer_Url = API_URL+"cfsb_sqlserver/_table/ACHCustomers";  // For Production Env
export const WireBatch_Url = API_URL+"cfsb_sqlserver/_table/v_wireBatch";  // For Production Env
export const Wires_Url = API_URL+"cfsb_sqlserver/_table/wire?filter=";  // For Production Env
export const WireDetails_Url = API_URL+"cfsb_sqlserver/_table/wire?filter=";  // For Production Env
export const Usr_Permission_Url = API_URL+"cfsb_sqlserver/_table/DataWizPermission?filter=";  // For Production Env

/*
export const API_URL = "http://localhost:3001/";  // For Local Env
export const Login_Url = API_URL+"login"; // For Local Env
export const WireBatch_Url = API_URL+"v_wireBatch";  // For Local Env
export const Wires_Url = API_URL+"wire";  // For Local Env
export const WireDetails_Url = API_URL+"wire";  // For Local Env
export const Customer_Url = API_URL+"ACHCustomers";  // For Local Env
export const Usr_Permission_Url = API_URL+"DataWizPermission";  // For Local Env
*/