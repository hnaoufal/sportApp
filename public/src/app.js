import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';

import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import QuestionsList from './components/QuestionsList';
import QuestionCreate from './components/QuestionCreate';
import SportSearch from './components/SportSearch';

import reducers from './reducers';

const store = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={store(reducers)}>
        <Router>
            <div>
                <Route exact path="/" component={QuestionsList} />
                <Route exact path="/create" component={QuestionCreate} />
                <Route exact path="/search" component={SportSearch} />
            </div>
        </Router>
    </Provider>
    , document.querySelector('#app'));
