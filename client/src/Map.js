
import React, { Component } from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

var MyMapComponent = Component;

class Map extends Component {
  state = {
    isMarkerShown: false
  }

  loadMapComponent = () => {
    MyMapComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDwgyoaaQfSFQkDB5Tdp6Jcv7r3jR87u2Q",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
      )((props) =>
        <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: this.props.centerLat, lng: this.props.centerLng }}
        >
          {props.isMarkerShown && <Marker position={{ lat: this.props.centerLat, lng: this.props.centerLng }} onClick={props.onMarkerClick} />}
        </GoogleMap>
      );
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  componentWillMount() {
    this.loadMapComponent();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    //this.loadMapComponent();
    return (
      <div>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    )
  }
}

export default Map
