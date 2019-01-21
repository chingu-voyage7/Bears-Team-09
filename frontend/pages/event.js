import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { format } from "date-fns";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";

function getOwnership(eventID, userID) {
  // helper function to determine if current user is the owner of the event
  // returns boolean of ownership
}

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
    minPeople: "",
    eventAttendees: "",
    dataLoaded: false
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

    const attendees = await axios({
      method: "get",
      url: `http://localhost:8000/events/${router.query.id}/attendees`,
      headers: { Authorization: AuthStr }
    });

    // console.log(currentEvent.data);
    // console.log(attendees.data);

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
      minPeople,
      eventAttendees: attendees.data,
      dataLoaded: true
    });
  }

  deleteEvent = () => {
    console.log(`deleting event`);
    // 1.make sure user is the author of the event
    // 2.delete event
    // 3.Show success/failure modal
    // 4.Redirect to /events page
  };

  render() {
    const { router } = this.props;
    const {
      name,
      dateFrom,
      dateTo,
      description,
      image,
      city,
      country,
      eventAttendees,
      maxPeople,
      dataLoaded
    } = this.state;
    // const attendeesIDs = eventAttendees.map(att => att.id);
    console.log(eventAttendees.length);
    // FIXME: This needs to be tested when backend has images to show, we need to make sure path works with DB
    const eventImage = image || "../static/stock-event.jpg";

    const eventTotalAttendees = eventAttendees.length || 0;
    const slotsLeft = maxPeople - eventTotalAttendees;

    // this to know -> is user the owner? is user attendee?

    const userIsOwner = getOwnership(router.query.id, "userID");
    // Question about user = event interaction
    // how many participants does the event have, attendees < maxPeople ? join : it is full
    // is user currently attending event? show leave : show join

    return (
      <MainLayout>
        <Container>
          {dataLoaded ? (
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
                  <div>
                    <Title>Starts: </Title>
                    <SubTitle>{dateFrom}</SubTitle>
                  </div>
                  <div>
                    <Title>Ends: </Title>
                    <SubTitle>{dateTo}</SubTitle>
                  </div>
                </InfoPanel>
                <EventImage src={eventImage} alt="people in a group" />
              </InfoWrapper>
              <JoinPanel>
                {slotsLeft === 0 ? <h4>Event is full</h4> : <h4>{slotsLeft} spots left</h4>}
                <JoinButton>Join</JoinButton>
                <LeaveButton>Leave</LeaveButton>
              </JoinPanel>
              <ControlButtons>
                <EditButton>Edit</EditButton>
                <DeleteButton onClick={this.deleteEvent}>Delete</DeleteButton>
              </ControlButtons>
            </EventCard>
          ) : (
            <p>Fetching Event Details...</p>
          )}
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

const Name = styled.div`
  text-transform: capitalize;
  font-size: 3rem;
  margin-bottom: 25px;
`;
const Description = styled.div`
  border-bottom: 1px dotted #1b115a;
  margin-bottom: 5px;
`;

const JoinPanel = styled.div`
  padding: 10px;
`;

const JoinButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
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
  color: white;
  border: 0;
  background: #1da1f2;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
`;

const ControlButtons = styled.div`
  text-align: right;
`;

const DeleteButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
  color: white;
  border: 0;
  background: #ea4335;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  margin-left: 10px;
`;
const EditButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
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
