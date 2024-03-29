import React, { Component } from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import './App.css';
import Map from './Map';
import SearchBar from './SearchBar';

class App extends Component {
  // Initialize state

  state = { namesList: [] , newName: '', location_name: '', location_lat_lng: [ -33, 151], date: ''}

  // Fetch names list after first mount
  componentDidMount() {
    this.getNamesList();
    this.getLocation();
    this.getLatLng();
    this.getCurrDate();
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

  getLatLng = () => {
    fetch('api/displayLatLng')
    .then(res => res.json())
    .then(locationLatLng => this.setState({location_lat_lng: locationLatLng}));
  }

  getCurrDate = () => {
    fetch('api/displayDate')
    .then(res => res.json())
    .then(Date_received => this.setState({date: Date_received}));
  }

  addNameToList = () => {
    fetch(`/names/${this.state.newName}`)
    .then(this.getNamesList())
    .then(this.setState({newName: ''}));
  }

  setDate = (newDate) => {

    fetch(`/date/${formatDate(newDate, 'LLLL')}`)
    .then(this.getCurrDate())
    .then(this.setState({date: formatDate(newDate, 'LLLL')}));
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
            <div className="col-md-4">
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
            <div className="col-md-4">
              <h2>Where is it?</h2>
              <h3>{this.state.location_name}</h3>
              <h2>Lat Long:</h2>
              <h3>Lat: {this.state.location_lat_lng[0]}  Long: {this.state.location_lat_lng[1]}</h3>
              <SearchBar getLocationFunc={this.getLocation} getLocationMapFunc={() => this.refs.locationMap.loadMapComponent()} getLatLngFunc={this.getLatLng}/>
              <div className="padded-top">
              <Map ref = "locationMap" centerLat={this.state.location_lat_lng[0]} centerLng={this.state.location_lat_lng[1]}/>
              </div>
            </div>
            <div className="col-md-4">
              <h2>When is it?</h2>
              <h3>{this.state.date}</h3>
              <DayPickerInput placeholder="DD/MM/YYYY" format="DD/MM/YYYY" onDayChange={day => this.setDate(day)}/>
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
