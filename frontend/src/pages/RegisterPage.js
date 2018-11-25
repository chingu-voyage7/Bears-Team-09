import React, { Component } from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/RegisterForm';

class LoginPage extends Component {
  render() {
    return (
      <LoginWrapper>
        <InputSection>
          <Title>Register</Title>
          <p>If you already have account: [log in!]</p>
          <RegisterForm />
        </InputSection>
      </LoginWrapper>
    );
  }
}

export default LoginPage;

const LoginWrapper = styled.div`
  background: #fafafa;
  height: 100vh;
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

const Title = styled.h1`
  font-size: 2.5rem;
`;
