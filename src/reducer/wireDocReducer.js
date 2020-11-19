const wireDocReducer = (state = {wireDocList:[]}, action) => {
    switch(action.type){
        case "SETWireDocList":
            return {
                ...state,
                wireDocList: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireDocReducer;