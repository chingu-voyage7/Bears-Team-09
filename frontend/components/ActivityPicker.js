import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class ActivityPicker extends Component {
  state = {
    popupOpen: false,
    selectedActivity: "activity"
  };

  handleActivitySelection = activity => {
    // Callback fn that sends selected activity to parent component
    const { updateSelection } = this.props;
    this.setState({ popupOpen: false, selectedActivity: activity.name });
    updateSelection("activity", activity.name, activity.id);
  };

  render() {
    const { popupOpen, selectedActivity } = this.state;
    const { activities, type } = this.props;
    const categoryList = activities.map(activityObject => (
      <ActivityListItem
        key={activityObject.id}
        onClick={e => this.handleActivitySelection(activityObject, e)}
      >
        {activityObject.name}
      </ActivityListItem>
    ));

    return (
      <ActivityWrapper type={type}>
        <ActivityBox
          type={type}
          onFocus={() => this.setState({ popupOpen: true })}
          onClick={() => this.setState({ popupOpen: true })}
        >
          {selectedActivity}
        </ActivityBox>
        {popupOpen && <ul>{categoryList}</ul>}
      </ActivityWrapper>
    );
  }
}

export default ActivityPicker;

ActivityPicker.propTypes = {
  updateSelection: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired
};

const ActivityWrapper = styled.div`
  margin-bottom: ${props => (props.type === "form" ? "5px" : "")};
  &:focus {
    outline: none;
  }
  ul {
    list-style-type: none;
    margin: 2px 2px 0px 0px;
    padding: 0;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr;
    width: ${props => (props.type === "form" ? "130px" : "140px")};
    grid-gap: 5px;
    background: white;
    padding: 2px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 3px 10px 0;
    z-index: 1;
  }
`;

const ActivityBox = styled.div`
  width: 90%;
  cursor: pointer;
  text-align: left;
  text-transform: capitalize;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #757575;
  background-color: #fff;
  border-radius: 3px;
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
  padding: 3px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  &:hover {
    color: white;
    background: black;
  }
`;
