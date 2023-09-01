import React, { Component } from 'react';
import './Searchbar.scss';

class Searchbar extends Component {
  render() {
    return (
      <form className="search-bar">
        <input className="search-bar__contents" placeholder="Search..." />
      </form>
    );
  }
}

export default Searchbar;
