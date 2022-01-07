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
import wireoutForOFACReducer from './wireoutForOFACReducer';
import wireoutForOFACGeneratedReducer from './wireoutForOFACGeneratedReducer';
import wireinForOFACReducer from './wireinForOFACReducer';
import wireOutManualResolveReducer from './wireOutManualResolveReducer';
import wireoutPostingReducer from './wireoutPostingReducer';
import wiresInFileListReducer from './wiresInFileListReducer';
import fedPDReducer from './fedPDReducer';
import fedPDDetailsReducer from './fedPDDetailsReducer';
import wireinPostingReducer from './wireinPostingReducer';
import fedShortAckReducer from './fedShortAckReducer';
import fedShortAckDetailsReducer from './fedShortAckDetailsReducer';
import fedWireErrReducer from './fedWireErrReducer';
import fedWireErrDetailsReducer from './fedWireErrDetailsReducer';
import fedRetrievalReducer from './fedRetrievalReducer';

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
    wireManualResolveReducer,
    wireOutManualResolveReducer,
    wireoutForOFACReducer,
    wireoutForOFACGeneratedReducer,
    wireinForOFACReducer,
    wireoutPostingReducer,
    wiresInFileListReducer,
    fedPDReducer,
    fedPDDetailsReducer,
    wireinPostingReducer,
    fedShortAckDetailsReducer,
    fedShortAckReducer,
    fedWireErrReducer,
    fedWireErrDetailsReducer,
    fedRetrievalReducer
});

export default rootReducer;