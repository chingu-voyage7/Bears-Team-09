import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

class Event extends Component {
  // dateFormat = "MMMM Do YYYY, h:mm a";

  render() {
    const { name, activity, description, date_from: dateFromRaw, date_to: dateToRaw } = this.props;
    let dateFormatFrom = "lll";

    const dateFrom = moment(dateFromRaw, "YYYY-MM-DDTHH:mm:ss.sssZ");
    const dateTo = moment(dateToRaw, "YYYY-MM-DDTHH:mm:ss.sssZ");

    if (dateFrom.format("YYYY") === moment().format("YYYY") && dateTo.format("YYYY") === moment().format("YYYY"))
      dateFormatFrom = "MMM Do, LT";
    const dateFormatTo = dateFrom.day() === dateTo.day() ? "LT" : dateFormatFrom;

    const dateFromFormatted = moment(dateFromRaw, "YYYY-MM-DD HH:mm").format(dateFormatFrom);
    const dateToFormatted = moment(dateToRaw, "YYYY-MM-DD HH:mm").format(dateFormatTo);

    return (
      <EventCard>
        <EventDate>
          {dateFromFormatted} - {dateToFormatted}
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
  font-size: 1.2em;
  margin: 0.5em 0;
`;
const EventSubtitle = styled.h6`
  font-size: 0.8em;
  font-weight: 600;
  margin: 0;
  color: hsla(232, 10%, 50%, 0.8);
`;

const EventDate = styled.div`
  float: right;
  margin: 0.5em 0;
  color: hsla(0, 0%, 50%, 1);
  font-size: 0.75em;
`;

Event.propTypes = {
  name: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date_from: PropTypes.string.isRequired,
  date_to: PropTypes.string.isRequired
};

export default Event;
