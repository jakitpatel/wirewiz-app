import { combineReducers } from 'redux';
import userReducer from './userReducer';
import customerReducer from './customerReducer';

const rootReducer = combineReducers({
    customerReducer,
    userReducer
});

export default rootReducer;