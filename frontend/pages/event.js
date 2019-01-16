import React, { Component } from 'react';
import axios from "axios";
import moment from 'moment';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import MainLayout from '../components/MainLayout';

export class event extends Component {
  state = {
    name: '',
    startDate: '',
    title: '',
    image: '',
    description: ''
  };

  async componentDidMount() {
    // const testData = [
      // {
      //   name: 'Bike Academy',
      //   date: 'Tuesday, December 4, 2018',
      //   title: 'Bike Race Across America',
      //   img:
      //     'https://3.bp.blogspot.com/-ut3A91d91wM/VKX-mrfUSyI/AAAAAAAC6S8/hNweMslPA8o/s1600/Talking%2Brace.jpg'
      // },
    //   {
    //     name: 'Bakers of America',
    //     date: 'Tuesday, December 4, 2018',
    //     title: 'Baking contest',
    //     img:
    //       'https://www.bakersjoy.com/wp-content/uploads/2013/08/baking-and-cooking-advice.jpg'
    //   },
    //   {
    //     name: 'Mary Gretchen',
    //     date: 'Tuesday, December 4, 2018',
    //     title: 'Need a hiking friend',
    //     img:
    //       'http://www.destination360.com/north-america/us/rhode-island/images/s/hiking.jpg'
    //   },
    //   {
    //     name: 'Mary Ellen',
    //     date: 'Tuesday, December 4, 2018',
    //     title: 'In need of a friend for a concert',
    //     img:
    //       'http://www.appareil-auditif.pro/wp-content/uploads/2013/11/Bouchons-oreille-concert-boule-quies.jpg'
    //   },
      // {
      //   name: 'Flex Wheeler',
      //   date: 'Tuesday, December 4, 2018',
      //   title: 'I need a workout buddy for motivation',
      //   img:
      //     'https://pbs.twimg.com/profile_images/868967197971972096/5L2k2MEU_400x400.jpg'
      // }
    // ];

    const { tokenCtx } = this.context;
    // getting token from context, falling back to localStorage if no context exists (happens when page is refreshed)
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;

    const { router } = this.props;
   // const { name, date, title, img } = testData[router.query.id - 1];
   const currentEvent = await axios({
    method: "get",
    url: `http://localhost:8000/events/${router.query.id}`,
    headers: {
      Authorization: AuthStr
    }
  });
  const { name, date_from : startDate, description, image } = currentEvent.data;
  console.log(currentEvent)
    // console.log(router);
    // this.setState({ id: router.query.id });
    
    this.setState({ name, startDate, description, image });
    
  }

  render() {
    const { name, startDate , description, image } = this.state;
    const startDateFormatted =  moment(startDate)
    
    const theme = { background: `center / cover no-repeat url(${image})` };
    return (
      <MainLayout>
        <Container>
          <Header>
            <DateTime>{startDateFormatted.format("dddd, MMMM Do YYYY, h:mm:ss a")}</DateTime>
            <Title>{description}</Title>
            <Host>Hosted by: {name}</Host>
            <ThemeProvider theme={theme}>
              <Img />
            </ThemeProvider>
          </Header>
        </Container>
      </MainLayout>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;
const DateTime = styled.div`
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
  width: 500px;
  height: 500px;
`;

event.propTypes = {
  router: PropTypes.element.isRequired
};

export default withRouter(event);
