import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/dist/lib/router";
import axios from "axios";
import PropTypes from "prop-types";
import Input from "./Input";
import LoginButton from "./LoginButton";
import GoogleRegisterButton from "./GoogleRegisterButton";
import StyledErrorMsg from "../styles/StyledErrorMsg";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    loginFailed: false
  };

  handleGoogleAuth = data => {
    const accessToken = data.accessToken.replace(/['"]+/g, "");
    axios
      .get(`${backendUrl}/auth/google?access_token=${accessToken}`)
      .then(res => this.props.context.logIn({ data: res.data, method: "oauth" }))
      .catch(console.log);
    Router.push("/");
  };

  handleSubmit = e => {
    e.preventDefault();

    // Handle Success register state -> redirect
    axios
      .post(`${backendUrl}/auth/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        Router.push("/");
        this.props.context.logIn({ data: res.data, method: "password" });
      })
      .catch(err => {
        console.error(err);
        this.handleFail();
      });
  };

  handleFail = () => this.setState({ loginFailed: true });

  // Method that syncs current input with state
  handleInput = e => {
    const { name, value } = e.target;
    const inputValue = { ...this.state, [name]: value };
    this.setState(inputValue);
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Input id="email" name="email" type="email" placeholder="Email" handleChange={this.handleInput} required />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            handleChange={this.handleInput}
            required
          />
          <LoginButton title="Log in" />
          {this.state.loginFailed && <StyledErrorMsg>Log in failed!</StyledErrorMsg>}
        </form>
        <AuthButtonWrapper>
          <h4>Or use alternatives:</h4>
          <GoogleRegisterButton
            theme="#ea4335"
            title="Log in using Google"
            onCompletion={this.handleGoogleAuth}
            onFailure={console.error}
          />
        </AuthButtonWrapper>
      </>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  context: PropTypes.object
};

const AuthButtonWrapper = styled.div`
  display: grid;
  border-top: 1px solid rgba(73, 73, 128, 0.52);
  margin-top: 20px;

  h4 {
    margin-bottom: 5px;
  }
`;
