import getUserReducer from './getUser';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: getUserReducer
});

export default rootReducer;