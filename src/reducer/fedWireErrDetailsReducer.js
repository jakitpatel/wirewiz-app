const fedWireErrDetailsReducer = (state = {fedWireErrDetailsObj:{}
}, action) => {
    switch(action.type){
        case "SETFEDWIREERRDETAILS":
            return {
                ...state,
                fedWireErrDetailsObj: action.payload //[].concat(action.payload)//[...state.wires,action.payload],
            };
        case "UPDATEWIREERRDETAILSFORM":
            return {
                ...state,
                fedWireErrDetailsObj: action.payload //{ ...state.wireDetailsObj, [e.target.name]: targetVal }[,action.payload],
            };
        default:
        return state;
    }
}

export default fedWireErrDetailsReducer;