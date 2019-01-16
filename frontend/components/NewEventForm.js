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
import DateRangePicker from "./DateRangePicker";

class EventForm extends Component {
  state = {
    name: "",
    description: "",
    activity_id: "",
    place_id: "",
    date_from: "",
    date_to: "",
    min_people: "2",
    max_people: "2",
    valid: true
  };

  handleSubmit = e => {
    e.preventDefault();
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

    // validation of fields
    const eventArr = Object.keys(newEvent);
    for (let i = 0; i < eventArr.length; i++) {
      // define optional fields here for early return and no validation
      if (eventArr[i] === "valid" || eventArr[i] === "date_from" || eventArr[i] === "date_to") break;
      if (newEvent[eventArr[i]].length === 0) {
        this.setState({ valid: false });
        return;
      }
    }
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

  handleMaxSelection = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ max_people: e.target.value });
  };

  handleMinSelection = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ min_people: e.target.value });
  };

  updateDateRange = (startDate, endDate) => {
    console.log(startDate, endDate);
    this.setState({
      date_from: startDate,
      date_to: endDate
    });
  };

  render() {
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
          <SelectWrapper>
            <Select
              title="Min People"
              handleSelection={this.handleMinSelection}
              min={this.state.min_people}
              max={this.state.max_people}
              optionsArr={[
                { id: 2, selectionName: "2", value: "2" },
                { id: 3, selectionName: "3", value: "3" },
                { id: 4, selectionName: "4", value: "4" },
                { id: 5, selectionName: "5", value: "5" },
                { id: 6, selectionName: "6+", value: "6" }
              ]}
            />
            <Select
              title="Max People"
              handleSelection={this.handleMaxSelection}
              min={this.state.min_people}
              max={this.state.max_people}
              optionsArr={[
                { id: 2, selectionName: "2", value: "2" },
                { id: 3, selectionName: "3", value: "3" },
                { id: 4, selectionName: "4", value: "4" },
                { id: 5, selectionName: "5", value: "5" },
                { id: 6, selectionName: "6+", value: "6" }
              ]}
            />
          </SelectWrapper>
          <DateRangePicker updateDateRange={this.updateDateRange} />
          {!this.state.valid && <ErrorMsg>Error: Please fill all fields to create an event!</ErrorMsg>}
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

const SelectWrapper = styled.div`
  display: inline-flex;
  border-radius: 3px;
  outline: 0;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #757575;
  margin-top: 5px;
`;

const ErrorMsg = styled.p`
  color: red;
`;
export default EventForm;

EventForm.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  createEvent: PropTypes.func.isRequired
};
