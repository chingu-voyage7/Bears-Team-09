import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = props => {
  const { children } = props;
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <GlobalStyle />
      <FlexContainer>
        <ContentWrapper>
          <Navbar />
          {children}
        </ContentWrapper>
        <Footer />
      </FlexContainer>
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height:100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'] {
    box-sizing: border-box;
  }
`;

/* Wrapper for sticky footer */
const ContentWrapper = styled.div`
  flex: 1 0 auto;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
