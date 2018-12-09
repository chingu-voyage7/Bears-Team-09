import React from "react";
import App, { Container } from "next/app";
import UserProvider from "../components/UserProvider";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <UserProvider>
        <Component {...pageProps} />
        </UserProvider>
      </Container>
    );
  }
}

export default MyApp;
