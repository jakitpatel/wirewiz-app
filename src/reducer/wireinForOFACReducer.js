const wireinForOFACReducer = (state = { wireinForOFAC:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREINForOFAC":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIREINForOFAC":
            return {
                ...state,
                wireinForOFAC: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireinForOFACReducer;
