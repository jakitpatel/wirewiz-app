const fedDirectSendDetailsReducer = (state = {fedDirectSendDetailsObj:{}
}, action) => {
    switch(action.type){
        case "SETFEDDIRECTSENDDETAILS":
            return {
                ...state,
                fedDirectSendDetailsObj: action.payload //[].concat(action.payload)//[...state.wires,action.payload],
            };
        case "UPDATEWIREDETAILSFORM":
            return {
                ...state,
                fedDirectSendDetailsObj: action.payload //{ ...state.wireDetailsObj, [e.target.name]: targetVal }[,action.payload],
            };
        default:
        return state;
    }
}

export default fedDirectSendDetailsReducer;