const wiresInFileListReducer = (state = { wirefilelist:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[{ id: "wirePostID", desc: true }], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREFILELIST":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIRESPOSTED":
            return {
                ...state,
                wirefilelist: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wiresInFileListReducer;