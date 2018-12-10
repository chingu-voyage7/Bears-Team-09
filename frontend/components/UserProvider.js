import React, { Component } from "react";
import PropTypes from "prop-types";

const UserContext = React.createContext();
class UserProvider extends Component {
  state = {
    user: "guest",
    loggedIn: false,
    firstName: undefined,
    lastName: undefined
  };

  logIn = data => {
    console.log(`Logged in as ${data.profileObj.givenName} ${data.profileObj.familyName}`);
    this.setState({ loggedIn: true, firstName: data.profileObj.givenName, lastName: data.profileObj.familyName });
  };

  logOut = () => {
    this.setState({ loggedIn: false });
  };

  updateUser = newName => {
    this.setState({ user: newName });
  };

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, logIn: this.logIn, logOut: this.logOut }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/* then make a consumer which will surface it */
const UserConsumer = UserContext.Consumer;
export default UserProvider;
export { UserConsumer };
