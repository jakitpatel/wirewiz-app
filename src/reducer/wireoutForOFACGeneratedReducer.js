const wireoutForOFACGeneratedReducer = (state = { wireoutForOFACGenerated:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[{ id: "wirePostID", desc: true }], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREOUTForOFACGenerated":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIREOUTForOFACGenerated":
            return {
                ...state,
                wireinposted: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireoutForOFACGeneratedReducer;
