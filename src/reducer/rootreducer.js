import { combineReducers } from 'redux';
import userReducer from './userReducer';
import customerReducer from './customerReducer';
import wiresReducer from './wiresReducer';
import achReducer from './achReducer';
import achAddendaReducer from './achAddendaReducer';
import wireDictReducer from './wireDictReducer';
import wireDocReducer from './wireDocReducer';
import wireDetailsReducer from './wireDetailsReducer';
import wiresInPostedReducer from './wireInPostedReducer';
import wireManualResolveReducer from './wireManualResolveReducer';

const rootReducer = combineReducers({
    customerReducer,
    userReducer,
    wiresReducer,
    achReducer,
    achAddendaReducer,
    wireDictReducer,
    wireDocReducer,
    wireDetailsReducer,
    wiresInPostedReducer,
    wireManualResolveReducer
});

export default rootReducer;