import * as moment from 'moment';
import React from 'react';
import { TimeFormatString } from './Globals';

const AvailableTable = (props) => {
  const { available, cb } = props;
  return (
    <table className="advisors table">
      <Header />
      <tbody>
        { available && available
          .map((availableEntry) => {
            const { advisorID, availableTimes } = availableEntry;
            return (
              <Row key={ advisorID }
              advisorID={ advisorID }
              availableTimes={ availableTimes }
              cb={ cb } />
            )
          })
        }
      </tbody>
    </table>
  )
}


const Header = () =>
  <thead>
    <tr>
      <th>Advisor ID</th>
      <th>Available Times</th>
    </tr>
  </thead>

const Row = (props) => {
  const { advisorID, availableTimes, cb } = props;
  return (
    <tr>
      <td>{ advisorID }</td>
      <td>
        <ul className="list-unstyled">
          { availableTimes
            && availableTimes.map(
              (t) => <AvailableTime key={ t } time={ t } cb={ cb } advisorID={ advisorID } />)
          }
        </ul>
      </td>
    </tr>
  )
}

const AvailableTime = (props) => {
  const { advisorID, time, cb } = props;
  const timeFormatted = time ? moment(time).format(TimeFormatString) : null;
  return (
    <li>
      <time dateTime="{ time }" className="book-time">{ timeFormatted }</time>
      <button
        className="book btn-small btn-primary"
        onClick={() => {cb(advisorID, time)}}>Book</button>
    </li>
  );
}


export default AvailableTable;