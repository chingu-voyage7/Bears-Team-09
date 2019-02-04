import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Attendees({ attendees }) {
  const PeopleList = attendees.map(att => {
    const image = att.image || "../static/no_photo.jpg";
    return (
      <li key={att.id}>
        <Img src={image} alt="avatar" />
        <Name>{att.first_name}</Name>
      </li>
    );
  });

  return (
    <div>
      <h4>Attendees:</h4>
      <ListWrapper>{PeopleList}</ListWrapper>
    </div>
  );
}

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Img = styled.img`
  width: 40px;
  border-radius: 50px;
`;

const Name = styled.p`
  margin: 0;
`;

Attendees.propTypes = {
  attendees: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Attendees;
