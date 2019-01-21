import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
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
      <Navbar />
      {children}
      <Footer />
      <GlobalStyle />
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
