import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import signinUser from '../actions/signinUser';

class Login extends Component {

    handleFormSubmit({email, password}) {
        this.props.signinUser({ email, password});
    }

    componentWillReceiveProps(props) {
        console.log('test: ', props);
        if(props.authenticated.authenticated) {
            this.props.history.push('/create');
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Fehler!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    renderSignIn() {
        const { handleSubmit} = this.props;

        return (
            <form className="signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" component="input" type="email" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" component="input" type="password" className="form-control" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
                <div className="p-body">
                    <p> Bsp.: email:password ist e@e.de:123 sonst gerne ueber die console mongo datenbank auffrufen und anschauen</p>
                    <p> Ueber Postman koennt ihr neue emails registrieren aufm Server dabei bitte Post request auf localhost:3090/signup und im body { "{'email': 'beliebig', 'password': 'beliebig'}"}</p>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        {this.renderSignIn()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.auth.error,
        authenticated: state.auth,
    };
};

Login = reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Login);

export default connect(mapStateToProps,{ signinUser })(withRouter(Login));
