import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";
import { format } from "date-fns";
import MainLayout from "../components/MainLayout";
import EventList from "../components/EventList";
import ActivityPicker from "../components/ActivityPicker";
import LocationSearch from "../components/LocationSearch";
import { UserContext } from "../components/UserProvider";
import device from "../styles/device";
import StyledErrorMsg from "../styles/StyledErrorMsg";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

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
    activities: [],
    offset: 0
  };

  async componentDidMount() {
    const { tokenCtx } = this.context;
    // getting token from context, falling back to localStorage if no context exists (happens when page is refreshed)
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;

    const today = format(new Date(), "YYYY-MM-DD");
    const isoDate = `${today}T00:00:000Z`;
    // console.log(isoDate);

    // const realUlr = `http://localhost:8000/events?compare=gt&date_from=${isoDate}&limit=5`;

    // Default fetch is any event from today with a limit of 5
    const eventsPromise = axios({
      method: "get",

      url: `${backendUrl}/events?compare=gt&date_from=${isoDate}&limit=5`,

      headers: {
        Authorization: AuthStr
      }
    }).catch(err => console.error(err.response));

    const placesPromise = axios({
      method: "get",
      url: `${backendUrl}/places`,
      headers: {
        Authorization: AuthStr
      }
    }).catch(err => console.error(err.response));

    const activitiesPromise = axios({
      method: "get",
      url: `${backendUrl}/activities`,
      headers: {
        Authorization: AuthStr
      }
    }).catch(err => console.error(err.response));
    const [events, places, activities] = await Promise.all([eventsPromise, placesPromise, activitiesPromise]);

    if (!events || !places || !activities) {
      console.log("One of the following is empty: ", { events, places, activities });
      return;
    }

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

  loadMoreEvents = async () => {
    const { offset } = this.state;
    const newOffset = offset + 5;
    const { tokenCtx } = this.context;
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const today = format(new Date(), "YYYY-MM-DD");
    const isoDate = `${today}T00:00:000Z`;

    const newEvents = await axios({
      method: "get",
      url: `${backendUrl}/events?compare=gt&date_from=${isoDate}&limit=5&offset=${newOffset}`,
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
    const { events, places, activities, eventFilters } = this.state;
    return (
      <MainLayout>
        <TopPanel>
          <div>
            <h4>
              <Link href="/newevent">
                <StyledButton>Create</StyledButton>
              </Link>{" "}
              new event and PairUp
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
          <ActivityPicker type="filter" activities={activities} updateSelection={this.updateFilter} />
          <DateSelectorDynamic placeholder="date" updateSelection={this.updateFilter} />
          <LocationSearch type="filter" locations={places} updateSelection={this.updateFilter} />
          <ClearnButton type="button" onClick={this.clearFilters}>
            Clear
          </ClearnButton>
        </FilterControlPanel>
        {events && events.length !== 0 && (
          <EventContainer>
            <EventList events={events} filters={eventFilters} />{" "}
            <LoadMoreButton onClick={this.loadMoreEvents}>Load More</LoadMoreButton>
          </EventContainer>
        )}
        {events.length === 0 && <StyledErrorMsg>No events found</StyledErrorMsg>}
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
  justify-content: center;
  padding: 10px;
  background-color: #8bc6ec;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
  display: grid;
  grid-template-columns: 100px 100px 150px 50px;
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
  text-align: center;
`;

const LoadMoreButton = styled.button`
  cursor: pointer;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  border: 0;
  outline: 0;
  padding: 5px;
  font-size: 1.1rem;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: black;
  color: white;

  &:hover {
    color: gold;
  }
`;

const ClearnButton = styled.button`
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
