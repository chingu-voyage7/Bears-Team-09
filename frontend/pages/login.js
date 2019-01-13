import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import MainLayout from "../components/MainLayout";
import { UserConsumer } from "../components/UserProvider";

class LoginPage extends Component {
  render() {
    return (
      <MainLayout>
        <LoginWrapper>
          <InputSection>
            <Title>Log in</Title>
            <LinkWrapper>
              <p>If you have no account:&nbsp; </p>
              <Link href="/register">
                <StyledLink>register!</StyledLink>
              </Link>
            </LinkWrapper>
            <UserConsumer>{context => <LoginForm context={context} />}</UserConsumer>
          </InputSection>
        </LoginWrapper>
      </MainLayout>
    );
  }
}

export default LoginPage;

const LoginWrapper = styled.div`
  background: #fafafa;
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputSection = styled.div`
  background: #fff;
  padding: 20px;
  border: 1px solid #00000021;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const LinkWrapper = styled.div`
  display: inline-flex;
  margin-bottom: 10px;
  p {
    margin: 0;
    padding: 0;
  }
`;

const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: blue;
`;

const Title = styled.h1`
  font-size: 2.5rem;
`;
