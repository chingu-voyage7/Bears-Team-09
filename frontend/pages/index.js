import React from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";
import UserProvider from "../components/UserProvider";

export default () => (
  <UserProvider>
    <MainLayout>
      <LandingPage>
        <HeroSection>
          <CallToAction>
            <h4>Description of what this app does and how it works</h4>
            <p>call to action text</p>
            <a href="/events">Explore</a>
          </CallToAction>
          <HeroImg src=".././static/hero-big.jpg" alt="hero-img-river" />
        </HeroSection>
      </LandingPage>
    </MainLayout>
  </UserProvider>
);

const LandingPage = styled.section`
  width: 100%;
  overflow: hidden;
`;

const HeroSection = styled.div`
  width: 100%;
  position: relative;
  background: black;
`;

const HeroImg = styled.img`
  width: 100%;
`;
const CallToAction = styled.div`
  background: #362be252;
  color: white;
  padding: 10px;
  font-size: 1.3rem;
  width: 34%;
  text-align: left;
  height: 200px;
  position: absolute;
  z-index: 0;
  right: 30px;
  top: 90px;
  -ms-transform-origin: 100% 0%;
  -webkit-transform-origin: 100% 0%;
  transform-origin: 100% 0%;
  -webkit-animation: roll-out 1.2s ease-out;
  -moz-animation: roll-out 1.2s ease-out;
  animation: roll-out 1.2s ease-out;

  a {
    color: white;
    border: 2px solid white;
    padding: 5px;
    cursor: pointer;
  }
`;
