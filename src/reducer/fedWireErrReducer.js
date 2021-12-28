const fedWireErrReducer = (state = { 
    fedWireErr:[], totalCount:0,
    pageIndex:0, pageSize:10, 
    sortBy:[{ id: "created", desc: true }], filters:[], 
    isListFiltered:false, 
    backToList:false 
}, action) => {
    switch(action.type){
        case "UPDATEFEDWIREERRLIST":
            return {
                ...state,
                ...action.payload
            };
        case "SETFEDWIREERR":
            return {
                ...state,
                fedWireErr: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default fedWireErrReducer;