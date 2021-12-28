const fedShortAckReducer = (state = { 
    fedShortAck:[], totalCount:0,
    pageIndex:0, pageSize:10, 
    sortBy:[{ id: "created", desc: true }], filters:[], 
    isListFiltered:false, 
    backToList:false 
}, action) => {
    switch(action.type){
        case "UPDATEFEDSHORTACKLIST":
            return {
                ...state,
                ...action.payload
            };
        case "SETFEDSHORTACK":
            return {
                ...state,
                fedShortAck: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default fedShortAckReducer;