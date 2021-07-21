const wireOutManualResolveReducer = (state = { wireManualResolve:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[{ id: "wirePostID", desc: true }], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREOUTMANUALRESOLVE":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIRESOUTMANUALRESOLVE":
            return {
                ...state,
                wireinposted: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireOutManualResolveReducer;
