import React from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";

export default () => (
  <MainLayout>
    <LandingPage>
      <HeroSection>
        <CallToAction>
          <h4>Experiences are to be enjoyed with others</h4>
          <p>Find people to do things together</p>
          <EventsBtn href="/events">Events</EventsBtn>
        </CallToAction>
        <HeroImg src=".././static/hero-big.jpg" alt="hero-img-river" />
      </HeroSection>
    </LandingPage>
  </MainLayout>
);

const LandingPage = styled.section`
  width: 100%;
  overflow: hidden;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  background: black;
`;

const HeroImg = styled.img`
  width: 100%;
  background-size: 100% 100%;
`;
const CallToAction = styled.div`
  border-radius: 5px;
  margin-top: 160px;
  background: #191658c2;
  color: white;
  padding: 50px;
  font-size: 1.3rem;
  text-align: center;
  position: absolute;
  z-index: 0;
  -ms-transform-origin: 100% 0%;
  -webkit-transform-origin: 100% 0%;
  transform-origin: 100% 0%;

  p {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  h4 {
    margin: 0;
  }
`;

const EventsBtn = styled.a`
  color: white;
  border: 2px solid white;
  padding: 5px;
  cursor: pointer;

  &:hover {
    border: 2px solid salmon;
  }
`;
