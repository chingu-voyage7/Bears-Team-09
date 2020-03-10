import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import { UserContext } from "./UserProvider";
import Event from "./Event";
import BioModal from "./BioModal";
import NameModal from "./NameModal";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

class Profile extends Component {
  state = { events: [], bioEditorOpened: false, nameEditorOpened: false };

  async componentDidMount() {
    // Have to get token from localStorage on page reload b/c context is empty
    this.token = this.context.token || localStorage.getItem("token");
    const events = await this.getEventsFromBackend();
    this.setState({ events });
  }

  async getEventsFromBackend() {
    if (this.token == null) return [];
    try {
      return (
        await axios
          .get(`${backendUrl}/users/events`, {
            headers: { Authorization: `Bearer ${this.token}` }
          })
          .catch(res => console.error(res.response))
      ).data.events;
    } catch (err) {
      return [];
    }
  }

  makeEventsDomElements = events =>
    events.map(event => <Event {...event} key={event.id} />);

  showBioEditor = () => this.setState({ bioEditorOpened: true });

  hideBioEditor = () => this.setState({ bioEditorOpened: false });

  showNameEditor = () => this.setState({ nameEditorOpened: true });

  hideNameEditor = () => this.setState({ nameEditorOpened: false });

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

  setName = (firstName, lastName) => {
    axios
      .put(
        `${backendUrl}/users`,
        { first_name: firstName, last_name: lastName },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      )
      .catch(err => console.error(err.response));
    this.props.context.updateUser("firstName", firstName);
    this.props.context.updateUser("lastName", lastName);
  };

  updateImage = url => {
    this.props.context.updateUser("image", url);
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
              <ImageUploader
                url="/users/images"
                onCompletion={this.updateImage}
                style={{ gridColumn: "1 / span 1", gridRow: "2 / span 1" }}
              />
              <PersonalInfo>
                <FirstLastName>
                  {firstName} {lastName}
                </FirstLastName>
                <EditButton onClick={this.showNameEditor}>(edit)</EditButton>
                <br />
                <strong>Email</strong> <br />
                {email}
                <br />
                {bio !== null && bio !== "null" && bio !== "" ? (
                  <p>
                    <strong>Bio</strong>{" "}
                    <EditButton onClick={this.showBioEditor}>(edit)</EditButton>
                    <br /> {bio}
                  </p>
                ) : (
                  <p>
                    No bio{" "}
                    <EditButton onClick={this.showBioEditor}>(add)</EditButton>
                  </p>
                )}
                <BioModal
                  showModal={this.state.bioEditorOpened}
                  hide={this.hideBioEditor}
                  confirm={this.setBio}
                />
                <NameModal
                  showModal={this.state.nameEditorOpened}
                  hide={this.hideNameEditor}
                  confirm={this.setName}
                />
              </PersonalInfo>
            </SideBar>

            <MainContent>
              <>
                <h2 style={{ marginTop: "0", marginBottom: "0" }}>My events</h2>
                {events}
              </>
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
    bio: PropTypes.string,
    updateUser: PropTypes.func
  }).isRequired
};

export default Profile;

const FirstLastName = styled.h2`
  display: inline-block;
  margin-right: 0.2em;
`;

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
  grid-row: 1 / span 2;
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
