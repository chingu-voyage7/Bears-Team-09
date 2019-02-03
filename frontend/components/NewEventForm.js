import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Router from "next/router";
import axios from "axios";
import Input from "./Input";
import LoginButton from "./LoginButton";
import BackButton from "./BackButton";
import SelectParticipantRange from "./SelectParticipantRange";
import DateRangePicker from "./DateRangePicker";
import DynamicActivitySearch from "./DynamicActivitySearch";
import DynamicLocationSearch from "./DynamicLocationSearch";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

class EventForm extends Component {
  state = {
    name: "",
    description: "",
    activity_id: "",
    place_id: "",
    date_from: "",
    date_to: "",
    min_people: null,
    max_people: null,
    valid: true,
    nameIsValid: true,
    activity_idIsValid: true,
    max_peopleIsValid: true
  };

  handleSubmit = e => {
    e.preventDefault();
    // create new event object to be sent to API
    const newEvent = {
      name: this.state.name,
      min_people: this.state.min_people,
      max_people: this.state.max_people,
      activity_id: this.state.activity_id,
      place_id: this.state.place_id,
      description: this.state.description,
      date_from: this.state.date_from,
      date_to: this.state.date_to
    };

    // validate new object
    const REQUIRED_FIELDS = ["name", "activity_id", "max_people"];
    for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
      if (newEvent[REQUIRED_FIELDS[i]] === null || newEvent[REQUIRED_FIELDS[i]] === "") {
        console.log(`validation is failing at ${REQUIRED_FIELDS[i]}`);
        if (REQUIRED_FIELDS[i] === "name") {
          this.setState({ valid: false, nameIsValid: false });
        } else if (REQUIRED_FIELDS[i] === "activity_id") {
          this.setState({ valid: false, activity_idIsValid: false });
          return;
        } else {
          this.setState({ valid: false, max_peopleIsValid: false });
          return;
        }
        return;
      }
    }
    this.props.createEvent(newEvent);
  };

  handleBackButton = () => {
    Router.push("/events");
  };

  handleInput = e => {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  };

  updateActivity = (payload, existsInDB) => {
    // existsInDB flag is used to determine if that is a brand new attribute coming and needs to be created in DB or it is existing one
    if (existsInDB) {
      this.setState({ activity_id: payload.id });
    } else {
      // create new instance of attribute with the ID
      const token = localStorage.getItem("token");
      const AuthStr = `Bearer ${token}`;
      const data = {
        name: payload.name
      };
      console.log(data);
      axios({
        method: "post",
        url: `${backendUrl}/activities`,
        data,
        headers: {
          Authorization: AuthStr
        }
      })
        .then(response => {
          console.log(response);
          this.setState({ activity_id: response.data.id });
        })
        .catch(error => console.error(error));
    }
  };

  updateLocation = (payload, existsInDB) => {
    // existsInDB flag is used to determine if that is a brand new attribute coming and needs to be created in DB or it is existing one
    if (existsInDB) {
      this.setState({ place_id: payload.id });
    } else {
      // create new instance of attribute with the ID
      const token = localStorage.getItem("token");
      const AuthStr = `Bearer ${token}`;
      const data = {
        city: payload.city,
        country: payload.country
      };
      console.log(data);
      axios({
        method: "post",
        url: `${backendUrl}/places`,
        data,
        headers: {
          Authorization: AuthStr
        }
      })
        .then(response => {
          console.log(response);
          this.setState({ place_id: response.data.id });
        })
        .catch(error => console.error(error));
    }
  };

  updateParticipantRange = (min, max) => {
    this.setState({ min_people: min, max_people: max });
  };

  updateDateRange = (startDate, endDate) => {
    this.setState({
      date_from: startDate,
      date_to: endDate
    });
  };

  render() {
    const { valid, nameIsValid, activity_idIsValid: activityValid, max_peopleIsValid } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Input id="name" name="name" type="text" placeholder="Event Name" handleChange={this.handleInput} required />
          <Input
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            handleChange={this.handleInput}
          />
          <DynamicActivitySearch
            updateActivity={this.updateActivity}
            type="activities"
            placeholder="Activity"
            allowNew
            activityValid
          />
          <DynamicLocationSearch updateLocation={this.updateLocation} placeholder="City" allowNew />
          <SelectParticipantRange updateParticipantRange={this.updateParticipantRange} />
          <DateRangePicker updateDateRange={this.updateDateRange} />
          {!valid && <ErrorMsg>Please make sure you filled name, activity and max people fields to continue!</ErrorMsg>}
          <ButtonWrapper>
            <BackButton handleBackButton={this.handleBackButton} />
            <LoginButton title="Create" />
          </ButtonWrapper>
        </form>
      </>
    );
  }
}

const ButtonWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  margin-top: 25px;
`;

const ErrorMsg = styled.p`
  color: red;
`;
export default EventForm;

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
};
