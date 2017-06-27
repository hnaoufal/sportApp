import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class QuestionsList extends Component {

    renderQuestionList() {
        const { questions } = this.props;

        return (
            <div className="sportmap-list container">
                <h1 className="sportmap-headline">Sports-App</h1>
                <div className="row">
                <Link to="/search" className="btn btn-primary">Sportevent finden</Link>
                <Link to="/create" className="btn btn-default">Sportevent eintragen</Link>
                </div>
            </div>
        );
    }

    render() {
        return this.renderQuestionList();
    }

}

export default connect(null, null)(QuestionsList);
