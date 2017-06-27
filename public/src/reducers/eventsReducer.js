import {
    FETCH_EVENTS,
} from '../actions/actionTypes';

export default function events(state = [], action) {
    switch (action.type) {
        case FETCH_EVENTS:
            return action.payload;
        default:
            return state
    }
}
