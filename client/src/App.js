import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import SearchBar from './SearchBar'
class App extends Component {
  // Initialize state

  state = { namesList: [] , newName: '', location_name: '', location_lat: '', location_lng: ''}

  // Fetch names list after first mount
  componentDidMount() {
    this.getNamesList();
    this.getLocation();
    //this.getLocationLat();
    //this.getLocationLng();
  }

  getNamesList = () => {
    // Get the names list and store them in state
    fetch('/api/displayNames')
    .then(res => res.json())
    .then(namesList => this.setState({ namesList }));
  }

  getLocation = () => {
    fetch('api/displayLocation')
    .then(res => res.json())
    .then(locationName => this.setState({location_name: locationName}));
  }
/*
  getLocationLat = () => {
    fetch('api/displayLat')
    .then(res => res.json())
    .then(locationLat => this.setState({location_lat: locationLat}));
  }

  getLocationLng = () => {
    fetch('api/displayLng')
    .then(res => res.json())
    .then(locationLng => this.setState({location_lng: locationLng}));
  }*/

  addNameToList = () => {
    fetch(`/names/${this.state.newName}`)
    .then(this.getNamesList())
    .then(this.setState({newName: ''}));
  }

  handleChange(event) {
    this.setState({newName: event.target.value})
  }

  render() {
    const { namesList } = this.state;

    return (
      <div className="App">
      {/* Render the names list if we have them */}
      {namesList.length ? (

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Lunch?</h1>
              <h2>Here's who's coming:</h2>
              <ul className="namesList">
                {namesList.map((password, index) =>
                  <li key={index}>
                  {password}
                  </li>
                )}
              </ul>

                <label>
                  Your name?  :
                  <input type="text" name="name" value={this.state.newName} onChange={this.handleChange.bind(this)}/>
                </label>

              <button
                className="more"
                onClick={this.addNameToList}>
                Add me!
              </button>
            </div>
            <div className="col-md-6">
              <h2>Location:</h2>
              <h2>{this.state.location_name}</h2>
              <SearchBar getLocationFunc={this.getLocation} onSuggestSelect={this.getLocation}/>
                <div className="padded-top">
                <Map />
                </div>
            </div>
          </div>
        </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No one coming yet :(</h1>

            <label>
              Your name?  :
              <input type="text" name="name" value={this.state.newName} onChange={this.handleChange.bind(this)}/>
            </label>

            <button
              className="more"
              onClick={this.addNameToList}>
              Add me!
            </button>
          </div>
          )}
        </div>
        );
      }
    }

    export default App;
