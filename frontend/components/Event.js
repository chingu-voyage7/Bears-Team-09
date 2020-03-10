import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format, isEqual } from "date-fns";
import Link from "next/link";

class Event extends Component {
  render() {
    const {
      id,
      name,
      activity,
      description,
      date_from: dateFromRaw,
      date_to: dateToRaw,
      image
    } = this.props;

    const dateFromFormatted = dateFromRaw
      ? format(dateFromRaw, "MMM Do, YYYY ")
      : "";
    const dateToFormatted = dateToRaw ? format(dateToRaw, "MMM Do, YYYY") : "";
    const dateToFormattedCheck = isEqual(dateFromRaw, dateToRaw)
      ? null
      : dateToFormatted;

    const Separator = dateToFormattedCheck ? "- " : null;
    return (
      <EventCard>
        <EventImage src={image} />
        <Link href={`/event?id=${id}`}>
          <EventTitle>{name}</EventTitle>
        </Link>
        <EventSubtitle>{activity} </EventSubtitle>
        <EventDate>
          <>
            {dateFromFormatted}
            {Separator}
            {dateToFormattedCheck}
          </>
        </EventDate>
        <p>{description}</p>
      </EventCard>
    );
  }
}

const EventCard = styled.div`
  padding: 1em;
  margin: 1em 0;
  border-radius: 0.25em;
  background: hsla(232, 59%, 50%, 0.05);
  box-shadow: 2px 2px 11px -4px rgba(0, 0, 0, 0.3);
  min-height: 25vh;
`;
const EventTitle = styled.h3`
  font-size: 1.4em;
  margin: 0.5em 0;
  cursor: pointer;
  color: hsla(0, 0%, 30%, 1);
  &:hover {
    color: hsla(0, 0%, 0%, 1);
    text-decoration: underline;
  }
`;
const EventSubtitle = styled.h6`
  font-size: 1em;
  font-weight: 600;
  margin: 0;
  color: hsla(232, 10%, 50%, 0.8);
`;

const EventDate = styled.div`
  margin: 0.5em 0;
  color: hsla(0, 0%, 50%, 1);
  font-size: 1em;
`;

const EventImage = styled.img`
  float: right;
  min-height: 13vh;
  max-height: 23vh;
  clear: both;
  max-width: 25vw;
  border-radius: 0.25rem;
`;

Event.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  description: PropTypes.string,
  date_from: PropTypes.string,
  date_to: PropTypes.string,
  image: PropTypes.string
};

export default Event;
