import React, { Component } from "react";
import PropTypes from "prop-types";

const UserContext = React.createContext();
class UserProvider extends Component {
  state = {
    loggedIn: false,
    firstName: null,
    lastName: null,
    email: null,
    token: null,
    bio: null,
    id: null,
    image: null
  };

  componentDidMount() {
    this.setState({
      loggedIn: localStorage.getItem("loggedIn") === "true",
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token"),
      bio: localStorage.getItem("bio"),
      image: localStorage.getItem("image"),
      id: localStorage.getItem("id")
    });
  }

  logIn = ({ data, method }) => {
    if (!["oauth", "password"].includes(method)) throw new Error("Auth method not recognized");
    const allowedFields = ["first_name", "last_name", "email", "token", "bio", "image", "id"];

    const newState = { loggedIn: true };
    Object.entries(data).forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        if (key === "first_name") newState["firstName"] = value;
        else if (key === "last_name") newState["lastName"] = value;
        else newState[key] = value;
      }
    });
    this.setState(newState);
    console.log(`Logged in as ${this.state.firstName} ${this.state.lastName}`);
    Object.entries(this.state).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
      firstName: null,
      lastName: null,
      email: null,
      token: null,
      image: null,
      id: null
    });
    localStorage.clear();
  };

  updateUser = (key, value) => {
    const allowedFields = ["firstName", "lastName", "email", "token", "bio", "image"];
    if (!allowedFields.includes(key)) return;
    this.setState({ [key]: value });
    localStorage.setItem(key, value);
  };

  updateImage = newImage => {
    this.setState({ image: newImage });
    localStorage.setItem("image", newImage);
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logIn: this.logIn,
          logOut: this.logOut,
          updateUser: this.updateUser,
          updateImage: this.updateImage
        }}
      >
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
export { UserConsumer, UserContext };
