import React, { Component } from "react";
import Router from "next/router";
import axios from "axios";
import PropTypes from "prop-types";
import Input from "./Input";
import TextArea from "./TextArea";
import LoginButton from "./LoginButton";
import GoogleRegisterButton from "./GoogleRegisterButton";
import StyledErrorMsg from "../styles/StyledErrorMsg";
import config from "../config.json";
import { AuthButtonWrapper } from "./shared/Wrappers";

const backendUrl = config.BACKEND_URL;

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    bio: "",
    password: "",
    email: "",
    passwordsDontMatch: false,
    registrationFailed: false
  };

  handleSubmit = async e => {
    e.preventDefault();

    // Handle Success register state -> redirect
    axios
      .post(
        `${backendUrl}/auth/register`,
        {
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          bio: this.state.bio
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(res => {
        this.props.context.logIn({ data: res.data, method: "password" });
        this.handleAuth(null, "email/password");
      })
      .catch(err => {
        console.error(err.response);
        this.handleFail();
      });
  };

  handleFail = () => this.setState({ registrationFailed: true });

  handleAuth = () => {
    Router.push("/");
  };

  handleInput = e => {
    // Method that syncs current input with state
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  };

  render() {
    const { registrationFailed } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="Email"
            onChange={this.handleInput}
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            onChange={this.handleInput}
            required
          />
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={this.handleInput}
            required
          />
          <p> Optional fields:</p>
          <Input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={this.handleInput} />
          <TextArea placeholder="Short Bio" onChange={this.handleInput} />
          <LoginButton title="Register" />
          {registrationFailed && <StyledErrorMsg>Registration failed!</StyledErrorMsg>}
        </form>
        <AuthButtonWrapper>
          <GoogleRegisterButton
            theme="#ea4335"
            title="Register with Google"
            onCompletion={this.handleAuth}
            onFailure={this.handleFail}
          />
        </AuthButtonWrapper>
      </>
    );
  }
}

export default RegisterForm;

RegisterForm.propTypes = {
  context: PropTypes.object
};
