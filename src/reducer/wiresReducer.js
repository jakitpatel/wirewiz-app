const wiresReducer = (state = { 
    wires:[], totalCount:0,
    pageIndex:0, pageSize:10, 
    sortBy:[], filters:[], 
    extFiltersArr :[], isExtListFiltered:false, 
    backToList:false 
}, action) => {
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