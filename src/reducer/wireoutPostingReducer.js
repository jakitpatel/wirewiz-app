const wireoutPostingReducer = (state = { wireoutForOFACGenerated:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREOUTPOSTING":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIREOUTPOSTING":
            return {
                ...state,
                wireinposted: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireoutPostingReducer;
