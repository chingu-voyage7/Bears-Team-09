import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "./Input";
import LoginButton from "./LoginButton";
import ClearButton from "./ClearButton";
import Select from "./Select";
import ActivityPicker from "./ActivityPicker";
import LocationSearch from "./LocationSearch";
import DateSelector from "./DateSelector";

class EventForm extends Component {
  state = {
    name: "",
    description: "",
    activity: "",
    activity_id: "",
    place_id: "",
    date_to: "",
    date_from: new Date().toISOString(),
    owner: "",
    max_people: "2",
    creationFailed: false
  };

  // Required fields: name, activity_id, max_people
  // Optional fields: description, place_id, date_from, date_to, min_people

  handleSubmit = async e => {
    e.preventDefault();
    console.log(`submitting`);
    const newEvent = {
      name: this.state.name,
      max_people: this.state.max_people,
      activity_id: this.state.activity_id,
      place_id: this.state.place_id,
      description: this.state.description,
      date_from: this.state.date_from
    };
    console.log(newEvent);

    // Handle Success register state -> redirect
    //   axios
    //     .post("http://localhost:8000/auth/register", {
    //       email: this.state.email,
    //       password: this.state.password,
    //       first_name: this.state.firstName,
    //       last_name: this.state.lastName
    //     })
    //     .then(res => {
    //       this.props.context.logIn({ data: res.data, method: "password" });
    //       this.handleAuth(null, "email/password");
    //     })
    //     .catch(err => {
    //       console.error(err);
    //       this.handleFail();
    //     });
  };

  clearInputs = e => {
    e.preventDefault();
    console.log(`clearing inputs`);
  };

  handleInput = e => {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  };

  // FIXME: These two methods need to be joined
  updateActivity = (type, name, id) => {
    console.log(`activity updated to ${name} with id of ${id}`);
    this.setState({ activity: name, activity_id: id });
  };

  updateLocation = (type, name, id) => {
    console.log(`location updated to ${name}, ${id}`);
    this.setState({ place_id: id });
  };

  handleSelection = e => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ max_people: e.target.value });
  };

  updateDate = (_, date) => {
    console.log(date);
    this.setState({ date_to: date });
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
          <DateSelector updateSelection={this.updateDate} />
          <Select
            title="Select Participants"
            name="Select Participants"
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
            <ClearButton handleClearButton={this.clearInputs} />
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
  activities: PropTypes.arrayOf(PropTypes.object).isRequired
};
