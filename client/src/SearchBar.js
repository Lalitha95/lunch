import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest';

class SearchBar extends Component {

  onFocus() {
    console.log('onFocus'); // eslint-disable-line
  }

  onBlur(value) {
    console.log('onBlur', value); // eslint-disable-line
  }

  onChange(value) {
    console.log('input changes to :' + value); // eslint-disable-line
  }

  onSuggestSelect(suggest) {
    console.log(suggest); // eslint-disable-line
  }

  onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
  }


  render() {
    return (
      <div>
        <Geosuggest
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          onSuggestNoResults={this.onSuggestNoResults} />
      </div>
    )
  }
}

export default SearchBar
