const customerReducer = (state = {CustomerFriendlyName:'', CustomerType:null}, action) => {
    switch(action.type){
        case "UPDATECUSTOMER":
        return {
            ...state,
            ...action.payload
        }
        default:
        return state;
    }
}

export default customerReducer;