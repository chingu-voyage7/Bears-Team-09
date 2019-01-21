import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { UserConsumer } from './UserProvider';
import device from '../styles/device';

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
          <Logo />
          <UserConsumer>
            {({ loggedIn, logOut }) =>
              loggedIn ? (
                <NavAuthBtns>
                  <AuthSection>
                    <Link href="/profile">
                      <NavLink>Profile</NavLink>
                    </Link>
                    <NavLink onClick={logOut}>Logout</NavLink>
                  </AuthSection>
                </NavAuthBtns>
              ) : (
                <NavAuthBtnsLoggedIn>
                  <UnAuthSection>
                    <Link href="/login">
                      <NavLink>Log in</NavLink>
                    </Link>
                    <Link href="/register">
                      <NavLink>Register</NavLink>
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

const StyledNav = styled.nav`
  background: rgb(22, 67, 75);
  background: linear-gradient(90deg, rgba(22, 67, 75, 1) 0%, rgba(28, 12, 91, 1) 100%);
  color: white;
  padding: 8px;

  ${device.mobileL`
    padding: 4px;
  `}

  ul {
    list-style-type: none;
    padding: 3px;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1.1rem;

    ${device.mobileL`
      font-size: 1rem;
    `}
  }

  a {
    cursor: pointer;
    transition: all 300ms ease-out;
    text-decoration: none;
  }
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  margin-right: 10px;
  margin-left: 15px;

  ${device.mobileL`
    margin-right: 10px;
    margin-left: 3px;
  `}
`;

const Logo = styled.img`
  width: 100px;
`;

const NavAuthBtns = styled.li`
  margin-left: auto;

  ${device.mobileL`
    font-size: 0.8rem;
  `}
`;

const NavAuthBtnsLoggedIn = styled.li`
  margin-left: auto;

  ${device.mobileL`
    font-size: 0.8rem;
  `}
`;

const NavLink = styled.a`
  color: inherit;
  margin-left: 20px;
  &:hover {
    color: gold;
  }

  ${device.mobileL`
    margin-left: 10px;
    margin-right: 10px;
  `}
`;

const UnAuthSection = styled.div`
  margin-right: 10px;
  font-size: 0.9rem;

  ${device.mobileL`
    margin-left: 5px;
    margin-right: 3px;
  `}
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
