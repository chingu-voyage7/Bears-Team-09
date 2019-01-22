import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import styled, { ThemeProvider } from "styled-components";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

export class event extends Component {
  state = {
    name: "",
    startDate: "",
    title: "",
    image: "",
    description: ""
  };

  async componentDidMount() {
    const { tokenCtx } = this.context;
    // getting token from context, falling back to localStorage if no context exists (happens when page is refreshed)
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;

    const { router } = this.props;
   // const { name, date, title, img } = testData[router.query.id - 1];
   const currentEvent = await axios({
    method: "get",
    url: `${backendUrl}/events/${router.query.id}`,
    headers: {
      Authorization: AuthStr
    }
  });
  const { name, date_from : startDate, description, image } = currentEvent.data;
    // console.log(currentEvent)
    // console.log(router);
    // this.setState({ id: router.query.id });

    this.setState({ name, startDate, description, image });

  }

  render() {
    const { name, startDate , description, image } = this.state;
    const startDateFormatted =  moment(startDate);

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
