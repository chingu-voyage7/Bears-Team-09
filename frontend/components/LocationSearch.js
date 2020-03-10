import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class LocationSearch extends Component {
  state = {
    placeholder: "City",
    currentInput: "",
    suggestionPopup: false,
    suggestions: [],
    locations: []
  };

  handleChange = e => {
    const { suggestions } = this.state;
    const { locations } = this.props;
    const currentValue = e.target.value;
    this.setState({ currentInput: currentValue });

    // Filter locations based on user current input
    const regex = new RegExp(currentValue, "gmi");
    const filterSuggestions =
      currentValue.length !== 0
        ? locations.filter(location => location.city.match(regex))
        : [];
    this.setState({ suggestions: filterSuggestions });

    // Check if suggestion popup needs to hide or show
    if (suggestions.length === 0 || currentValue === "") {
      this.setState({ suggestionPopup: false });
    } else if (suggestions.length !== 0) {
      this.setState({ suggestionPopup: true });
    }
  };

  clearInput = () => {
    const { updateSelection } = this.props;
    this.setState(
      { currentInput: "", suggestions: [], suggestionPopup: false },
      updateSelection("city", null)
    );
  };

  selectLocation = (e, location) => {
    const { updateSelection } = this.props;
    this.setState(
      { currentInput: location.city, suggestionPopup: false },
      updateSelection("city", location.city, location.id)
    );
  };

  render() {
    const {
      currentInput,
      suggestions,
      suggestionPopup,
      placeholder
    } = this.state;
    const suggestionList = suggestions.map(location => (
      <SuggestionListItem
        key={location.id}
        onClick={e => this.selectLocation(e, location)}
      >
        {location.city}
      </SuggestionListItem>
    ));
    return (
      <>
        <SearchBarWrapper>
          <StyledSearchBar
            type="form"
            placeholder={placeholder}
            onChange={this.handleChange}
            value={currentInput}
          />
          {currentInput && currentInput.length !== 0 && (
            <ClearButton onClick={this.clearInput}>x</ClearButton>
          )}
          {suggestionPopup && (
            <Suggestions type="form">{suggestionList}</Suggestions>
          )}
        </SearchBarWrapper>
      </>
    );
  }
}

export default LocationSearch;

LocationSearch.propTypes = {
  updateSelection: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired
};

const SearchBarWrapper = styled.div`
  position: relative;
  vertical-align: middle;
  line-height: 1.3;
`;

const StyledSearchBar = styled.input`
  text-align: ${props => (props.type === "form" ? "left" : "center")};
  text-transform: ${props => (props.type === "form" ? "capitalize" : "none")};
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #757575;
  display: block;
  box-sizing: border-box;
  width: ${props => (props.type === "form" ? "100%" : "150px")};
  padding: 5px;
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

const Suggestions = styled.ul`
  list-style-type: none;
  width: ${props => (props.type === "form" ? "auto" : "150px")};
  margin: 2px 0px 0px 0px;
  position: absolute;
  display: grid;
  grid-gap: 5px;
  background: white;
  padding: 5px;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 3px 10px 0;
  z-index: 1;
`;

const SuggestionListItem = styled.li`
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
