import { combineReducers } from 'redux';
import userReducer from './userReducer';
import customerReducer from './customerReducer';
import wiresReducer from './wiresReducer';
import achReducer from './achReducer';
import achAddendaReducer from './achAddendaReducer';
import wireDictReducer from './wireDictReducer';
import wireDocReducer from './wireDocReducer';
import wireDetailsReducer from './wireDetailsReducer';

const rootReducer = combineReducers({
    customerReducer,
    userReducer,
    wiresReducer,
    achReducer,
    achAddendaReducer,
    wireDictReducer,
    wireDocReducer,
    wireDetailsReducer
});

export default rootReducer;