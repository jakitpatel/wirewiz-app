import { combineReducers } from 'redux';
import userReducer from './userReducer';
import customerReducer from './customerReducer';
import wiresReducer from './wiresReducer';
import achReducer from './achReducer';
import achAddendaReducer from './achAddendaReducer';

const rootReducer = combineReducers({
    customerReducer,
    userReducer,
    wiresReducer,
    achReducer,
    achAddendaReducer
});

export default rootReducer;