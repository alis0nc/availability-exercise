import * as moment from 'moment';
import React, { Component } from 'react';
import AvailableTable from './AvailableTable';
import BookedTable from './BookedTable';
import { DateFormatString } from './Globals';
import NameForm from './NameForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchToday();
    this.fetchAvailable();
  }

  async fetchToday() {
    try {
      const res = await fetch("http://localhost:4433/today");
      const json = await res.json();
      this.setState({today: json.today});
    } catch (e) {
      console.error("Failed to fetch 'today' data", e);
    }
  }

  async fetchAvailable() {
    try {
      const res = await fetch("http://localhost:4433/available");
      const json = await res.json();
      this.setState({available: json});
    } catch (e) {
      console.error("Failed to fetch 'available' data", e);
    }
  }

  render() {
    const { today, available } = this.state;
    const todayFormatted = moment(today).format(DateFormatString);
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        { today && <span id="today">Today is {todayFormatted}.</span> }

        <NameForm />

        <h2>Available Times</h2>
        <AvailableTable available={ available } />

        <h2>Booked Times</h2>
        <BookedTable />
      </div>
    );
  }
}

export default App;
