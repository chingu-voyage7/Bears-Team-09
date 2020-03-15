import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
// import PropTypes from "prop-types";
import Input from "./Input";
import LoginButton from "./LoginButton";
import StyledErrorMsg from "../styles/StyledErrorMsg";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    // Handle Success register state -> redirect
    axios
      .post(
        `${backendUrl}/auth/login`,
        {
          email,
          password
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(res => {
        Cookies.set("token", res.data.token);
        // router.push("/");
        // props.context.logIn({ data: res.data, method: "password" });
      })
      .catch(err => {
        console.error(err.response);
        setLoginFailed(true);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <LoginButton text="Log in" />
        {loginFailed && <StyledErrorMsg>Log in failed!</StyledErrorMsg>}
      </form>
      <button type="button" onClick={() => router.push(`${backendUrl}/auth/google`)}>
        Log in with Google
      </button>
      <button type="button" onClick={() => router.push(`${backendUrl}/auth/view`)}>
        View cookies
      </button>
    </>
  );
};

// LoginForm.propTypes = {
//   context: PropTypes.object
// };
