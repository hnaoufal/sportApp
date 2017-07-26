import axios from 'axios';
import history from '../history';

import { AUTH_USER } from './actionTypes';

export default function signupUser({ email, password }) {
    return function (dispatch) {
        axios.post('http://localhost:30000/signup', {email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                history.push('/loggedIn');
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}
