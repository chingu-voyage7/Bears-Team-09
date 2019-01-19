import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { UserConsumer } from "./UserProvider";

class Navbar extends React.Component {
  render() {
    return (
      <StyledNav>
        <ul>
          <li>
            <Link href="/">
              <LogoWrapper>
                <Logo src=".././static/logo.svg" alt="logo" />
              </LogoWrapper>
            </Link>
          </li>
          <li>
            <Link href="/events">
              <NavLink>Events</NavLink>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <NavLink>Profile</NavLink>
            </Link>
          </li>
          <UserConsumer>
            {({ loggedIn, logOut }) =>
              loggedIn ? (
                <NavAuthBtns>
                  <AuthSection>
                    <LogoutBtn onClick={logOut} type="button">
                      Logout
                    </LogoutBtn>
                  </AuthSection>
                </NavAuthBtns>
              ) : (
                <NavAuthBtnsLoggedIn>
                  <UnAuthSection>
                    <Link href="/login">
                      <LoginBtn>Login</LoginBtn>
                    </Link>
                    <Link href="/register">
                      <RegisterBtn>Register</RegisterBtn>
                    </Link>
                  </UnAuthSection>
                </NavAuthBtnsLoggedIn>
              )
            }
          </UserConsumer>
        </ul>
      </StyledNav>
    );
  }
}

export default Navbar;

const Logo = styled.img`
  width: 100px;
`;

const RegisterBtn = styled.a`
  border: 2px solid white;
  padding: 2px;
  border-radius: 3px;
  background: white;
  color: #6071ec;
  margin-left: 10px;
`;

const NavAuthBtns = styled.li`
  margin-left: auto;
`;

const NavAuthBtnsLoggedIn = styled.li`
  margin-left: auto;
`;

const LoginBtn = styled.a`
  border: 2px solid white;
  padding: 2px;
  border-radius: 3px;
`;

const LogoutBtn = styled.a`
  border: 1px solid white;
  padding: 3px;
  border-radius: 1px;
  font-size: 1rem;
`;

const NavLink = styled.a`
  color: inherit;
  margin-left: 20px;
  &:hover {
    color: gold;
  }
`;

const StyledNav = styled.nav`
  background: rgb(22, 67, 75);
  background: linear-gradient(90deg, rgba(22, 67, 75, 1) 0%, rgba(28, 12, 91, 1) 100%);
  color: white;
  padding: 8px;

  ul {
    list-style-type: none;
    padding: 3px;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
  }

  a {
    cursor: pointer;
    transition: all 300ms ease-out;
    text-decoration: none;
  }
`;

const LogoWrapper = styled.div`
  margin-left: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

const UnAuthSection = styled.div`
  margin-right: 10px;
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1px;
  margin-left: 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-right: 10px;

  span {
    font-size: 1.7rem;
  }

  button {
    margin-left: 10px;
    color: white;
    border: 1px solid white;
    border-radius: 0;
    background: inherit;
    cursor: pointer;
  }
`;
