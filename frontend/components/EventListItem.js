import React, { Component } from "react";
import styled from "styled-components";

class EventListItem extends Component {
  clickHandler = () => {
    console.log("clicked");
  };

  render({ title, description } = this.props) {
    return (
      <ItemContainer>
        <Item onClick={this.clickHandler}>
          <h3>{title}</h3>
          <p>{description}</p>
        </Item>
      </ItemContainer>
    );
  }
}

export default EventListItem;

const ItemContainer = styled.div`
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Item = styled.div`
  background: #d3d3d3;
  border: 2px solid white;
  padding: 1em;
  text-align: center;
  width: 700px;
  border-radius: 5px;
  cursor: pointer;
`;
