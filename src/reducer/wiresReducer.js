const wiresReducer = (state = {wires:[]}, action) => {
    switch(action.type){
        case "UPDATECUSTOMER":
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