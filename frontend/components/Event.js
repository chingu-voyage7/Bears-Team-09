import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import Router from "next/router";

class Event extends Component {
  render() {
    console.log(Router.query);
    const { id, name, activity, description, date_from: dateFromRaw, date_to: dateToRaw, image } = this.props;
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
        <EventImage src={image} />
        <Link href={`/event?id=${id}`}>
          <EventTitle>{name}</EventTitle>
        </Link>
        <EventSubtitle>{activity} </EventSubtitle>
        <EventDate>
          {dateFromFormatted} - {dateToFormatted}
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
