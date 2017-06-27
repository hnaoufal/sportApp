import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EventItem = ({ props }) => {
    moment.locale('de');
    return (
        <li className="list-group-item">
            <Link to="https://www.google.de">
                <div className="">{props.address}</div>
                <div className="">{props.date}</div>
                <div className="">{props.endtime}</div>
                <div className="">{props.maxMembers}</div>
                <div className="">{props.members}</div>
                <div className="">{props.starttime}</div>
                <div className="">{props.name}</div>
            </Link>
        </li>
    );
};

export default EventItem;
