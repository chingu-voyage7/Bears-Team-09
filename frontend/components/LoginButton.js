import React from "react";
import PropTypes from "prop-types";
import { WideButton } from "./shared/Buttons";

const LoginButton = props => {
  const { text } = props;
  return <WideButton {...props}>{text || "Log in"}</WideButton>;
};

LoginButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default LoginButton;
