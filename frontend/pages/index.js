import React from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";

export default () => (
  <MainLayout>
    <LandingPage>
      <HeroSection>
        <CallToAction>
          <h3>Experiences are to be enjoyed with others</h3>
          <p>Find people to do things together</p>
          <EventsBtn href="/events">Events</EventsBtn>
        </CallToAction>
        <HeroPicture>
          <source media="(max-width: 450px)" srcSet=".././static/hero-mobile.jpg" />
          <source media="(max-width: 1600px)" srcSet=".././static/hero-base.jpg" />
          <img src=".././static/hero-base.jpg" alt="person-kayaking-in-river" width="inherit" />
        </HeroPicture>
      </HeroSection>
    </LandingPage>
  </MainLayout>
);

const LandingPage = styled.section`
  width: 100%;
  height: calc(100vh - 8rem);
  box-sizing: border-box;
  overflow: hidden;
  background: black;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  background: black;
`;

const HeroPicture = styled.picture`
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  text-align: center;

  img {
    width: 100%;
    object-fit: cover;
  }
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

  h3 {
    margin: 0;
    font-weight: 400;
  }
`;

const EventsBtn = styled.a`
  color: white;
  border: 2px solid white;
  padding: 5px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: gold;
  }
`;
