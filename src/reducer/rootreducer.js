import { combineReducers } from 'redux';
import userReducer from './userReducer';
import customerReducer from './customerReducer';
import wiresReducer from './wiresReducer';

const rootReducer = combineReducers({
    customerReducer,
    userReducer,
    wiresReducer
});

export default rootReducer;