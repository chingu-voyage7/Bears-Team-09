import React, { Component } from 'react';
import styled from 'styled-components';
/*
Component Fetches the category list from API and shows that as a dropdown
Upon Category selection, component calls a callback function that triggers
parent compositional component to re-render Event list
*/

class CategoryPicker extends Component {
  constructor(){
    super();
    this.state = {
      popupOpen: false,
      activeCategory: 'Category',
      categories: []
    };
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
  }

  handleCategorySelection(e){
    //CB should be called here to indicate that we need to re-render event list based on new category
    this.setState({popupOpen: false, activeCategory: e.target.innerHTML});
  }

  componentDidMount(){
    //mock API call for categories
    setTimeout(
    function() {
      const fetchedCatsObj = [
        {cat: "sport",
          id: 123
        },
        {cat: "games",
          id: 234
        },
        {cat: "outdoors",
          id: 999
        },
        {cat: "social",
          id: 852
        },
        {cat: "arts & culture",
          id: 444
        }
      ];
      this.setState({categories: fetchedCatsObj});
    }
    .bind(this),
    1500
);

  }

  render() {
    const { popupOpen, activeCategory, categories } = this.state;
    const categoryList = categories.map( categoryObj => <CategoryListItem key={categoryObj.id} onClick={this.handleCategorySelection}>{categoryObj.cat}</CategoryListItem>);

    return (
      <CategoryWrapper tabIndex="1" onBlur={() => this.setState({popupOpen: false})}>
        <CategoryBox onClick={() => this.setState({popupOpen: true})}> {activeCategory}
        </CategoryBox>
        {popupOpen && <ul>
          {categoryList}
        </ul>}
      </CategoryWrapper>
    );
  }
}

export default CategoryPicker;

const CategoryWrapper = styled.div`

  padding: 2px;
  line-height: 25px;


  &:focus { outline: none; }
  ul {
    list-style-type: none;
    margin: 2px 0px 0px 0px;
    padding: 0;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    background: white;
    padding: 5px;
    border-radius: 2px;
    box-shadow: rgba(0,0,0,.5) 0 3px 10px 0;
  }
`

const CategoryBox = styled.div`
  text-transform: capitalize;
  width: 140px;
  padding: 2px;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 2px;
  border: 1px solid black;
  transition: all 0.1s 0.1s ease-out;
  &:hover {
    background: purple;
    color: white;
  }
`

const CategoryListItem = styled.li`
  text-transform: capitalize;
  text-align: left;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  &:hover {
    color: white;
    background: black;
  }
`