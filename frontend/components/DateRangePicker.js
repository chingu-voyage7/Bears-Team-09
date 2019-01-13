import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  handleChangeStart = date => {
    const { updateDateRange } = this.props;
    const { endDate } = this.state;
    this.setState({ startDate: date });
    updateDateRange(date, endDate);
  };

  handleChangeEnd = date => {
    const { updateDateRange } = this.props;
    const { startDate } = this.state;
    this.setState({ endDate: date });
    updateDateRange(startDate, date);
  };

  render() {
    return (
      <DateRangeContainer>
        <DatePickerStylingWrapper>
          <DatePicker
            placeholderText="Start Date"
            selectsStart
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            minDate={new Date()}
            isClearable
          />
        </DatePickerStylingWrapper>
        <DatePickerStylingWrapper>
          <DatePicker
            placeholderText="End Date"
            selectsEnd
            selected={this.state.endDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            minDate={this.state.startDate || new Date()}
            isClearable
          />
        </DatePickerStylingWrapper>
      </DateRangeContainer>
    );
  }
}
DateRangePicker.propTypes = {
  updateDateRange: PropTypes.func.isRequired
};

export default DateRangePicker;

const DateRangeContainer = styled.div`
  display: flex;
`;

const DatePickerStylingWrapper = styled.div`
  input {
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    outline: 0;
    text-align: left;
    font-size: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    color: #757575;
    margin-top: 5px;
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
