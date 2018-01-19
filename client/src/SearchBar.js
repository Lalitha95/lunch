import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import './App.css';
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

  onSuggestSelect = (suggest) => {
    console.log(suggest); // eslint-disable-line
    console.log(this.props);
    fetch('/api/newLocation', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(suggest),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).then(this.props.getLocationFunc())
    .catch(err => err);//.then(this.props.getLocationFunc())
  }

  onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
  }


  render() {
      var fixtures = [
          {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
          {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
          {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
      ];

      return ( // eslint-disable-line
          <div>
            <Geosuggest
              fixtures={fixtures}
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
