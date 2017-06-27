import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class QuestionCreate extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            question: '',
            responses: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    addResponse(textInput, e){
        e.preventDefault();

        this.setState({
            responses: [...this.state.responses, textInput.value]
        });

        textInput.value = '';
    }

    removeResponse(textInput, e) {
        e.preventDefault();

        this.setState({
            responses: [...this.state.responses].filter(arr => {
                return arr !== textInput;
            })
        });
    }

    handleInputChange(e) {
        this.setState({question: e.target.value})
    }

    sendRequest(e) {
        e.preventDefault();

        axios.post('https://polls.apiblueprint.org/questions', {
            "question": this.state.question,
            "choices": this.state.responses
        }).then(res => {
            this.props.history.push('/');
        });

    }

    render() {
        const { responses } = this.state;

        return(
            <div className="container">
                <div className="row">
                    <h1>Create a Question</h1>
                <form>
                    <div className="form-group">
                        <label className="label-response"  htmlFor="question">Create a Question</label>
                        <input value={this.state.question} onChange={this.handleInputChange} type="text" className="form-control" id="question" placeholder="Type in your Question"/>
                    </div>
                    <div className="form-group">
                        <label className="label-response" htmlFor="response">Create Responses</label>
                        <input ref={input => {this.textInput = input} } type="text" className="form-control response" id="response" placeholder="Type in your Question"/>
                        <button onClick={(e) => this.addResponse(this.textInput, e)} className="question-add btn btn-default">+</button>
                    </div>
                    <ul className="list-group response-list">
                        {responses.map((res, index) => {
                            return <li key={res + index} className="list-group-item">{res}<button onClick={(e) => this.removeResponse(res, e)} className="btn btn-danger pull-right">close</button></li>;
                        })}
                    </ul>
                    <button onClick={(e) => this.sendRequest(e)} type="submit" className="btn btn-default">Submit</button>
                </form>
                </div>
            </div>
        );
    }

}
export default withRouter(QuestionCreate);
