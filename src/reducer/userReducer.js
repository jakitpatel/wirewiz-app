const userReducer = (state = {
    session_token:null,
    session_id:null, 
    id:null,
    name:null,
    first_name:null, 
    last_name:null,
    email:null,
    is_sys_admin:null,
    host:null,
    CUSTOMER_CREATOR: false,
    CUSTOMER_VIEWER: false,
    CUSTOMER_ENABLER: false,
    CUSTOMER_MODIFIER: false
}, action ) => {
    switch(action.type){
        case "UPDATEUSER":
        return {
            ...state,
            ...action.payload
        }
        default:
        return state;
    }
}

export default userReducer;