const wireoutForOFACReducer = (state = { wireoutForOFAC:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[{ id: "wirePostID", desc: true }], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREOUTForOFAC":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIREOUTForOFAC":
            return {
                ...state,
                wireinposted: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireoutForOFACReducer;
