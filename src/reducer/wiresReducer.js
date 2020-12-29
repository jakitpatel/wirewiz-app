const wiresReducer = (state = { wires:[], pageIndex:0, pageSize:10 }, action) => {
    switch(action.type){
        case "UPDATEWIRELIST":
            return {
                ...state,
                ...action.payload
            };
        case "SETWIRES":
            return {
                ...state,
                wires: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wiresReducer;