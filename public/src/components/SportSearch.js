import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { fetchEvents } from '../actions/events';
import EventItem from './EventItem';

class SportSearch extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            events: [],
            config: {
                name: 'Handball'
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchEvents();

        this.setState({
            events: this.props.events
        });

    }

    fetchEvents(e) {
        e.preventDefault();

        this.props.fetchEvents();

        const ala = this.props.events.filter(event => {
            return event.name === this.state.config.name;
        });

        this.setState({
            events: ala
        });
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            config: {
                name: e.target.value
            }
        });
    }

    render() {
        const { events } = this.state;

        return(
            <div className="container">
                <div className="row">
                    <h1>Anzeige suchen</h1>
                    <form>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="sportart">Sportarten</label>
                                <select defaultValue={this.state.config.name} onChange={this.handleChange}  className="form-control" id="sportarten">
                                    <option value="Fussball">Fussball</option>
                                    <option value="Handball">Handball</option>
                                    <option value="Basketball">Basketball</option>
                                    <option value="Tichtennis">Tichtennis</option>
                                </select>
                                <label htmlFor="date">Datum</label>
                                <input type="date" className="form-control" id="date" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="location">Wo</label>
                                <input type="text" className="form-control" id="location" />
                                <label htmlFor="time">Uhrzeit</label>
                                <input type="time" className="form-control" id="time" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <button onClick={(e) => this.fetchEvents(e)} className="btn btn-primary">Suchen</button>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <ul className="list-group">
                            {events.map(event => {
                                return (<EventItem props={event} key={event.id}/>);
                            })}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        events: state.events
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(SportSearch);
