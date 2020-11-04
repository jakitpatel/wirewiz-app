const achReducer = (state = {achdetails:[]}, action) => {
    switch(action.type){
        case "SETACHDETAILS":
            return {
                ...state,
                achdetails: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default achReducer;