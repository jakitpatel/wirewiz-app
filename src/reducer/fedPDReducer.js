const fedPDReducer = (state = { 
    fedPD:[], totalCount:0,
    pageIndex:0, pageSize:10, 
    sortBy:[{ id: "created", desc: true }], filters:[], 
    isListFiltered:false, 
    backToList:false 
}, action) => {
    switch(action.type){
        case "UPDATEFEDPDLIST":
            return {
                ...state,
                ...action.payload
            };
        case "SETFEDPD":
            return {
                ...state,
                fedPD: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default fedPDReducer;