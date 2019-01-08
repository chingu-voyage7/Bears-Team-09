import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

class EventListItem extends Component {
  render({ id, name, description } = this.props) {
    return (
      <Link href={`/event?id=${id}`} as={`event/${name}`}>
        <ItemContainer>
          <Item>
            <h3>{name}</h3>
            <p>{description}</p>
          </Item>
        </ItemContainer>
      </Link>
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
