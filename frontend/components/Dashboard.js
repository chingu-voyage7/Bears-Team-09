import React, { Component } from 'react';
import EventList from './EventList';
class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <EventList />
      </div>
    );
  }
}

export default Dashboard;
