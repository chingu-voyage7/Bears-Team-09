import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ImageUploader from "./ImageUploader";
import axios from "axios";

class Profile extends Component {
  async componentDidMount() {
    const backendUrl = "http://localhost:8000/";
    const events = await axios.get(`${backendUrl}`)
  }

  render() {
    const { firstName, lastName, loggedIn, email } = this.props.context;
    console.log(this.props.context);

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
              {/* {events} */}

            </div>
          </GridWrapper>
        ) : (
          "Please log in to view this page"
        )}
      </Container>
    );
  }
}

Profile.propTypes = {
  context: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    loggedIn: PropTypes.bool,
    image: PropTypes.string
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
