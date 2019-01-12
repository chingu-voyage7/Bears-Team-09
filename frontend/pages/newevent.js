import React from "react";
import Router from "next/router";
import styled from "styled-components";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import NewEventForm from "../components/NewEventForm";

class NewEvent extends React.Component {
  state = {
    places: [],
    activities: [],
    AuthStr: "",
    serverPostFail: false
  };

  async componentDidMount() {
    const { tokenCtx } = this.context;
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    this.setState({ AuthStr });
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

  createEvent = event => {
    console.log(event);
    axios({
      method: "post",
      url: `http://localhost:8000/events`,
      data: event,
      headers: {
        Authorization: this.state.AuthStr
      }
    })
      .then(() => {
        this.setState({ serverPostFail: false });
        Router.push("/events");
      })
      .catch(error => {
        console.error(error);
        this.setState({ serverPostFail: true });
      });
  };

  render() {
    const { places, activities, serverPostFail } = this.state;
    return (
      <MainLayout>
        <EventWrapper>
          <InputSection>
            <Title>Create New Event:</Title>
            <NewEventForm createEvent={this.createEvent} places={places} activities={activities} />
            {serverPostFail && <p style={{ color: "red" }}>Event creation failed, try again</p>}
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