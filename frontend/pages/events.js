import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import EventList from "../components/EventList";
import device from "../styles/device";
import config from "../config.json";
import { NeutralButton } from "../components/shared/Buttons";
import DynamicLocationSearch from "../components/DynamicLocationSearch";
import DynamicActivitySearch from "../components/DynamicActivitySearch";

const backendUrl = config.BACKEND_URL;

const DateSelectorDynamic = dynamic(() => import("../components/DateSelector"), {
  ssr: false
});

class Dashboard extends Component {
  state = {
    eventFilters: { date_from: null, city: null, activity: null },
    events: [],
    offset: 0,
    cleared: null
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;

    // Default fetch is any event from today with a limit of 5
    const eventsPromise = axios({
      method: "get",
      url: `${backendUrl}/events?&limit=5`,
      headers: {
        Authorization: AuthStr
      }
    }).catch(err => console.error(err.response));

    const events = await eventsPromise;
    this.setState({ events: events.data.events });
  }

  updateDate = date => {
    const oldState = Object.assign({}, this.state);
    const oldFilters = oldState.eventFilters;
    oldFilters["date_from"] = date;
    this.setState({ eventFilters: oldFilters, cleared: false });
  };

  updateActivity = data => {
    const oldState = Object.assign({}, this.state);
    const oldFilters = oldState.eventFilters;
    oldFilters["activity"] = data.name;
    // updated the cleared state and filters
    this.setState({ eventFilters: oldFilters, cleared: false });
  };

  updateLocation = data => {
    const oldState = Object.assign({}, this.state);
    const oldFilters = oldState.eventFilters;
    oldFilters["city"] = data.city;
    this.setState({ eventFilters: oldFilters, cleared: false });
  };

  clearFilters = () => {
    this.setState({ eventFilters: { date_from: null, city: null, activity: null }, cleared: true });
  };

  loadMoreEvents = async () => {
    const { offset } = this.state;
    const newOffset = offset + 5;
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;

    const newEvents = await axios({
      method: "get",
      url: `${backendUrl}/events?&limit=5&offset=${newOffset}`,
      headers: {
        Authorization: AuthStr
      }
    });

    this.setState(prevState => ({
      events: [...prevState.events, ...newEvents.data.events],
      offset: newOffset
    }));
  };

  render() {
    const { events, eventFilters, cleared } = this.state;
    return (
      <MainLayout>
        <TopPanel>
          <div>
            <h4>
              <Link href="/newevent">
                <StyledButton>Create</StyledButton>
              </Link>
              new PairUp
              <br />
              or check out existing events below
            </h4>
            <DownArrow src=".././static/down-arrow.svg" alt="arrow-pointing-down" />
          </div>
        </TopPanel>
        <Divider>
          <h4>
            <span>Active Events</span>
          </h4>
        </Divider>
        <FilterControlPanel>
          <DynamicActivitySearch
            placeholder="Activity"
            allowNew={false}
            updateActivity={this.updateActivity}
            cleared={cleared}
          />
          <DynamicLocationSearch
            placeholder="City"
            updateLocation={this.updateLocation}
            allowNew={false}
            cleared={cleared}
          />
          <DateSelectorDynamic placeholder="date" updateSelection={this.updateDate} cleared={cleared} />
          <ClearButton type="button" onClick={this.clearFilters}>
            Clear
          </ClearButton>
        </FilterControlPanel>
        {events && events.length !== 0 && (
          <EventContainer>
            <EventList events={events} filters={eventFilters} />
            <NeutralButton onClick={this.loadMoreEvents}>Load More</NeutralButton>
          </EventContainer>
        )}
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
  background: rgb(22, 67, 75);
  background: linear-gradient(90deg, rgba(22, 67, 75, 1) 0%, rgba(28, 12, 91, 1) 100%);
  color: white;
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  font-size: 1.3rem;
  height: 20vh;

  ${device.mobileL`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  `}

  h4 {
    line-height: 2.3rem;

    ${device.mobileL`
      line-height: 2.0rem;
      font-size: 1.0rem;
  `}
  }
`;

const DownArrow = styled.img`
  width: 70px;

  ${device.mobileL`
      width: 40px;
  `}
`;

const StyledButton = styled.a`
  border: 1px solid white;
  border-radius: 2px;
  padding: 4px;
  margin-right: 0.5em;
  cursor: pointer;
  &:hover {
    color: gold;
  }
`;

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
    background: #fff;
    padding: 0 10px;
  }
`;

const FilterControlPanel = styled.div`
  justify-content: center;
  padding: 10px;
  background-color: #8bc6ec;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
  display: grid;
  grid-template-columns: 160px 160px 150px 50px;
  width: auto;
  grid-gap: 10px;
  border-radius: 4px;
  margin-bottom: 50px;

  ${device.mobileL`
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr 2fr 40px;
  `}
`;

const EventContainer = styled.div`
  width: 60%;
  margin: auto;
  text-align: center;
`;

const ClearButton = styled.button`
  cursor: pointer;
  padding: 5px;
  outline: 0;
  border: 0;
  border-radius: 3px;

  &:hover {
    color: white;
    background: red;
  }
`;
