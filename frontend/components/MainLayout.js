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
        <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
        <title>PairUp: find people to do things together</title>
      </Head>
      <GlobalStyle />
      <FlexContainer>
        <Navbar />
        {children}
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
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,400i,600,600i,700,700i');
  
  html,
  body {
    height:100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'] {
    box-sizing: border-box;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
