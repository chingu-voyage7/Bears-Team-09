import React from "react";
import Router from "next/router";
import styled from "styled-components";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import NewEventForm from "../components/NewEventForm";
import device from "../styles/device";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

class NewEvent extends React.Component {
  state = {
    serverPostFail: false
  };

  createEvent = event => {
    console.log(event);
    axios({
      method: "post",
      url: `${backendUrl}/events`,
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
        console.error(error.response);
        this.setState({ serverPostFail: true });
      });
  };

  render() {
    const { serverPostFail } = this.state;
    return (
      <MainLayout>
        <EventWrapper>
          <InputSection>
            <Title>Create New Event</Title>
            <NewEventForm createEvent={this.createEvent} />
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

  ${device.mobileL`
    padding-top: 10px;
    padding-bottom: 10px;
  `}
`;

const InputSection = styled.div`
  background: #fff;
  padding: 20px;
  border: 1px solid #00000021;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${device.mobileL`
    padding: 10px;
    width: 90vw;
    height: 80vh;
  `}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
`;
