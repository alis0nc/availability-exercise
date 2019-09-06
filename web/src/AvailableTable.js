import * as moment from 'moment';
import React from 'react';
import { TimeFormatString } from './Globals';

const AvailableTable = (props) => {
  const { available } = props;
  console.log(available);
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
              availableTimes={ availableTimes } />
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
  const { advisorID, availableTimes } = props;
  return (
    <tr>
      <td>{ advisorID }</td>
      <td>
        <ul className="list-unstyled">
          { availableTimes
            && availableTimes.map(
              (t) => <AvailableTime time={ t } />)
          }
        </ul>
      </td>
    </tr>
  )
}


const AvailableTime = (props) => {
  const { time } = props;
  const timeFormatted = moment(time).format(TimeFormatString);
  return (
    <li>
      <time dateTime="{ props.time }" className="book-time">{ timeFormatted }</time>
      <button className="book btn-small btn-primary">Book</button>
    </li>
  );
}


export default AvailableTable;