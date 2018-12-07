import React, { Component } from 'react';
import styled from 'styled-components';

class LocationSearch extends Component {
  constructor(){
    super();
    this.state = {
      currentInput: '',
      locations : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);

  }

  handleChange(e){
    console.log(e.target.value);
    this.setState({currentInput: e.target.value});
  }

  clearInput(){
    this.setState({currentInput: ''});
  }

  componentDidMount() {
    //mock the API call
    setTimeout(
    function() {
      const locations = [
        { country: "Canada", city: "Toronto" },
        { country: "Germany", city: "Berlin" },
        { country: "United States", city: "New York" },
        { country: "United States", city: "Seattle" },
        { country: "United Kingdom", city: "London" },
        { country: "France", city: "Paris" },
        { country: "Canada", city: "Victoria" },
      ];
      this.setState({locations});
    }
    .bind(this),
      1500
    );
  }

  render(){
    const { currentInput } = this.state;
    return(
      <div style={{width: 150}}>
      <SearchBarWrapper>
        <StyledSearchBar placeholder="location" type="text" onChange={this.handleChange} value={this.state.currentInput}/>
        {currentInput.length !== 0 && <ClearButton onClick={this.clearInput}>x</ClearButton>}
      </SearchBarWrapper>
      </div>
      );
  }
}

export default LocationSearch;

const SearchBarWrapper = styled.div`
  position: relative;
  vertical-align: middle;
  line-height: 1.3;
`

const StyledSearchBar = styled.input`
  text-align: center;
  font-size: 1rem;
  border: 1px solid rgba(0,0,0,.12);
  color: #757575;
  display: block;
  width: 150px;
  padding: 6px;
  border-radius: 3px;
  transition: all 0.1s 0.1s ease-in;
  outline: none;
  background-color: #FFF;
  transition: all 100ms ease-out;

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