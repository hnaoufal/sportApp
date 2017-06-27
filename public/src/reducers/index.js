import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';

const reducers = combineReducers({
    events: eventsReducer,
});

export default reducers;
