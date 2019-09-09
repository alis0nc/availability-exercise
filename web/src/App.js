import axios from 'axios';
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
    this.fetchBooked();
    this.setName = this.setName.bind(this);
    this.makeBooking = this.makeBooking.bind(this);
  }

  async fetchToday() {
    try {
      const res = await axios.get("http://localhost:4433/today");
      const { data } = res;
      this.setState({today: data.today});
    } catch (e) {
      console.error("Failed to fetch 'today' data", e);
    }
  }

  async fetchAvailable() {
    try {
      const res = await axios.get("http://localhost:4433/available");
      const { data } = res;
      this.setState({available: data});
    } catch (e) {
      console.error("Failed to fetch 'available' data", e);
    }
  }

  async fetchBooked() {
    try {
      const res = await axios.get("http://localhost:4433/bookings");
      const { data } = res;
      this.setState({bookings: data});
    } catch (e) {
      console.error("Failed to fetch 'bookings' data", e);
    }
  }

  setName(name) {
    this.setState({name});
  }

  makeBooking(advisorID, time) {
    const { name } = this.state;
    if (!name) {
      alert('Please enter your name');
      return;
    }
    console.log(`Making a booking for ${name} with advisor ${advisorID} at ${time}`);
    axios.post('http://localhost:4433/book', {
      advisorID, name, time
    }).then(() => {
      this.fetchToday();
      this.fetchAvailable();
      this.fetchBooked();
    }).catch((error) => {
      alert(error);
    });
  }

  render() {
    const { today, available, bookings } = this.state;
    const todayFormatted = moment(today).format(DateFormatString);
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        { today && <span id="today">Today is {todayFormatted}.</span> }

        <NameForm cb={this.setName} />

        <h2>Available Times</h2>
        <AvailableTable available={ available } cb={this.makeBooking} />

        <h2>Booked Times</h2>
        <BookedTable booked={ bookings }/>
      </div>
    );
  }
}

export default App;
