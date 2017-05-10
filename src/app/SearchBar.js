import React, { Component, PropTypes } from 'react';
import history from '../routing/history';
import styles from './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { value: '' };
  }

  handleChange = event => this.setState({ value: event.target.value });

  // Executing search only requires a url update
  handleKeyDown = event => (event.key === 'Enter' && this.search(this.state.value.trim()));
  search = query => (query && history.push(`/search/${ query }`));

  render() {
    return (
      <div className={styles.root}>
        <input
          className={styles.inputField}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search entry titles..."
          value={this.state.value}
        />
      </div>
    );
  }
}

export default SearchBar;
