import React from 'react';
import { connect } from 'react-redux';
import { View } from '../components';
import { findItemById } from '../__lib/find';
import validator from '../__lib/validator';
import { mainCSS } from '../styles';

function ShowPositon(el, x, y, zoom) {
  // console.log('el', el, Boolean(window.google));
  if (!window || !window.google) return;
  var google = window.google;
  var mapOptions = {
    center: new google.maps.LatLng(x, y),
    zoom: Math.floor(zoom),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  return new google.maps.Map(el, mapOptions);
}

class MapPage extends React.Component {
  defaultCoords = [50.6092, 33.4515];
  defaultZoom = 9;

  componentDidMount() {
    this.getCoordsAndShow(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getCoordsAndShow(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  getCoordsAndShow = ({ match, locations }) => {
    let { location } = match.params,
      coords,
      zoom;
    if (location) {
      // for url as '/map/@50.605,33.425,13z'
      if (location.startsWith('@')) {
        location = location.slice(1).split(',');
        coords = location.slice(0, 2);
        zoom = /^\d+\.?\d*z$/.test(location[2]) ? location[2].slice(0, -1) : '';
      } else {
        // for url as '/map/Perekopovka'
        location = findItemById(locations, location);
        if (location) {
          coords = location.coords.split(',');
          zoom = location.zoom;
        }
      }
    }
    coords = validator.isCoords(coords) || this.defaultCoords;
    zoom = (zoom && zoom.trim()) || this.defaultZoom;
    ShowPositon(this.map, coords[0], coords[1], zoom);
  };

  render() {
    return <View style={mainCSS.fullWindow} $ref={c => (this.map = c)} />;
  }
}

export default connect(({ app, locations }) => ({
  locations,
}))(MapPage);
