import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { format } from "date-fns";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";

export class event extends Component {
  state = {
    name: "",
    dateFrom: "",
    dateTo: "",
    title: "",
    image: "",
    description: "",
    city: "",
    country: "",
    maxPeople: "",
    minPeople: ""
  };

  async componentDidMount() {
    const { router } = this.props;
    const { tokenCtx } = this.context;
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const currentEvent = await axios({
      method: "get",
      url: `http://localhost:8000/events/${router.query.id}`,
      headers: {
        Authorization: AuthStr
      }
    });
    console.log(currentEvent.data);
    const {
      name,
      date_from: dateFrom,
      date_to: dateTo,
      description,
      image,
      city,
      country,
      max_people: maxPeople,
      min_people: minPeople
    } = currentEvent.data;
    const dateFromFormat = format(dateFrom, "MMMM DD YYYY");
    const dateToFormat = format(dateTo, "MMMM DD YYYY");

    this.setState({
      name,
      dateFrom: dateFromFormat,
      dateTo: dateToFormat,
      description,
      image,
      city,
      country,
      maxPeople,
      minPeople
    });
  }

  render() {
    const { name, dateFrom, dateTo, description, image, city, country } = this.state;

    // FIXME: This needs to be tested when backend has images to show, we need to make sure path works with DB
    const eventImage = image || "../static/stock-event.jpg";
    return (
      <MainLayout>
        <Container>
          <EventCard>
            <Name>{name}</Name>
            <InfoWrapper>
              <InfoPanel>
                <Description>Description: {description}</Description>
                <div>
                  Location: {city}, {country}
                </div>
                <DateTime>Date/Time: {dateFrom}</DateTime>
                <DateTime>Date/Time: {dateTo}</DateTime>
              </InfoPanel>
              <EventImage src={eventImage} alt="people in a group" />
            </InfoWrapper>
          </EventCard>
        </Container>
      </MainLayout>
    );
  }
}

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const EventCard = styled.div`
  width: 50vw;
  min-height: 60vh;
  padding: 2em;
  margin: 0.5em 0;
  border-radius: 0.25em;
  background: hsla(232, 59%, 50%, 0.05);
  box-shadow: 2px 2px 11px -4px rgba(0, 0, 0, 0.3);
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 30px;
`;

const InfoPanel = styled.div`
  border: 1px solid grey;
`;

const EventImage = styled.img`
  width: 300px;
  border-radius: 10px;
`;

const DateTime = styled.div`
  color: grey;
`;
const Name = styled.div`
  text-transform: capitalize;
  font-size: 3rem;
  margin-bottom: 25px;
`;
const Description = styled.div`
  font-size: 2em;
`;

event.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(event);
