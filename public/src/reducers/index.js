import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import authReducer from './auth_reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
    form: formReducer,
    events: eventsReducer,
    auth: authReducer,
});

export default reducers;
