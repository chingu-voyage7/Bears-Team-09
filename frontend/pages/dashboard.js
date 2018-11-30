import React, { Component } from 'react';
import styled from 'styled-components';
import EventList from '../components/EventList';

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <h1>Dashboard</h1>
        <EventList />
      </Container>
    );
  }
}

export default Dashboard;

const Container = styled.div`
  text-align: center;
`;
