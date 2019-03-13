import React from "react";
import PropTypes from "prop-types";
import { WideButton } from "./shared/Buttons";

const LoginButton = props => {
  const { title } = props;
  return (
    <WideButton color="purple" type="submit">
      {title}
    </WideButton>
  );
};

LoginButton.propTypes = {
  title: PropTypes.string.isRequired
};

export default LoginButton;
