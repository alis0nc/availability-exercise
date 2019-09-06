import moment from 'moment';
import React from 'react';
import { TimeFormatString } from './Globals';

const AvailableTable = () =>
  <table className="advisors table">
    <Header />
    <tbody>
      <Row advisorID={ 420 } availableTimes={ [moment(), moment().add(1, 'hours')] } />
      <Row advisorID={ 69 } availableTimes={ [moment().add(2, 'days'), moment().add(3, 'days')] } />
    </tbody>
  </table>

const Header = () =>
  <thead>
    <tr>
      <th>Advisor ID</th>
      <th>Available Times</th>
    </tr>
  </thead>

const Row = (props) =>
  <tr>
    <td>{ props.advisorID }</td>
    <td>
      <ul className="list-unstyled">
        { props.availableTimes
           && props.availableTimes.map(
             (t) => <AvailableTime time={ t } />)
        }
      </ul>
    </td>
  </tr>

const AvailableTime = (props) => {
  const { time } = props;
  const timeFormatted = time.format(TimeFormatString);
  return (
    <li>
      <time dateTime="{ props.time }" className="book-time">{ timeFormatted }</time>
      <button className="book btn-small btn-primary">Book</button>
    </li>
  );
}


export default AvailableTable;