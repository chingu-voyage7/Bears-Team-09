import React, { Component } from "react";
import PropTypes from "prop-types";

const UserContext = React.createContext();
class UserProvider extends Component {
  state = {
    loggedIn: false,
    firstName: null,
    lastName: null,
    email: null
  };

  componentDidMount() {
    this.setState({
      loggedIn: localStorage.getItem("loggedIn") === "true",
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email")
    });
  }

  logIn = data => {
    console.log({ data });
    console.log(`Logged in as ${data.profileObj.givenName} ${data.profileObj.familyName}`);
    this.setState({ loggedIn: true, firstName: data.profileObj.givenName, lastName: data.profileObj.familyName });
    Object.entries(data.profileObj).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    localStorage.setItem("loggedIn", "true");
  };

  logOut = () => {
    this.setState({ loggedIn: false, firstName: null, lastName: null, email: null });
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
