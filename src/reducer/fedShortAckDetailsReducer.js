const fedShortAckDetailsReducer = (state = {fedShortAckDetailsObj:{}
}, action) => {
    switch(action.type){
        case "SETFEDSHORTACKDETAILS":
            return {
                ...state,
                fedShortAckDetailsObj: action.payload //[].concat(action.payload)//[...state.wires,action.payload],
            };
        case "UPDATESHORTACKDETAILSFORM":
            return {
                ...state,
                fedShortAckDetailsObj: action.payload //{ ...state.wireDetailsObj, [e.target.name]: targetVal }[,action.payload],
            };
        default:
        return state;
    }
}

export default fedShortAckDetailsReducer;