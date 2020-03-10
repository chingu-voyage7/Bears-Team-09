import styled from "styled-components";
import device from "../../styles/device";

const backgrounds = {
  neutral: {
    normal: "hsla(212, 60%, 29%, 0.8)",
    hover: "hsla(212, 60%, 29%, 1)"
  },
  purple: {
    normal: "hsla(252, 77%, 20%, 0.75)",
    hover: "hsla(252, 77%, 20%, 0.8)"
  },
  red: { normal: "hsla(0, 93%, 50%, 0.8)", hover: "hsla(0, 93%, 50%, 1)" },
  gray: {
    normal: "hsla(260, 16%, 100%, 0.8)",
    hover: "hsla(260, 16%, 100%, 1)"
  },
  inherit: { normal: "inherit", hover: "inherit" }
};

const colors = {
  neutral: "hsla(212, 5%, 95%, 1)"
};

export const ColoredButton = styled.button`
  min-width: 5rem;
  margin: 0.5rem auto;
  display: block;
  padding: 10px;
  background: ${props =>
    props.color ? backgrounds[props.color].normal : backgrounds.neutral.normal};
  color: ${props => colors[props.color]};
  border: none;
  cursor: pointer;
  border-radius: 0.2rem;
  font-size: 1rem;

  &:hover {
    background: ${props =>
      props.color ? backgrounds[props.color].hover : backgrounds.neutral.hover};
  }

  ${device.mobileL`
    padding: 1px;
    margin-top: 1px;
    margin-bottom: 5px;
  `}
`;

export const PositiveButton = styled.button`
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

export const WideButton = styled.button`
  border: 0;
  padding: 10px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 2px;
  color: white;
  font-size: 1rem;
  background: ${props =>
    props.color ? backgrounds[props.color].normal : backgrounds.purple.normal};
  width: 100%;
  &:hover {
    background: ${props =>
      props.color ? backgrounds[props.color].hover : backgrounds.neutral.hover};
  }
`;
