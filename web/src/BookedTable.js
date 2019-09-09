import * as moment from 'moment';
import React from 'react';
import { TimeFormatString } from './Globals';

const BookedTable = (props) => {
    const { booked } = props;
    return (
        <table className="bookings table">
            <Header />
            <tbody>
                { booked
                  && booked.map((booking) => {
                      const { name, advisorID, time } = booking;
                      return (
                        <Row key={`${advisorID}_${name}_${time}`}
                          advisorID={ advisorID } studentName={ name } time={ time } />
                      )
                  })
                }
            </tbody>
        </table>
    );
}


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
    const timeFormatted = time ? moment(time).format(TimeFormatString) : null;
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