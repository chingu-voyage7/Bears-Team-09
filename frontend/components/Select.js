import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Select = props => {
  const { name, optionsArr, title, handleSelection } = props;
  const options = optionsArr.map(option => (
    <option key={option.id} value={option.value}>
      {option.name}
    </option>
  ));
  return (
    <div>
      <Label htmlFor={name}>
        <p>{title}</p>
        <select onChange={e => handleSelection(e)} id={name}>
          {options}
        </select>
      </Label>
    </div>
  );
};

export default Select;

const Label = styled.label`
  display: grid;
  grid-template-columns: auto 50px;
  justify-content: left;
  padding: 10px;

  input {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    padding: 5px;
    background-color: #fafafa;
    width: 100%;
    margin-bottom: 5px;
    font-size: 1rem;
  }

  p {
    padding: 0;
    margin: 0;
    margin-right: 10px;
  }
`;
// name, optionsArr, title

Select.propTypes = {
  name: PropTypes.string.isRequired,
  optionsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired
};
