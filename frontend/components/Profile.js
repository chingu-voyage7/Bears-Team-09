import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import { UserContext } from "./UserProvider";
import Event from "./Event";
import Modal from "./EditModal";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

class Profile extends Component {
  state = { events: [], showModal: false };

  async componentDidMount() {
    // Have to get token from localStorage on page reload b/c context is empty
    this.token = this.context.token || localStorage.getItem("token");
    const events = await this.getEventsFromBackend();
    this.setState({ events });
  }

  async getEventsFromBackend() {
    if (this.token == null) return [];
    try {
      return (await axios
        .get(`${backendUrl}/users/events`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        .catch(res => console.error(res.response))).data.events;
    } catch (err) {
      return [];
    }
  }

  // makeEventsDomElements = events => events.map(event => <div key={event.id}>{event.name}</div>);
  makeEventsDomElements = events => events.map(event => <Event {...event} key={event.id} />);

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  setBio = text => {
    axios
      .put(
        `${backendUrl}/users`,
        { bio: text },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      )
      .catch(err => console.error(err.response));
    this.props.context.updateUser("bio", text);
  };

  render() {
    const { firstName, lastName, loggedIn, email, bio } = this.props.context;
    const events = this.makeEventsDomElements(this.state.events);

    const imageSrc =
      this.props.context.image !== "null" && this.props.context.image !== null
        ? this.props.context.image
        : "../static/no_photo.jpg";

    return (
      <Container>
        {loggedIn ? (
          <GridWrapper>
            <SideBar>
              <ProfileImage src={imageSrc} />
              <ImageUploader style={{ gridColumn: "1 / span 1", gridRow: "2 / span 1" }} />
              <PersonalInfo>
                <h1>
                  {firstName} {lastName}
                </h1>
                <strong> Email:</strong> {email}
                <br />
                <br />
                {bio !== null && bio !== "null" && bio !== "" ? (
                  <p>
                    <strong>Bio</strong> <EditButton onClick={this.showModal}>(edit)</EditButton>
                    <br /> {bio}
                  </p>
                ) : (
                  <p>No bio</p>
                )}
                <Modal showModal={this.state.showModal} hide={this.hideModal} confirm={this.setBio} />
              </PersonalInfo>
            </SideBar>

            <MainContent>
              <div style={{ gridColumn: "2 / span 1", gridRow: "1 / span 2" }}>
                <h2 style={{ marginTop: "0", marginBottom: "0" }}>My events</h2>
                {events}
              </div>
            </MainContent>
          </GridWrapper>
        ) : (
          "Please log in to view this page"
        )}
      </Container>
    );
  }
}

Profile.contextType = UserContext;

Profile.propTypes = {
  context: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    loggedIn: PropTypes.bool,
    image: PropTypes.string,
    token: PropTypes.string,
    bio: PropTypes.string
  }).isRequired
};

export default Profile;

const EditButton = styled.button.attrs({ type: "button" })`
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  color: navy;
  &:hover {
    text-decoration: underline;
  }
`;
const SideBar = styled.div`
  grid-column: 1 / span 1;
  margin: 2vw 0;
`;
const MainContent = styled.div`
  grid-column: 2 / span 1;
  margin: 2vw;
`;

const Container = styled.div`
  margin: auto;
  width: 70%;
  padding: 3%;
  border: 1px solid grey;
`;

const ProfileImage = styled.img`
  margin: 1%;
  width: 100%;
  height: auto;
`;

const PersonalInfo = styled.div`
  display: block;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 3%;
`;
