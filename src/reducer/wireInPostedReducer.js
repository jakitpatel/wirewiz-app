const wiresInPostedReducer = (state = { wireinposted:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[{ id: "wirePostID", desc: true }], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREPOSTEDLIST":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIRESPOSTED":
            return {
                ...state,
                wireinposted: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wiresInPostedReducer;