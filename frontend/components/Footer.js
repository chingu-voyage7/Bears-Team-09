import React from "react";
import styled from "styled-components";
import device from "../styles/device";

const Footer = () => (
  <StyledFooter>
    <p>
      Project developed as part of Chingu Voyage 7 cohort, by&nbsp;
      <a
        href="https://github.com/lkaratun"
        rel="noreferrer noopener"
        target="_blank"
      >
        @lkaratun&nbsp;
      </a>
      <a
        href="https://github.com/trolleksii"
        rel="noreferrer noopener"
        target="_blank"
      >
        @trolleksii&nbsp;
      </a>
      and&nbsp;
      <a
        href="https://github.com/vaidotasp"
        rel="noreferrer noopener"
        target="_blank"
      >
        @vaidotasp&nbsp;
      </a>
    </p>
    <div>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/chingu-voyage7/Bears-Team-09"
      >
        <img src="./static/gh-logo-32.png" alt="github-logo" className="icon" />{" "}
        Source code
      </a>
    </div>
  </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
  box-sizing: border-box;
  height: 5rem;
  color: white;
  background: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;
  font-size: 0.7rem;

  ${device.mobileL`
    padding: 5px;
  `}

  p {
    margin: 5px;

    ${device.mobileL`
      font-size: 0.5rem;
    `}
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .icon {
    position: relative;
    width: 1.5em;
    top: 0.5em;
    margin: 0 0.1em;
    background-color: white;
    border: 1px solid white;
    border-radius: 20px;
    ${device.mobileL`
      width: 15px;
    `};
  }

  div {
    margin-top: 5px;
  }
`;
