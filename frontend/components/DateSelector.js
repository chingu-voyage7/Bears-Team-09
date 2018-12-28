import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import PropTypes from "prop-types";

class DateSelector extends React.Component {
  state = {
    startDate: null
  };

  handleChange = date => {
    const { updateFilter } = this.props;
    // handle clear date action
    if (date === null) {
      this.setState({ startDate: null }, updateFilter("datefrom", null));
    } else {
      this.setState({ startDate: date }, updateFilter("datefrom", date));
    }
  };

  render() {
    const { startDate } = this.state;
    return (
      <DatePickerStylingWrapper>
        <DatePicker
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
          placeholderText="time"
          isClearable
        />
      </DatePickerStylingWrapper>
    );
  }
}

export default DateSelector;

DateSelector.propTypes = {
  updateFilter: PropTypes.func.isRequired
};

const DatePickerStylingWrapper = styled.div`
  input {
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    outline: 0;
    width: 120px;
    text-align: left;
    font-size: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: #757575;
  }

  input:hover {
    background: purple;
    color: white;
  }

  input:hover {
    background-color: purple;
  }

  input:hover::placeholder {
    color: white;
  }
`;
