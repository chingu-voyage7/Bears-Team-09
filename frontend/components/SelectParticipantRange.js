import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import StyledErrorMsg from "../styles/StyledErrorMsg";

class SelectParticipantRange extends React.Component {
  state = {
    minValue: 2,
    maxValue: "",
    inputError: false,
    inputErrorMsg: null
  };

  validateInputs = (minValue, maxValue) => {
    const { updateParticipantRange } = this.props;

    if (minValue < 2 || maxValue < 2) {
      this.setState({
        inputError: true,
        inputErrorMsg: "Participants cannot be less than 2"
      });
    } else if (maxValue > 100 || minValue > 100) {
      this.setState({
        inputError: true,
        inputErrorMsg: "Participants cannot be higher than 100"
      });
    } else if (maxValue < minValue) {
      this.setState({
        inputError: true,
        inputErrorMsg: "Max cannot be lower than min"
      });
    } else {
      this.setState({ inputError: false, inputErrorMsg: null });
      updateParticipantRange(minValue, maxValue);
    }
  };

  handleMinChange = e => {
    this.setState(
      { minValue: e.target.value },
      this.validateInputs(Number(e.target.value), Number(this.state.maxValue))
    );
  };

  handleMaxChange = e => {
    this.setState(
      { maxValue: e.target.value },
      this.validateInputs(Number(this.state.minValue), Number(e.target.value))
    );
  };

  render() {
    const { inputError, inputErrorMsg, minValue, maxValue } = this.state;
    return (
      <SelectWrapper>
        <Label htmlFor="min-people">
          <p>Min People</p>
          <input
            type="number"
            id="min-people"
            name="min-people"
            value={minValue}
            min="2"
            max="100"
            onChange={e => this.handleMinChange(e)}
          />
        </Label>
        <Label htmlFor="max-people">
          <p>Max People</p>
          <input
            type="number"
            id="max-people"
            name="max-people"
            value={maxValue}
            min="2"
            max="100"
            onChange={e => this.handleMaxChange(e)}
          />
        </Label>
        {inputError && (
          <div>
            <StyledErrorMsg>{inputErrorMsg}</StyledErrorMsg>
          </div>
        )}
      </SelectWrapper>
    );
  }
}

export default SelectParticipantRange;

const Label = styled.label`
  display: grid;
  grid-template-columns: auto 50px;
  justify-content: left;
  padding: 5px;

  input {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    padding: 1px;
    padding-left: 5px;
    background-color: #fafafa;
    font-size: 1rem;
  }

  p {
    padding: 0;
    margin: 0;
    margin-right: 10px;
    align-self: center;
  }
`;
const SelectWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  border-radius: 3px;
  outline: 0;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #757575;
  margin-top: 5px;

  div {
    grid-column: -1 / 1;
    margin-top: 5px;
    padding: 5px;

    span {
      margin: 0;
    }
  }
`;
SelectParticipantRange.propTypes = {
  updateParticipantRange: PropTypes.func.isRequired
};
