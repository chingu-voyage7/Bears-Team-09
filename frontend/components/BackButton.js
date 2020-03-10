import React from "react";
import PropTypes from "prop-types";
import { WideButton } from "./shared/Buttons";

const BackButton = props => {
  const { text } = props;
  return (
    <WideButton {...props} color="red">
      {text || "Back"}
    </WideButton>
  );
};

BackButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default BackButton;
