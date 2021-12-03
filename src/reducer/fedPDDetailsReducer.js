const fedPDDetailsReducer = (state = {fedPDDetailsObj:{}
}, action) => {
    switch(action.type){
        case "SETFEDPDDETAILS":
            return {
                ...state,
                fedPDDetailsObj: action.payload //[].concat(action.payload)//[...state.wires,action.payload],
            };
        case "UPDATEWIREDETAILSFORM":
            return {
                ...state,
                fedPDDetailsObj: action.payload //{ ...state.wireDetailsObj, [e.target.name]: targetVal }[,action.payload],
            };
        default:
        return state;
    }
}

export default fedPDDetailsReducer;