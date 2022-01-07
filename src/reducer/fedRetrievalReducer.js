const fedRetrievalReducer = (state = { 
    fedRetrieval:[], totalCount:0,
    pageIndex:0, pageSize:10, 
    sortBy:[{ id: "created", desc: true }], filters:[], 
    isListFiltered:false, 
    backToList:false 
}, action) => {
    switch(action.type){
        case "UPDATEFEDRETRIEVALLIST":
            return {
                ...state,
                ...action.payload
            };
        case "SETFEDRETRIEVAL":
            return {
                ...state,
                fedRetrieval: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default fedRetrievalReducer;