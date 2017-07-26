/**
 * Created by hicham on 23.07.17.
 */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import signupUser from '../actions/signupUser';

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form className="signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" component="input" type="email" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" component="input" className="form-control" type="password" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <Field component="input" name="password-repeat" className="form-control" type="password" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

Signup = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
})(Signup);

export default connect(mapStateToProps, { signupUser })(Signup);

