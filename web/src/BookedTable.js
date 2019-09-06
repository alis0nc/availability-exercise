import moment from 'moment';
import React from 'react';
import { TimeFormatString } from './Globals';

const BookedTable = () =>
    <table className="bookings table">
        <Header />
        <tbody>
            <Row advisorID={ 420 } studentName={ 'Bart Simpson' } time={ moment() } />
            <Row advisorID={ 69 } studentName={ 'Tina Belcher' } time={ moment().add(1, 'days') } />
        </tbody>
    </table>

const Header = () =>
    <thead>
        <tr>
            <th>Advisor ID</th>
            <th>Student Name</th>
            <th>Date/Time</th>
        </tr>
    </thead>

const Row = (props) => {
    const { advisorID, studentName, time } = props;
    const timeFormatted = time ? time.format(TimeFormatString) : null;
    return (
        <tr>
            <td>{ advisorID }</td>
            <td>{ studentName }</td>
            <td>
                <time dateTime="{ time }">{ timeFormatted }</time>
            </td>
        </tr>
    )
}


export default BookedTable;