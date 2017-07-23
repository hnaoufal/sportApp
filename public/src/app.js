import React from 'react';
import { AUTH_USER } from './actions/actionTypes';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import QuestionsList from './components/QuestionsList';
import QuestionCreate from './components/QuestionCreate';
import SportSearch from './components/SportSearch';
import SignIn from './components/Login';
import RequireAuth from './HoC/require_auth';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/loggedIn" component={RequireAuth(QuestionsList)} />
                <Route exact path="/create" component={RequireAuth(QuestionCreate)} />
                <Route exact path="/search" component={SportSearch} />
            </div>
        </Router>
    </Provider>
    , document.querySelector('#app'));
