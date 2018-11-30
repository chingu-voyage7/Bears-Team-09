import React, { Component } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext();
class UserProvider extends Component {
  state = {
    user: 'guest',
    userAuth: true
  };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  login() {
    this.setState({ userAuth: true });
  }

  logout() {
    this.setState({ userAuth: false });
  }

  updateUser(newName) {
    this.setState({ user: newName });
  }

  render() {
    const { user, userAuth } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          user,
          userAuth
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/* then make a consumer which will surface it */
const UserConsumer = UserContext.Consumer;
export default UserProvider;
export { UserConsumer };
