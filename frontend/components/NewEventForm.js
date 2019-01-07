import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Router from "next/router";
import Input from "./Input";
import LoginButton from "./LoginButton";
import BackButton from "./BackButton";
import Select from "./Select";
import ActivityPicker from "./ActivityPicker";
import LocationSearch from "./LocationSearch";
import DateSelector from "./DateSelector";

class EventForm extends Component {
  state = {
    name: "",
    description: "",
    activity_id: "",
    place_id: "",
    date_to: "",
    date_from: "",
    max_people: "2"
  };

  handleSubmit = e => {
    e.preventDefault();
    const newEvent = {
      name: this.state.name,
      max_people: this.state.max_people,
      activity_id: this.state.activity_id,
      place_id: this.state.place_id,
      description: this.state.description,
      date_from: this.state.date_from,
      date_to: this.state.date_to
    };
    this.props.createEvent(newEvent);
  };

  handleBackButton = () => {
    Router.push(`/events`);
  };

  handleInput = e => {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  };

  updateActivity = (type, name, id) => {
    this.setState({ activity: name, activity_id: id });
  };

  updateLocation = (type, name, id) => {
    this.setState({ place_id: id });
  };

  handleSelection = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ max_people: e.target.value });
  };

  updateStartDate = (_, date) => {
    this.setState({ date_from: date });
  };

  updateEndDate = (_, date) => {
    this.setState({ date_to: date });
  };

  render() {
    // defaults going downstream from state (should work for clearing)
    const { places, activities } = this.props;
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
          <ActivityPicker type="form" updateSelection={this.updateActivity} activities={activities} />
          <LocationSearch locations={places} updateSelection={this.updateLocation} />
          <DateSelector type="form" placeholder="Date start" updateSelection={this.updateStartDate} />
          <DateSelector type="form" placeholder="Date end" updateSelection={this.updateEndDate} />
          <Select
            title="Participants"
            name="Participants"
            handleSelection={this.handleSelection}
            optionsArr={[
              { id: 2, name: "2", value: "2" },
              { id: 3, name: "3", value: "3" },
              { id: 4, name: "4", value: "4" },
              { id: 5, name: "5", value: "5" },
              { id: 6, name: "6+", value: "6" }
            ]}
          />
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
`;

export default EventForm;

EventForm.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  createEvent: PropTypes.func.isRequired
};
