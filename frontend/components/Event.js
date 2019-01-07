import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Event extends Component {
  render() {
    const { name, activity, description, date_from: dateFrom, date_to: dateTo } = this.props;
    return (
      <EventCard>
        <EventDate>
          {dateFrom} - {dateTo}
        </EventDate>

        <EventTitle>{name}</EventTitle>
        <EventSubtitle>{activity} </EventSubtitle>
        <p>{description}</p>
      </EventCard>
    );
  }
}

const EventCard = styled.div`
  padding: 0.5em;
  margin: 0.5em 0;
  border-radius: 0.25em;
  background: hsla(232, 59%, 50%, 0.05);
  box-shadow: 2px 2px 11px -4px rgba(0, 0, 0, 0.3);
`;
const EventTitle = styled.h4`
  font-size: 1em;
  margin: 0.5em 0;
`;
const EventSubtitle = styled.h6`
  font-size: 0.8em;
  margin: 0;
  color: hsla(232, 10%, 50%, 0.8);
`;

const EventDate = styled.div`
  float: right;
  margin: 0.5em 0;
`;

Event.propTypes = {
  name: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Event;
