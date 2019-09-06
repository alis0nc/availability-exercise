import React, { Component } from 'react';
import AvailableTable from './AvailableTable';
import BookedTable from './BookedTable';
import NameForm from './NameForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchToday();
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

  render() {
    return (
      <div className="App container">
        <h1>Book Time with an Advisor</h1>

        {this.state.today && <span id="today">Today is {this.state.today}.</span>}

        <NameForm />

        <h2>Available Times</h2>
        <AvailableTable />

        <h2>Booked Times</h2>
        <BookedTable />
      </div>
    );
  }
}

export default App;
