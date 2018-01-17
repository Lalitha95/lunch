import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import SearchBar from './SearchBar'
class App extends Component {
  // Initialize state
  state = { namesList: [] }

  // Fetch names list after first mount
  componentDidMount() {
    this.getNamesList();
  }

  getNamesList = () => {
    // Get the names list and store them in state
    fetch('/api/displayNames')
    .then(res => res.json())
    .then(namesList => this.setState({ namesList }));
  }

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
    const location = {
      lat: 33.8688,
      lng: 151.2093
    }

    return (
      <div className="App">
      {/* Render the names list if we have them */}
      {namesList.length ? (

        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>Lunch?</h1>
              <h2>Here's who's coming:</h2>
              <ul className="namesList">
                {namesList.map((password, index) =>
                  <li key={index}>
                  {password}
                  </li>
                )}
              </ul>
              <p>
                <label>
                  Your name?  :
                  <input type="text" name="name" value={this.state.newName} onChange={this.handleChange.bind(this)}/>
                </label>
              </p>
              <button
                className="more"
                onClick={this.addNameToList}>
                Add me!
              </button>
            </div>
            <div class="col-md-6">
              <SearchBar/>
              <p>
                <div class="padded-top">
                <Map center={location} />
                </div>
              </p>
            </div>
          </div>
        </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No one coming yet :(</h1>
            <p>
            <label>
              Your name?  :
              <input type="text" name="name" value={this.state.newName} onChange={this.handleChange.bind(this)}/>
            </label>
            </p>
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
