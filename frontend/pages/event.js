import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

export class event extends Component {
  state = {
    date: 'Tuesday, December 4, 2018',
    title: 'Campus Open House + Q&A',
    img: 'http://www.highpoint.edu/media/home/Tree-Campus-USA-2.jpg'
  };

  componentDidMount() {
    const { router } = this.props;
    console.log(router);
    this.setState({ id: router.query.id });
  }

  render() {
    const { id, date, title, img } = this.state;

    const theme = { background: `center / cover no-repeat url(${img})` };
    return (
      <Header>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Host>Hosted by: {id}</Host>
        <ThemeProvider theme={theme}>
          <Img />
        </ThemeProvider>
      </Header>
    );
  }
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;
const Date = styled.div`
  color: grey;
`;
const Host = styled.div`
  color: grey;
`;
const Title = styled.div`
  font-size: 2em;
`;
const Img = styled.div`
  background: ${props => props.theme.background};
  width: 50%;
  height: 500px;
`;

event.propTypes = {
  router: PropTypes.element.isRequired
};

export default withRouter(event);
