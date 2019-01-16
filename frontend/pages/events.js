import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import EventList from "../components/EventList";
import ActivityPicker from "../components/ActivityPicker";
import LocationSearch from "../components/LocationSearch";
import { UserContext } from "../components/UserProvider";
// using dynamic import here as date-picker lib in DateSelector component was not working correctly in NextJS
// there may be a cleaner solution that I am not aware of
const DateSelectorDynamic = dynamic(() => import("../components/DateSelector"), {
  ssr: false
});


class Dashboard extends Component {
  state = {
    eventFilters: { datefrom: null, city: null, activity: null },
    events: [],
    places: [],
    activities: []
  };

  async componentDidMount() {
    const { tokenCtx } = this.context;
    // getting token from context, falling back to localStorage if no context exists (happens when page is refreshed)
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    // const today = new Date().toISOString();

    // Default fetch is any event from today with a limit of 10
    const eventsPromise = axios({
      method: "get",
      url: `http://localhost:8000/events`,
      headers: {
        Authorization: AuthStr
      }
    });

    const placesPromise = axios({
      method: "get",
      url: `http://localhost:8000/places`,
      headers: {
        Authorization: AuthStr
      }
    });

    const activitiesPromise = axios({
      method: "get",
      url: `http://localhost:8000/activities`,
      headers: {
        Authorization: AuthStr
      }
    });
    const [events, places, activities] = await Promise.all([eventsPromise, placesPromise, activitiesPromise]);

    this.setState({ events: events.data.events, places: places.data.places, activities: activities.data.activities });
  }

  updateFilter = (type, data) => {
    const oldState = Object.assign({}, this.state);
    const oldFilters = oldState.eventFilters;
    oldFilters[type] = data;
    this.setState({ eventFilters: oldFilters });
  };

  clearFilters = () => {
    this.setState({ eventFilters: { datefrom: null, city: null, activity: null } });
  };

  render() {
    const { events, places, activities, eventFilters } = this.state;
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
            <h4>
              <Link href="/newevent">
                <StyledButton>Create</StyledButton>
              </Link>{" "}
              your own and PairUp!
            </h4>
            <CreateImg src=".././static/people.png" alt="people" />
          </div>
        </TopPanel>
        <Divider>
          <h4>
            <span>Active Events</span>
          </h4>
        </Divider>
        <FilterControlPanel>
          <span>Pick a</span>
          <ActivityPicker activities={activities} updateFilter={this.updateFilter} />
          <span>choose</span>
          <DateSelectorDynamic updateFilter={this.updateFilter} />
          <span>and</span>
          <LocationSearch locations={places} updateFilter={this.updateFilter} />
          <button type="button" onClick={this.clearFilters}>
            Clear
          </button>
        </FilterControlPanel>
        {events && <EventList events={events} filters={eventFilters} />}
      </MainLayout>
    );
  }
}

Dashboard.contextType = UserContext;

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
  font-size: 1.3rem;
`;

const BrowseImg = styled.img`
  width: 100px;
`;

const CreateImg = styled.img`
  width: 100px;
`;

const ChoiceImg = styled.img`
  width: 100px;
`;

const StyledButton = styled.a`
  border: 1px solid white;
  border-radius: 2px;
  padding: 4px;
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
  margin: 0 auto;
  padding: 4px;
  background-color: #8bc6ec;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
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
`;
