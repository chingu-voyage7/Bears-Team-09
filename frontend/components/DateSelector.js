import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    //this would likely need to be a CB that gets bubbled up to filter control component
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePickerStylingWrapper>
      <DatePicker
        todayButton="today"
        selected={this.state.startDate}
        onChange={this.handleChange}
        placeholderText="Pick Date"
      />
      </DatePickerStylingWrapper>
    );
  }
}

export default DateSelector;

const DatePickerStylingWrapper = styled.div`
    input {
      padding: 5px;
      border-radius: 3px;
      outline: 0;
      width: 80px;
      text-align: center;
      font-size: 1rem;
      border: 1px solid rgba(0,0,0,.12);
      color: #757575;
    }
`;