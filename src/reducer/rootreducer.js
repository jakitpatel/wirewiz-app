import { combineReducers } from 'redux';
import userReducer from './userReducer';
import customerReducer from './customerReducer';
import wiresReducer from './wiresReducer';
import achReducer from './achReducer';
import achAddendaReducer from './achAddendaReducer';
import wireDictReducer from './wireDictReducer';

const rootReducer = combineReducers({
    customerReducer,
    userReducer,
    wiresReducer,
    achReducer,
    achAddendaReducer,
    wireDictReducer
});

export default rootReducer;