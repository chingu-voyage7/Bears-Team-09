import React from "react";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

class DynamicLocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.setPopupRef = this.setPopupRef.bind(this);
    this.state = {
      inputVal: "",
      inputCountryVal: "",
      suggestions: [],
      selectionID: null,
      selectionCity: null,
      selectionCountry: null,
      showSuggestions: false,
      showAddButton: true,
      showCountryInput: false
    };
  }

  componentDidUpdate() {
    // adding click handlers based on suggestion box
    if (this.state.showSuggestions) {
      window.addEventListener("click", this.handleClick);
    } else {
      window.removeEventListener("click", this.handleClick);
    }
  }

  componentWillUnmount() {
    // just to be sure it cleans up the handlers
    window.removeEventListener("click", this.handleClick);
  }

  // Setting ref for click outside element functionality
  setPopupRef(node) {
    this.popupRef = node;
  }

  handleAdd = () => {
    const { showCountryInput, inputCountryVal, inputVal } = this.state;
    if (!showCountryInput) {
      this.setState({ showCountryInput: true });
    } else {
      const payload = {
        city: inputVal,
        country: inputCountryVal
      };
      this.setState({ showAddButton: false });
      this.props.updateLocation(payload, false);
    }
    // send the info to the parent component indicating new addition to db
    // we need to promp user here and ask for City, Country combo
  };

  // Fetch suggestions based on the input
  getSuggestions = async input => {
    const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const suggestions = await axios({
      method: "get",
      url: `${backendUrl}/places?limit=5&city=${capitalizedInput}&compare=in`,
      headers: {
        Authorization: AuthStr
      }
    });

    const suggestionArray = suggestions.data["places"];
    if (suggestionArray.length === 0) {
      // no results found
      this.setState({ showSuggestions: false });
    } else {
      this.setState({ suggestions: suggestionArray, showSuggestions: true });
    }
  };

  handleChange = e => {
    if (e.target.value.length > 2) {
      // FIXME: I think we need to throtthle these calls to api
      this.getSuggestions(e.target.value);
      this.setState({ inputVal: e.target.value, showAddButton: true });
    } else {
      this.setState({ inputVal: e.target.value, showSuggestions: false });
    }
  };

  handleCountryInputChange = e => {
    this.setState({ inputCountryVal: e.target.value });
  };

  handleClickSelect = (e, id, city, country) => {
    // handler for direct click on suggestion
    const { updateLocation } = this.props;
    const payload = {
      id,
      city,
      country
    };
    this.setState({
      showSuggestions: false,
      inputVal: city,
      selectionID: id,
      selectionCity: city,
      selectionCountry: country
    });
    updateLocation(payload, true);
  };

  // method that is needed for hiding popup if clicked outside functionality
  handleClick = e => {
    if (this.popupRef && !this.popupRef.contains(e.target)) {
      this.setState({ showSuggestions: false });
    }
  };

  handleKeyDown = (e, id, name) => {
    const { updateLocation } = this.props;
    const payload = {
      id,
      name
    };
    // close popup is ESC key is pressed
    if (e.keyCode === 27) {
      this.setState({ showSuggestions: false });
    }
    if (e.keyCode === 13) {
      // Select item if ENTER key is pressed
      this.setState({ showSuggestions: false, inputVal: name, selectionID: id, selectionName: name });
      updateLocation(payload, true);
    }
  };

  render() {
    const { showSuggestions, showCountryInput, inputVal, inputCountryVal, suggestions, showAddButton } = this.state;
    const { placeholder, allowNew } = this.props;
    const suggestionsList = suggestions.map(suggestion => (
      <SuggestionItem
        tabIndex={0}
        onClick={e => this.handleClickSelect(e, suggestion.id, suggestion.city, suggestion.country)}
        onKeyDown={e => this.handleKeyDown(e, suggestion.id, suggestion.city)}
        key={suggestion.id}
      >
        {suggestion.city}, {suggestion.country}
      </SuggestionItem>
    ));

    return (
      <>
        <SearchBarWrapper>
          <Label htmlFor={placeholder}>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder={placeholder}
              value={inputVal}
              onKeyDown={e => this.handleKeyDown(e)}
            />
          </Label>
          {showCountryInput && (
            <Label htmlFor="country">
              <input
                onChange={this.handleCountryInputChange}
                type="text"
                placeholder="Specify Country"
                value={inputCountryVal}
              />
            </Label>
          )}
          {inputVal && allowNew && showAddButton && suggestions.length === 0 && (
            <AddButton onClick={this.handleAdd} tabIndex={0}>
              <span>+</span>
              Add
            </AddButton>
          )}
          {showSuggestions && <Suggestions ref={this.setPopupRef}>{suggestionsList}</Suggestions>}
        </SearchBarWrapper>
      </>
    );
  }
}
DynamicLocationSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  allowNew: PropTypes.bool.isRequired,
  updateLocation: PropTypes.func
};

export default DynamicLocationSearch;

const SearchBarWrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  input {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    padding: 5px;
    background-color: #fafafa;
    width: 100%;
    margin-bottom: 5px;
    font-size: 1rem;
  }
`;

const AddButton = styled.div`
  cursor: pointer;
  border: 1px solid green;
  padding: 3px;
  border-radius: 2px;
  position: absolute;
  margin-top: 10px;
  transform: translateY(-50%);
  background: white;
  color: green;
  span {
    font-weight: 700;
    padding-left: 4px;
    padding-right: 4px;
    font-size: 1.1rem;
  }
`;

const Suggestions = styled.ul`
  position: absolute;
  grid-gap: 5px;
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 3px 10px 0;
  background: white;
  display: grid;
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin: 0;
  list-style-type: none;
  z-index: 3;
  min-width: 160px;
`;

const SuggestionItem = styled.li`
  cursor: pointer;
  padding: 3px;
  font-size: 1rem;
  text-transform: capitalize;
  &:hover {
    background: purple;
    color: white;
  }
  &:focus {
    background: purple;
    color: white;
  }
`;
