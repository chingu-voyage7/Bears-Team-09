import React from "react";
import styled from "styled-components";

const Footer = () => (
  <StyledFooter>
    <p>
      Project developed as part of Chingu Voyage 7 cohort, by&nbsp;
      <a href="https://github.com/nealthom" rel="noreferrer noopener" target="_blank">
        @nealthom&nbsp;
      </a>
      <a href="https://github.com/lkaratun" rel="noreferrer noopener" target="_blank">
        @lkaratun&nbsp;
      </a>
      <a href="https://github.com/trolleksii" rel="noreferrer noopener" target="_blank">
        @trolleksii&nbsp;
      </a>
      and&nbsp;
      <a href="https://github.com/vaidotasp" rel="noreferrer noopener" target="_blank">
        @vaidotasp&nbsp;
      </a>
    </p>
    <div>
      <a rel="noreferrer noopener" target="_blank" href="https://github.com/chingu-voyage7/Bears-Team-09">
        <p> Source Code</p>
      </a>
    </div>
  </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
  color: white;
  background: black;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;

  p {
    margin: 5px;
    font-size: 0.7rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    background-color: white;
    width: 20px;
    border: 1px solid white;
    border-radius: 20px;
  }
`;
