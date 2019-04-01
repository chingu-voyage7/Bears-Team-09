import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import RegisterForm from "../components/RegisterForm";
import MainLayout from "../components/MainLayout";
import { UserConsumer } from "../components/UserProvider";
import device from "../styles/device";

class Register extends Component {
  render() {
    return (
      <MainLayout>
        <RegisterWrapper>
          <InputSection>
            <Title>Register</Title>
            <LinkWrapper>
              <p>If you have an account:&nbsp; </p>
              <Link href="/register">
                <StyledLink>log in!</StyledLink>
              </Link>
            </LinkWrapper>
            <UserConsumer>{context => <RegisterForm context={context} />}</UserConsumer>
          </InputSection>
        </RegisterWrapper>
      </MainLayout>
    );
  }
}

export default Register;

const RegisterWrapper = styled.div`
  background: #fafafa;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${device.mobileL`
    padding-top: 10px;
    padding-bottom: 10px;
  `}
`;

const InputSection = styled.div`
  background: #fff;
  padding: 20px;
  border: 1px solid #00000021;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${device.mobileL`
    padding: 10px;
    width 90vw;
    height: 80vh;
  `}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-top: 0;
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
