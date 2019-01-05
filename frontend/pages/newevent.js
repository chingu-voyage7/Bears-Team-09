import React from "react";
import styled from "styled-components";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import NewEventForm from "../components/NewEventForm";

class NewEvent extends React.Component {
  state = {
    places: [],
    activities: []
  };

  async componentDidMount() {
    const { tokenCtx } = this.context;
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;

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

    const [places, activities] = await Promise.all([placesPromise, activitiesPromise]);

    this.setState({ places: places.data.places, activities: activities.data.activities });
  }

  render() {
    const { places, activities } = this.state;
    return (
      <MainLayout>
        <EventWrapper>
          <InputSection>
            <Title>Create New Event:</Title>
            <NewEventForm places={places} activities={activities} />
          </InputSection>
        </EventWrapper>
      </MainLayout>
    );
  }
}

export default NewEvent;

const EventWrapper = styled.div`
  background: #fafafa;
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputSection = styled.div`
  background: #fff;
  padding: 20px;
  border: 1px solid #00000021;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
`;
