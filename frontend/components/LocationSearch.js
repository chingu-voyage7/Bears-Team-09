import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class LocationSearch extends Component {
  state = {
    placeholder: "location",
    currentInput: "",
    suggestionPopup: false,
    suggestions: [],
    locations: []
  } 
 
  componentDidMount() {
    // mock the API call
    setTimeout(() => {
      const locations = [
        { country: "Canada", city: "Toronto", id: 123 },
        { country: "Germany", city: "Berlin", id: 123 },
        {
          country: "United States",
          city: "New York",
          id: 123
        },
        {
          country: "United States",
          city: "Seattle",
          id: 123
        },
        {
          country: "United Kingdom",
          city: "London",
          id: 123
        },
        {
          country: "France",
          city: "Paris",
          id: 123
        },
        {
          country: "Canada",
          city: "Victoria",
          id: 123
        }
      ];
      const locationArray = locations.map(locationObject => locationObject.city);
      this.setState({
        locations: locationArray
      });
    }, 1500);
  }

  handleChange = (e) => {
    const { locations, suggestions } = this.state;
    const currentValue = e.target.value;
    this.setState({ currentInput: currentValue });

    // Filter locations based on user current input
    const filterSuggestions =
      currentValue.length !== 0 ?
      locations.filter(city => city.toLowerCase().match(currentValue.toLowerCase(), "gmi")) : [];
    this.setState({ suggestions: filterSuggestions });

    // Check if suggestion popup needs to hide or show
    if (suggestions.length === 0 || currentValue === "") {
      this.setState({ suggestionPopup: false });
    }
    else if (suggestions.length !== 0) {
      this.setState({ suggestionPopup: true });
    }
  }

  clearInput = () => {
    this.setState({ currentInput: "" });
    this.setState({ suggestions: [] });
    this.setState({ suggestionPopup: false });
  }

  selectLocation = (e, location) => {
    const { updateFilter } = this.props;
    // handle suggestion selection
    this.setState({ currentInput: location });
    this.setState({ suggestionPopup: false });
    updateFilter("location", location);
  }

  render() {
    const { currentInput, suggestions, suggestionPopup, placeholder } = this.state;
    const suggestionList = suggestions.map(city => (
      <SuggestionListItem onClick={e => this.selectLocation(e, city)}>{city}</SuggestionListItem>
    ));
    return (
      <>
        <SearchBarWrapper>
          <StyledSearchBar placeholder={placeholder} type="text" onChange={this.handleChange} value={currentInput} />
          {currentInput && currentInput.length !== 0 && <ClearButton onClick={this.clearInput}>x</ClearButton>}
          {suggestionPopup && <Suggestions>{suggestionList}</Suggestions>}
        </SearchBarWrapper>
      </>
    );
  }
}

export default LocationSearch;

LocationSearch.propTypes = {
  updateFilter: PropTypes.func.isRequired
};

const SearchBarWrapper = styled.div `
  position: relative;
  vertical-align: middle;
  line-height: 1.3;
`;

const StyledSearchBar = styled.input `
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

const Suggestions = styled.ul `
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

const SuggestionListItem = styled.li `
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

const ClearButton = styled.button `
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
