import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import MainLayout from "../components/MainLayout";

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
    const token = tokenCtx || localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const { router } = this.props;
    const currentEvent = await axios({
      method: "get",
      url: `http://localhost:8000/events/${router.query.id}`,
      headers: {
        Authorization: AuthStr
      }
    });
    const { name, date_from: startDate, description, image } = currentEvent.data;
    this.setState({ name, startDate, description, image });
  }

  render() {
    const { name, startDate, description, image } = this.state;
    // const theme = { background: `center / cover no-repeat url(${image})` };
    // let startDate = "2019-07-19";
    // let description = "some description goes here";
    // let name = "this is a name";
    return (
      <MainLayout>
        <Container>
          <DateTime>{startDate}</DateTime>
          <Title>{description}</Title>
          <Host>Hosted by: {name}</Host>
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

const DateTime = styled.div`
  color: grey;
`;
const Host = styled.div`
  color: grey;
`;
const Title = styled.div`
  font-size: 2em;
`;

event.propTypes = {
  router: PropTypes.element.isRequired
};

export default withRouter(event);
