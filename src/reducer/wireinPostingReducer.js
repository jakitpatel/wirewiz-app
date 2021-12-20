const wireinPostingReducer = (state = { wireinPostingRec:[], pageIndex:0, pageSize:10, totalCount:0, sortBy:[{ id: "wirePostID", desc: true }], filters:[], backToList:false }, action) => {
    switch(action.type){
        case "UPDATEWIREINPOSTING":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIREINPOSTING":
            return {
                ...state,
                wireinPostingRec: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireinPostingReducer;
