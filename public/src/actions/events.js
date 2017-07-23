import {
    FETCH_EVENTS,
    FETCH_EVENT
} from './actionTypes';
import axios from 'axios';

export function fetchEvents() {
    const apiCall = axios.get('http://localhost:30000/events');

    return dispatch => {
        apiCall.then(request => {
            dispatch({
                type: FETCH_EVENTS,
                payload: request.data
            });
        })
    };
}

