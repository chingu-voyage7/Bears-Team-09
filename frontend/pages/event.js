import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { format } from "date-fns";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";

/*
FIXME: 
1 - upon leaving or joining event, message that includes "spots left" not updating
2 - backend is not allowing to leave your own event, is that intended behaviour?
3 - modal for "are you sure" for deletion of the event is not implemented
*/

function getAttendance(userID, eventAttendees) {
  // helper fn to determine if user is already participating in an event
  const attendeesIDs = eventAttendees.map(att => String(att.id));
  if (attendeesIDs.includes(userID)) {
    return true;
  }
  return false;
}

export class event extends Component {
  state = {
    authorID: "",
    userID: "",
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
    dataLoaded: false,
    userIsAttending: null,
    userIsOwner: null
  };

  async componentDidMount() {
    const { router } = this.props;
    const { tokenCtx, id } = this.context;
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const userID = id || localStorage.getItem("id");
    this.setState({ userID });
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

    const userIsAttending = getAttendance(userID, attendees.data);

    const {
      name,
      date_from: dateFrom,
      date_to: dateTo,
      description,
      image,
      city,
      country,
      max_people: maxPeople,
      min_people: minPeople,
      author_id: authorID
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
      authorID,
      eventAttendees: attendees.data,
      dataLoaded: true,
      userIsAttending
    });
  }

  deleteEvent = () => {
    const { userID, authorID } = this.state;
    const { router } = this.props;
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    console.log(`deleting event`);
    // 1.check if USER is the AUTHOR, may be redundant because button should not be visible if condition of author === user is not met
    if (Number(userID) !== Number(authorID)) {
      return;
    }
    // 3.show "are you sure modal"

    // 4.delete event
    axios({
      method: "delete",
      url: `http://localhost:8000/events/${router.query.id}`,
      headers: { Authorization: AuthStr }
    })
      .then(response => {
        console.log(`success! event was deleted`);
        console.log(response);
        // 5.TODO: Show success msg
        // 6.Redirect to /events page
        router.push("/events");
      })
      .catch(error => console.log(error));
    // 5.Show error msg
  };

  joinEvent = () => {
    const { router } = this.props;
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    axios({
      method: "post",
      url: `http://localhost:8000/events/${router.query.id}/attend`,
      headers: { Authorization: AuthStr }
    })
      .then(response => {
        console.log(`success! attended the event`);
        console.log(response);
        this.setState({ userIsAttending: true });
      })
      .catch(error => console.log(error));
  };

  leaveEvent = () => {
    const { router } = this.props;
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    axios({
      method: "delete",
      url: `http://localhost:8000/events/${router.query.id}/attend`,
      headers: { Authorization: AuthStr }
    })
      .then(response => {
        console.log(`success! left event`);
        console.log(response);
        this.setState({ userIsAttending: false });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { router } = this.props;
    const {
      userID,
      authorID,
      name,
      dateFrom,
      dateTo,
      description,
      image,
      city,
      country,
      eventAttendees,
      maxPeople,
      dataLoaded,
      userIsAttending
    } = this.state;
    // FIXME: This needs to be tested when backend has images to show, we need to make sure path works with DB
    const eventImage = image || "../static/stock-event.jpg";

    const eventTotalAttendees = eventAttendees.length || 0;
    const slotsLeft = maxPeople - eventTotalAttendees;

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
                {slotsLeft === 0 ? <h4>Event is full</h4> : <h4>{slotsLeft} spot(s) left</h4>}
                {!userIsAttending ? (
                  <JoinButton onClick={this.joinEvent}>Join</JoinButton>
                ) : (
                  <LeaveButton onClick={this.leaveEvent}>Leave</LeaveButton>
                )}
              </JoinPanel>
              <ControlButtons>
                <BackButton onClick={() => router.push("/events")}>Back</BackButton>
                {Number(userID) === Number(authorID) && <DeleteButton onClick={this.deleteEvent}>Delete</DeleteButton>}
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
const BackButton = styled.button`
  font-size: 1.4rem;
  padding: 4px;
  cursor: pointer;
  outline: 0;
  margin: 0;
  color: white;
  border: 0;
  background: yellowgreen;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
`;

event.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(event);
