const achAddendaReducer = (state = {achAddendaList:[]}, action) => {
    switch(action.type){
        case "SETACHAddendaList":
            return {
                ...state,
                achAddendaList: [].concat(action.payload)//[...state.wires,action.payload],
            };
        default:
        return state;
    }
}

export default achAddendaReducer;