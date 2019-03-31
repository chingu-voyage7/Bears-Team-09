import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import PropTypes from "prop-types";

class DateSelector extends React.Component {
  state = {
    startDate: null
  };

  componentDidUpdate(prevProps) {
    // control clear button from parent component
    if (prevProps.cleared === false && this.props.cleared === true) {
      this.clearDate();
    }
  }

  clearDate = () => {
    this.setState({ startDate: null });
  };

  handleChange = date => {
    const { updateSelection } = this.props;
    if (date === null) {
      this.setState({ startDate: null }, updateSelection(null));
    } else {
      this.setState({ startDate: date }, updateSelection(date));
    }
  };

  render() {
    const { placeholder, mobile } = this.props;
    const { startDate } = this.state;
    return (
      <DatePickerStylingWrapper type="form">
        <DatePicker
          minDate={new Date()}
          popperPlacement="bottom"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: "30px, 10px"
            }
          }}
          todayButton="today"
          selected={startDate}
          onChange={this.handleChange}
          placeholderText={placeholder}
          isClearable={!mobile}
          withPortal={mobile}
        />
      </DatePickerStylingWrapper>
    );
  }
}

export default DateSelector;

DateSelector.propTypes = {
  updateSelection: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  cleared: PropTypes.bool,
  mobile: PropTypes.bool
};

const DatePickerStylingWrapper = styled.div`
  margin: 7px 0px 5px 0px;
  input {
    cursor: pointer;
    text-transform: capitalize;
    padding: 10px;
    border-radius: 3px;
    outline: 0;
    width: ${props => (props.type === "form" ? "100%" : "120px")};
    text-align: left;
    font-size: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: #757575;
    margin-top: 0px;
  }
  input:hover {
    background: purple;
    color: white;
  }

  input:hover::placeholder {
    color: white;
  }
`;
