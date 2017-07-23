import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {
        constructor(props) {
            super(props);
        }

        componentWillMount() {
            console.log(this.props);
            console.log(this.state);
            if (!this.props.authenticated) {
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            console.log(this.props.authenticated);
            if (!nextProps.authenticated) {
                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = state => {
        console.log(state.auth);
       return { authenticated: state.auth.authenticated };
    };

    return connect(mapStateToProps)(withRouter(Authentication));
}
