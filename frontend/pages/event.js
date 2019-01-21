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
                <Description>
                  <Title>Description</Title>
                  <SubTitle>{description}</SubTitle>
                </Description>
                <div>
                  <Title>Location: </Title>
                  <SubTitle>
                    {city}, {country}
                  </SubTitle>
                </div>
                <DateTime>
                  <Title>Starts: </Title>
                  <SubTitle>{dateFrom}</SubTitle>
                </DateTime>
                <DateTime>
                  <Title>Ends: </Title>
                  <SubTitle>{dateTo}</SubTitle>
                </DateTime>
              </InfoPanel>
              <EventImage src={eventImage} alt="people in a group" />
            </InfoWrapper>
            <JoinPanel>
              <h4>X spots left</h4>
              <JoinButton>Join</JoinButton>
              <LeaveButton>Leave</LeaveButton>
              <EditButton>Edit</EditButton>
              <DeleteButton>Delete</DeleteButton>
            </JoinPanel>
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
  grid-template-columns: 2fr 350px;
  grid-gap: 30px;
`;

const InfoPanel = styled.div`
  border: 1px solid grey;
  text-align: left;
  padding: 10px;
  border-radius: 10px;
`;

const EventImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.p`
  font-size: 1em;
  font-weight: 700;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 1em;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
`;

const DateTime = styled.div``;
const Name = styled.div`
  text-transform: capitalize;
  font-size: 3rem;
  margin-bottom: 25px;
`;
const Description = styled.div`
  border-bottom: 1px dotted #1b115a;
  margin-bottom: 5px;
`;

const JoinPanel = styled.div``;

const JoinButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
  margin-left: 100px;
  color: white;
  border: 0;
  background: #1d740d;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
`;
const LeaveButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
  margin-left: 100px;
  color: white;
  border: 0;
  background: #1da1f2;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
`;
const DeleteButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
  margin-left: 100px;
  color: white;
  border: 0;
  background: #ea4335;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
`;
const EditButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
  margin-left: 100px;
  color: white;
  border: 0;
  background: salmon;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
`;

event.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(event);
