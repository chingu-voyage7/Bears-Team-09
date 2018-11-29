import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

class Navbar extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    //logout
  }

  render() {
    return (
      <StyledNav>
        <ul>
          <li className="home">
            <Link href="/">
              <NavLink>Home</NavLink>
            </Link>
          </li>
          <li className="events">
            <Link href="/events">
              <NavLink>Events</NavLink>
            </Link>
          </li>
          <li className="profile">
            <Link href="/protected">
              <NavLink>Profile</NavLink>
            </Link>
          </li>
          <Logo>
            <p>[Logo]</p>
          </Logo>
          <li>
            <UnAuthSection>
              <Link href="/login">
                <LoginBtn className="login-btn">Login</LoginBtn>
              </Link>

              <Link href="/register">
                <RegisterBtn className="register-btn">Register</RegisterBtn>
              </Link>
            </UnAuthSection>
          </li>
          <li>
            <AuthSection>
              <span className="avatar" aria-label="person-emoji" role="img">
                🙎
              </span>
              <a onClick={this.handleLogout}>Logout</a>
            </AuthSection>
          </li>
        </ul>
      </StyledNav>
    );
  }
}

export default Navbar;

const RegisterBtn = styled.a`
  border: 2px solid white;
  padding: 2px;
  border-radius: 3px;
  background: white;
  color: #6071ec;
`;

const LoginBtn = styled.a`
  border: 2px solid white;
  padding: 2px;
  border-radius: 3px;
`;

const NavLink = styled.a`
  color: inherit;
  &:hover {
    color: gold;
  }
`;

const StyledNav = styled.nav`
  background: #6071ec;
  color: white;

  ul {
    list-style-type: none;
    padding: 3px;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
  }

  a {
    margin-left: 5px;
    cursor: pointer;
    transition: all 300ms ease-out;
    text-decoration: none;
  }
`;

const Logo = styled.li`
  margin-left: auto;
  margin-right: auto;
`;

const UnAuthSection = styled.div`
  margin-right: 10px;
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1px;
  background: #b74e3a45;
  margin-left: 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-right: 10px;

  span {
    font-size: 1.7rem;
  }
`;
        {/*
    <AuthContext.Consumer>
      {({ userAuth, login, logout }) => (
        <>
          <div>Auth State:{userAuth ? "Logged In" : "Logged out"} </div>
          {userAuth ? (
            <button onClick={logout}>Turn Off</button>
          ) : (
            <button onClick={login}>Turn On</button>
          )}
        </>
      )}
    </AuthContext.Consumer>
    */}