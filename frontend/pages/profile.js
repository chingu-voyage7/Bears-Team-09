import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import { UserConsumer } from "../components/UserProvider";

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserConsumer>{context => <Profile context={context} />}</UserConsumer>
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
