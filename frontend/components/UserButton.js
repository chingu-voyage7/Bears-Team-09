import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./UserButton.css";
import { AuthContext } from "./AuthContext";

class UserButton extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {context =>
          context.loggedIn ? (
            <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={context.logOut}
              onFailure={console.error}
              render={renderProps => (
                <img
                  src="/person.svg"
                  title="Log out"
                  alt="User icon"
                  onKeyDown={renderProps.onClick}
                  onClick={renderProps.onClick}
                />
              )}
            />
          ) : (
            <GoogleLogin
              clientId="21137127004-b47734i7g9hptsga32ai7o9ktedtv0m1.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={context.logIn}
              onFailure={console.error}
              render={renderProps => (
                <img src="/person.svg" title="Log in" alt="User icon" onClick={renderProps.onClick} />
              )}
            />
          )
        }
      </AuthContext.Consumer>
    );
  }
}

export default UserButton;
