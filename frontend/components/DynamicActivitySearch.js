import React from "react";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import config from "../config.json";

const backendUrl = config.BACKEND_URL;

class DynamicActivitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.setPopupRef = this.setPopupRef.bind(this);
    this.state = {
      inputVal: "",
      suggestions: [],
      selectionID: null,
      selectionName: null,
      showSuggestions: false,
      showAddButton: true
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

  // Add suggestion based on the input
  handleAdd = () => {
    const { updateActivity } = this.props;
    const currentValue = this.state.inputVal;
    this.setState({ showAddButton: false });
    // send the info to the parent component indicating new addition to db
    const payload = {
      name: currentValue,
      id: null
    };
    updateActivity(payload, false);
  };

  // Fetch suggestions based on the input
  getSuggestions = async input => {
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const suggestions = await axios({
      method: "get",
      url: `${backendUrl}/activities?limit=5&name=${input}&compare=in`,
      headers: {
        Authorization: AuthStr
      }
    });
    console.log(suggestions);
    const suggestionArray = suggestions.data["activities"];
    if (suggestionArray.length === 0) {
      // no results found
      this.setState({ suggestions: [], showSuggestions: false });
    } else {
      this.setState({ suggestions: suggestionArray, showSuggestions: true });
    }
  };

  handleChange = e => {
    if (e.target.value.length > 2) {
      // trigger API call to fetch latest suggestions
      // FIXME: I think we need to throtthle these calls to api
      this.getSuggestions(e.target.value);
      this.setState({ inputVal: e.target.value, showAddButton: true });
    } else {
      this.setState({ inputVal: e.target.value, showSuggestions: false });
    }
  };

  handleClickSelect = (e, id, name) => {
    // handler for direct click on suggestion
    const { type, updateActivity } = this.props;
    const payload = {
      id,
      name
    };
    this.setState({ showSuggestions: false, inputVal: name, selectionID: id, selectionName: name });
    updateActivity(type, payload, true);
  };

  // method that is needed for hiding popup if clicked outside functionality
  handleClick = e => {
    if (this.popupRef && !this.popupRef.contains(e.target)) {
      this.setState({ showSuggestions: false });
    }
  };

  handleKeyDown = (e, id, name) => {
    const { type, updateActivity } = this.props;
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
      updateActivity(type, payload, true);
    }
  };

  render() {
    const { showSuggestions, inputVal, suggestions, showAddButton } = this.state;
    const { placeholder, allowNew } = this.props;
    const suggestionsList = suggestions.map(suggestion => (
      <SuggestionItem
        tabIndex={0}
        onClick={e => this.handleClickSelect(e, suggestion.id, suggestion.name)}
        onKeyDown={e => this.handleKeyDown(e, suggestion.id, suggestion.name)}
        key={suggestion.id}
      >
        {suggestion.name}
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
          {allowNew && inputVal && showAddButton && suggestions.length === 0 && (
            <AddButton onClick={this.handleAdd} tabIndex={0}>
              <span>+</span>
              Add
            </AddButton>
          )}
        </SearchBarWrapper>
        {showSuggestions && <Suggestions ref={this.setPopupRef}>{suggestionsList}</Suggestions>}
      </>
    );
  }
}
DynamicActivitySearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  allowNew: PropTypes.bool.isRequired,
  updateActivity: PropTypes.func
};

export default DynamicActivitySearch;

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
  z-index: 1;
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
