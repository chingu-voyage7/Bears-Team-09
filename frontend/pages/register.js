import React, { Component } from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/RegisterForm';
import MainLayout from '../components/MainLayout';


class Register extends Component {
  render() {
    return (
      <MainLayout>
        <RegisterWrapper>
          <InputSection>
            <Title>Register</Title>
            <p>If you already have account: [log in!]</p>
            <RegisterForm />
          </InputSection>
        </RegisterWrapper>
      </MainLayout>
    );
  }
}

export default Register;

const RegisterWrapper = styled.div`
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

const Title = styled.h1`
  font-size: 2.5rem;
`;
