import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import EventList from '../components/EventList';
import CategoryPicker from '../components/CategoryPicker';
import LocationSearch from '../components/LocationSearch';
//using dynamic import here as date-picker lib in DateSelector component was not working correctly in NextJS
//there may be a cleaner solution that I am not aware of
import dynamic from 'next/dynamic'
const DateSelectorDynamic = dynamic(() => import('../components/DateSelector'), {
  ssr: false
})



class Dashboard extends Component {
  render() {
    return (
      <MainLayout>
        <TopPanel>
          <div>
            <h4>Browse existing events</h4>
            <BrowseImg src=".././static/browsing.png" alt="globe-search" />
          </div>
          <div>
            <h4>or</h4>
            <ChoiceImg src=".././static/choice1.png" alt="person-choice" />
          </div>
          <div>
            <h4><Link href="/newevent"><StyledButton>Create</StyledButton></Link> your own and PairUp!</h4>
            <CreateImg src=".././static/people.png" alt="people" />
          </div>
        </TopPanel>
        <Divider>
        <h4><span>Active Events</span></h4>
        </Divider>
        <FilterControlPanel>
          <span>Pick a</span>
          <CategoryPicker />
          <span>choose</span>
          <DateSelectorDynamic />
          <span>and</span>
          <LocationSearch />
        </FilterControlPanel>
        <EventList />
      </MainLayout>
    );
  }
}

export default Dashboard;

const TopPanel = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 50px;
  padding-bottom: 50px;
  border: 1px solid black;
  background: black;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
`

const BrowseImg = styled.img`
  width: 100px;
`

const CreateImg = styled.img`
  width: 100px;
`

const ChoiceImg = styled.img`
  width: 100px;
`

const StyledButton = styled.a`
  border: 1px solid white;
  border-radius: 2px;
  padding: 4px;
  cursor: pointer;
  &:hover {
    color: gold;
  }
`

const Divider = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  text-align: center;
  h4 {
    text-align: center;
    width: 100%;
    border-bottom: 3px solid purple;
    line-height: 0.1em;
    margin: 10px 0 20px;
  }

  span {
    background:#fff;
    padding:0 10px;
  }
`

const FilterControlPanel = styled.div`
  margin: 0 auto;
  padding: 4px;
  background-color: #8BC6EC;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 50px;
  span {
    font-size: 1.2rem;
    margin-right: 5px;
    margin-left: 5px;
    line-height: 36px;

  }
`

const Container = styled.div`
  background: #fafafa;
`;


// #fafafa