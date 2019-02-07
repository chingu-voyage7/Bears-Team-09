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
      matchingSuggestions: [],
      selectionID: null,
      selectionName: null,
      showSuggestions: false,
      showAddButton: true
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const AuthStr = `Bearer ${token}`;
    const suggestions = await axios({
      method: "get",
      url: `${backendUrl}/activities`,
      headers: {
        Authorization: AuthStr
      }
    });
    const suggestionArray = suggestions.data["activities"];
    if (suggestionArray.length === 0) {
      this.setState({ suggestions: [], showSuggestions: false });
    } else {
      this.setState({ suggestions: suggestionArray, matchingSuggestions: suggestionArray, showSuggestions: false });
    }
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

  // Filter suggestions based on the input
  getSuggestions = async input => {
    const { suggestions } = this.state;
    const regex = new RegExp(input, "gmi");
    const matchingSuggestions = suggestions.filter(activity => activity.name.match(regex));
    if (matchingSuggestions.length === 0) {
      this.setState({ showSuggestions: false, matchingSuggestions: [] });
    } else {
      this.setState({ showSuggestions: true, matchingSuggestions });
    }
  };

  handleChange = e => {
    if (e.target.value.length >= 0) {
      this.getSuggestions(e.target.value);
      this.setState({ inputVal: e.target.value, showAddButton: true });
    } else {
      this.setState({ inputVal: e.target.value, showSuggestions: false });
    }
  };

  handleClickSelect = (id, name) => {
    // handler for direct click on suggestion
    const { updateActivity } = this.props;
    const payload = {
      id,
      name
    };
    this.setState({ showSuggestions: false, inputVal: name, selectionID: id, selectionName: name });
    updateActivity(payload, true);
  };

  // method that is needed for hiding popup if clicked outside functionality
  handleClick = e => {
    if (this.popupRef && !this.popupRef.contains(e.target)) {
      this.setState({ showSuggestions: false });
    }
  };

  handleKeyDown = (e, id, name) => {
    const { updateActivity } = this.props;
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
      updateActivity(payload, true);
    }
  };

  handleInputClick = () => {
    this.setState({ showSuggestions: true });
  };

  render() {
    const { showSuggestions, inputVal, matchingSuggestions, showAddButton } = this.state;
    const { placeholder, allowNew } = this.props;
    const suggestionsList = matchingSuggestions.map(suggestion => (
      <SuggestionItem
        tabIndex={0}
        onClick={() => this.handleClickSelect(suggestion.id, suggestion.name)}
        onKeyDown={e => this.handleKeyDown(e, suggestion.id, suggestion.name)}
        key={suggestion.id}
      >
        {suggestion.name}
      </SuggestionItem>
    ));

    return (
      <>
        <SearchBarWrapper>
          <Label htmlFor={placeholder} ref={this.setPopupRef}>
            <input
              onClick={this.handleInputClick}
              onChange={this.handleChange}
              type="text"
              placeholder={placeholder}
              value={inputVal}
              onKeyDown={e => this.handleKeyDown(e)}
            />
          </Label>
          {allowNew && inputVal && showAddButton && matchingSuggestions.length === 0 && (
            <AddButton onClick={this.handleAdd} tabIndex={0}>
              <span>+</span>
              Add
            </AddButton>
          )}
          {showSuggestions && <Suggestions>{suggestionsList}</Suggestions>}
        </SearchBarWrapper>
      </>
    );
  }
}
DynamicActivitySearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
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
