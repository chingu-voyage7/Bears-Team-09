import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { format } from "date-fns";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";
import Modal from "../components/Modal";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

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
    userIsOwner: null,
    showModal: false
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
      url: `${backendUrl}/events/${router.query.id}`,
      headers: {
        Authorization: AuthStr
      }
    });

    const attendees = await axios({
      method: "get",
      url: `${backendUrl}/events/${router.query.id}/attendees`,
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
    const dateFromFormat = dateFrom ? format(dateFrom, "MMMM DD YYYY") : "not set";
    const dateToFormat = dateTo ? format(dateTo, "MMMM DD YYYY") : "not set";

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

  updateEventAttendees = async () => {
    const { router } = this.props;
    const { tokenCtx, id } = this.context;
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const userID = id || localStorage.getItem("id");
    const attendees = await axios({
      method: "get",
      url: `${backendUrl}/events/${router.query.id}/attendees`,
      headers: { Authorization: AuthStr }
    });
    const userIsAttending = getAttendance(userID, attendees.data);
    this.setState({ userIsAttending, eventAttendees: attendees.data });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  deleteEvent = () => {
    const { router } = this.props;
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    axios({
      method: "delete",
      url: `${backendUrl}/events/${router.query.id}`,
      headers: { Authorization: AuthStr }
    })
      .then(() => {
        router.push("/events");
      })
      .catch(error => console.error(error.response));
  };

  joinEvent = () => {
    const { router } = this.props;
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    axios({
      method: "post",
      url: `${backendUrl}/events/${router.query.id}/attend`,
      headers: { Authorization: AuthStr }
    })
      .then(() => {
        this.updateEventAttendees();
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
      url: `${backendUrl}/events/${router.query.id}/attend`,
      headers: { Authorization: AuthStr }
    })
      .then(() => {
        this.updateEventAttendees();
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

    // const eventTotalAttendees = eventAttendees.length;
    const spotsLeft = maxPeople - eventAttendees.length;

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
                    {city ? (
                      <SubTitle>
                        {city}, {country}
                      </SubTitle>
                    ) : (
                      <SubTitle>not set</SubTitle>
                    )}
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
                <AvailableSpotsLeftNotice spotsLeft={spotsLeft} maxPeople={maxPeople} />
                <ControlledAttendenceButtons
                  userID={userID}
                  authorID={authorID}
                  userIsAttending={userIsAttending}
                  leaveEvent={this.leaveEvent}
                  joinEvent={this.joinEvent}
                  eventIsFull={spotsLeft === 0}
                />
              </JoinPanel>
              <ControlButtons>
                <BackButton onClick={() => router.push("/events")}>Back</BackButton>
                {Number(userID) === Number(authorID) && <DeleteButton onClick={this.showModal}>Delete</DeleteButton>}
              </ControlButtons>
              <Modal showModal={this.state.showModal} hide={this.hideModal} confirm={this.deleteEvent} />
            </EventCard>
          ) : (
            <p>Fetching Event Details...</p>
          )}
        </Container>
      </MainLayout>
    );
  }
}

function AvailableSpotsLeftNotice({ spotsLeft, maxPeople }) {
  if (maxPeople === null) {
    return null;
  }
  if (spotsLeft === 0) {
    return <h4>Event is full</h4>;
  }
  return <h4>{spotsLeft} spot(s) left</h4>;
}

function ControlledAttendenceButtons({ userID, authorID, userIsAttending, leaveEvent, joinEvent, eventIsFull }) {
  const userIsOwner = Number(userID) === Number(authorID);
  if (userIsOwner) {
    return null;
  }
  if (eventIsFull && !userIsAttending) {
    return null;
  }
  if (userIsAttending) {
    return <LeaveButton onClick={leaveEvent}>Leave</LeaveButton>;
  }
  if (!userIsAttending) {
    return <JoinButton onClick={joinEvent}>Join</JoinButton>;
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
  margin-top: 50px;
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

AvailableSpotsLeftNotice.propTypes = {
  spotsLeft: PropTypes.number.isRequired,
  maxPeople: PropTypes.string
};

export default withRouter(event);
