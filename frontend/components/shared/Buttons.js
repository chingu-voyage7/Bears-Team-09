import styled from "styled-components";

const backgrounds = {
  neutral: "hsla(212, 60%, 29%, 0.8)",
  purple: "#3d0e98",
  red: "#c20d0d"
};

const colors = {
  neutral: "hsla(212, 5%, 95%, 1)"
};

export const ColoredButton = styled.button`
  margin: 0.5rem auto;
  display: block;
  padding: 0.5rem;
  background: ${props => backgrounds[props.color]};
  color: ${props => colors[props.color]};
  border: none;
  cursor: pointer;
  border-radius: 0.2rem;
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
  background: ${props => props.color ? backgrounds[props.color] : backgrounds["purple"]};
  width: 100%;
`;
