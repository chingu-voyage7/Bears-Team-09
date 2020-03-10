import React, { Component } from "react";
import Profile from "../components/Profile";
import { UserConsumer } from "../components/UserProvider";
import MainLayout from "../components/MainLayout";

class ProfilePage extends Component {
  render() {
    return (
      <MainLayout>
        <div>
          <UserConsumer>
            {context => <Profile context={context} />}
          </UserConsumer>
        </div>
      </MainLayout>
    );
  }
}

export default ProfilePage;
