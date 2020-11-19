const wireDictReducer = (state = {wiredict:[]}, action) => {
    switch(action.type){
        case "SETWIREDICTIONARY":
            return {
                ...state,
                wiredict: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default wireDictReducer;