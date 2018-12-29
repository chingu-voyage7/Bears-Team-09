import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class Profile extends Component {
  componentDidMount() {
    // Request email and location from backend
  }

  render() {
    const { firstName, lastName, loggedIn, email } = this.props.context;
    console.log(this.props.context);
    return (
      <Container>
        {loggedIn ? (
          <>
            <ProfileImage src="../static/no_photo.jpg" />
            <h3>
              {firstName} {lastName}
            </h3>
            Email: {email}
          </>
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
    loggedIn: PropTypes.bool
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
  float: left;
`;
