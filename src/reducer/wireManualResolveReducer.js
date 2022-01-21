const wireManualResolveReducer = (state = { wireManualResolve:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[{ id: "completeDateTime", desc: true }], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREMANUALRESOLVE":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIRESMANUALRESOLVE":
            return {
                ...state,
                wireinposted: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireManualResolveReducer;
