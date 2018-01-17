import React, { Component } from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
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
      defaultZoom={15}
      defaultCenter={{ lat: -33.8688, lng: 151.2093 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -33.8688, lng: 151.2093 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )

class Map extends Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
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
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default Map


/*
<GoogleMapLoader
  conatinerElement = {mapContainer}
  googleMapElemt = {
    <GoogleMap
      defaultZoom = {15}
      defaultCenter={this.props.center}
      options={{streetViewControl: false, mapTypeControl: false}}>
    </GoogleMap>
  }/>
*/
