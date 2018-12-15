import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
/*
Endpoint GET /activities
*/

class ActivityPicker extends Component {
  state = {
    popupOpen: false,
    selectedActivity: "activity",
    activities: []
  };

  componentDidMount() {
    const { activities } = this.props;
    this.setState({ activities });
  }

  handleActivitySelection = activity => {
    const { updateFilter } = this.props;
    this.setState({ popupOpen: false, selectedActivity: activity.name });
    // Callback gets called to parent events page with activity ID
    updateFilter("activity", activity.name);
  };

  render() {
    const { popupOpen, selectedActivity, activities } = this.state;
    const categoryList = activities.map(activityObject => (
      <ActivityListItem key={activityObject.id} onClick={e => this.handleActivitySelection(activityObject, e)}>
        {activityObject.name}
      </ActivityListItem>
    ));

    return (
      <ActivityWrapper tabIndex="-1" onBlur={() => this.setState({ popupOpen: false })}>
        <ActivityBox onClick={() => this.setState({ popupOpen: true })}> {selectedActivity}</ActivityBox>
        {popupOpen && <ul>{categoryList}</ul>}
      </ActivityWrapper>
    );
  }
}

export default ActivityPicker;

ActivityPicker.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired
};

const ActivityWrapper = styled.div`
  padding: 2px;
  line-height: 25px;

  &:focus {
    outline: none;
  }
  ul {
    list-style-type: none;
    margin: 2px 0px 0px 0px;
    padding: 0;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    background: white;
    padding: 5px;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 3px 10px 0;
    z-index: 1;
  }
`;

const ActivityBox = styled.div`
  width: 140px;
  padding: 2px;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #757575;
  background-color: #fff;
  border-radius: 2px;
  transition: all 100ms ease-out;
  &:hover {
    background: purple;
    color: white;
  }
`;

const ActivityListItem = styled.li`
  text-transform: capitalize;
  text-align: left;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  &:hover {
    color: white;
    background: black;
  }
`;
