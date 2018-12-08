import React, { Component } from "react";
import styled from "styled-components";

class LocationSearch extends Component {
  constructor() {
    super();
    this.state = {
      currentInput: "",
      suggestionPopup: false,
      suggestions: [],
      locations: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.select = this.select.bind(this);
  }

  componentDidMount() {
    // mock the API call

    setTimeout(() => {
      const locations = [
        {
          country: "Canada",
          city: "Toronto"
        },
        {
          country: "Germany",
          city: "Berlin"
        },
        {
          country: "United States",
          city: "New York"
        },
        {
          country: "United States",
          city: "Seattle"
        },
        {
          country: "United Kingdom",
          city: "London"
        },
        {
          country: "France",
          city: "Paris"
        },
        {
          country: "Canada",
          city: "Victoria"
        }
      ];
      const locationArray = locations.map(locationObject => locationObject.city);
      this.setState({
        locations: locationArray
      });
    }, 1500);
  }

  handleChange(e) {
    const { locations, suggestions } = this.state;
    this.setState({ currentInput: e.target.value });
    const currentValue = e.target.value;

    // Filter locations based on user current input
    const filterSuggestions =
      currentValue.length !== 0
        ? locations.filter(city => city.toLowerCase().match(currentValue.toLowerCase(), "gmi"))
        : [];
    this.setState({ suggestions: filterSuggestions });

    // Check if suggestion popup needs to hide or show
    if (suggestions.length === 0 || currentValue === "") {
      this.setState({ suggestionPopup: false });
    } else if (suggestions.length !== 0) {
      this.setState({ suggestionPopup: true });
    }
  }

  clearInput() {
    this.setState({ currentInput: "" });
    this.setState({ suggestions: [] });
    this.setState({ suggestionPopup: false });
  }

  select(e, location) {
    // handle suggestion selection
  }

  render() {
    const { currentInput, suggestions, suggestionPopup } = this.state;
    const suggestionList = suggestions.map(city => (
      <SuggestionItem onClick={e => this.select(e, city)}>{city}</SuggestionItem>
    ));
    return (
      <>
        <SearchBarWrapper>
          <StyledSearchBar placeholder="location" type="text" onChange={this.handleChange} value={currentInput} />
          {currentInput.length !== 0 && <ClearButton onClick={this.clearInput}>x</ClearButton>}
          {suggestionPopup && <SuggestionList>{suggestionList}</SuggestionList>}
        </SearchBarWrapper>
      </>
    );
  }
}

export default LocationSearch;

const SearchBarWrapper = styled.div`
  position: relative;
  vertical-align: middle;
  line-height: 1.3;
`;

const StyledSearchBar = styled.input`
  text-align: center;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #757575;
  display: block;
  width: 150px;
  padding: 6px;
  border-radius: 3px;
  transition: all 0.1s 0.1s ease-in;
  outline: none;
  background-color: #fff;
  transition: all 100ms ease-out;

  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
  &:focus:-moz-placeholder {
    color: transparent;
  }
  &:focus::-moz-placeholder {
    color: transparent;
  }
  &:focus:-ms-input-placeholder {
    color: transparent;
  }
`;

const SuggestionList = styled.ul`
  list-style-type: none;
  width: 140px;
  margin: 2px 0px 0px 0px;
  padding: 0;
  position: absolute;
  display: grid;
  grid-gap: 5px;
  background: white;
  padding: 5px;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 3px 10px 0;
  z-index: 1;
`;

const SuggestionItem = styled.li`
  text-transform: capitalize;
  text-align: left;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  &:hover {
    color: white;
    background: black;
  }
`;

const ClearButton = styled.button`
  font-size: 1.1rem;
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  font-weight: 600;
  color: #999;
  cursor: pointer;
`;
