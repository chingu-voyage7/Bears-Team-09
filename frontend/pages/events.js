import React, { Component } from 'react';
import styled from 'styled-components';
import EventList from '../components/EventList';
import MainLayout from '../components/MainLayout';

class Dashboard extends Component {
  render() {
    return (
      <MainLayout>
        <Container>
          <h1>Dashboard</h1>
          <EventList />
        </Container>
      </MainLayout>
    );
  }
}

export default Dashboard;

const Container = styled.div`
  text-align: center;
`;
