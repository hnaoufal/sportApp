import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Main = (props) => {
    return(
        <div>
            <div className="container">
                <div className="row">
                    <h1>Willkommen in der Sport-App</h1>
                    <div className="col-md-4 col-md-offset-4">
                        <Link className="btn btn-primary" to="/signin">SignIn</Link>
                        <Link className="btn btn-primary" to="/signup">SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;

