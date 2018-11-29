import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import Footer from "./Footer";

const MainLayout = props => {
  const { children } = props;
  return (
    <div>
      {children}
      <Footer />
      <GlobalStyle />
    </div>
);};

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

