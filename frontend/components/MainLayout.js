import React from 'react';
import { createGlobalStyle } from 'styled-components';

const MainLayout = props => (
  <div>
    {props.children}
    <GlobalStyle />
  </div>
);

export default MainLayout;

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