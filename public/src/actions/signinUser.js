import axios from 'axios';
const ROOT_URL = 'http://localhost:30000';
import { AUTH_USER } from './actionTypes';
import { AUTH_ERROR } from './actionTypes';

const signinUser = function ({ email, password}, context, prop) {
    console.log(context, prop);
    return (dispatch) => {
        console.log('hall');
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER});

                console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
            })
            .catch( () => {
                dispatch(authError('Bad Login Info'));
            })
    };
};

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export default signinUser;
