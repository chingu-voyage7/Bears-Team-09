import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

export class event extends Component {
  state = {
    event: {
      id: '',
      name: '',
      date: '',
      title: '',
      img: ''
    }
  };

  componentDidMount() {
    const testData = [
      {
        name: 'Bike Academy',
        date: 'Tuesday, December 4, 2018',
        title: 'Bike Race Across America',
        img:
          'https://3.bp.blogspot.com/-ut3A91d91wM/VKX-mrfUSyI/AAAAAAAC6S8/hNweMslPA8o/s1600/Talking%2Brace.jpg'
      },
      {
        name: 'The Best Coding School of the World',
        date: 'Tuesday, December 4, 2018',
        title: 'Campus Open House + Q&A',
        img: 'http://www.highpoint.edu/media/home/Tree-Campus-USA-2.jpg'
      },
      {
        name: 'The Best Coding School of the World',
        date: 'Tuesday, December 4, 2018',
        title: 'Campus Open House + Q&A',
        img: 'http://www.highpoint.edu/media/home/Tree-Campus-USA-2.jpg'
      },
      {
        name: 'The Best Coding School of the World',
        date: 'Tuesday, December 4, 2018',
        title: 'Campus Open House + Q&A',
        img: 'http://www.highpoint.edu/media/home/Tree-Campus-USA-2.jpg'
      },
      {
        name: 'The Best Coding School of the World',
        date: 'Tuesday, December 4, 2018',
        title: 'Campus Open House + Q&A',
        img: 'http://www.highpoint.edu/media/home/Tree-Campus-USA-2.jpg'
      }
    ];

    const { router } = this.props;
    const { name, date, title, img } = testData[router.query.id - 1];
    //console.log(router);
    //this.setState({ id: router.query.id });
    this.setState({ name, date, title, img });
  }

  render() {
    const { id } = this.state;
    const { name, date, title, img } = this.state;

    const theme = { background: `center / cover no-repeat url(${img})` };
    return (
      <Header>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Host>Hosted by: {name}</Host>
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
