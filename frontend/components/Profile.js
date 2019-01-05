import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import { UserContext } from "./UserProvider";

class Profile extends Component {
  static backendUrl = "http://localhost:8000";

  state = { events: [] };

  async componentDidMount() {
    // Have to get token from localStorage on page reload b/c context is empty
    const token = this.context.token || localStorage.getItem("token");
    const events = await this.getEventsFromBackend(token);
    this.setState({ events });
  }

  async getEventsFromBackend(token) {
    if (token == null) return [];
    return (await axios.get(`${Profile.backendUrl}/events`, {
      headers: { Authorization: `Bearer ${token}` }
    })).data.events;
  }

  makeEventsDomElements = events => events.map(event => <div key={event.id}>{event.name}</div>);

  render() {
    const { firstName, lastName, loggedIn, email } = this.props.context;
    const events = this.makeEventsDomElements(this.state.events);

    const imageSrc =
      this.props.context.image !== "null" && this.props.context.image !== null
        ? this.props.context.image
        : "../static/no_photo.jpg";

    return (
      <Container>
        {loggedIn ? (
          <GridWrapper>
            <ProfileImage src={imageSrc} />
            <ImageUploader style={{ gridColumn: "1 / span 1", gridRow: "2 / span 1" }} />

            <div style={{ gridColumn: "2 / span 1", gridRow: "1 / span 2" }}>
              <h2>
                {firstName} {lastName}
              </h2>
              Email: {email}
              <h4>My events</h4>
              {events}
            </div>
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
    token: PropTypes.string
  }).isRequired
};

export default Profile;

const Container = styled.div`
  margin: auto;
  width: 70%;
  padding: 3%;
  border: 1px solid grey;
`;

const ProfileImage = styled.img`
  margin: 1%;
  width: 10vw;
  height: auto;
  grid-column: 1 / span 1;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
