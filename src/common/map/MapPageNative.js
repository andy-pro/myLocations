import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import MapView, { MAP_TYPES } from 'react-native-maps';
import { setRegion } from '../app/actions';
import { IconButton } from '../__components/Icon';
import { findItemById } from '../__lib/find';
import validator from '../__lib/validator';
import { mainCSS, iconColors } from '../styles';

// const defaultCoords = [50.6092, 33.4515];
// const defaultCoords = [28.95626, -3.493260];
const initialCoords = [36.5174, -26.1953],
  initialZoom = 0.5,
  defaultZoom = 9;

class MapPage extends React.Component {
  static propTypes = {
    provider: MapView.ProviderPropType,
  };

  constructor(props) {
    super(props);
    let coords = this.getCoords(props),
      { x, y, zoom } = coords,
      delta = this.zoomToDelta(zoom),
      region = {
        latitude: Number(x),
        longitude: Number(y),
        latitudeDelta: delta.x,
        longitudeDelta: delta.y,
        zoom,
      };
    this.region = region;
    this.props.setRegion(region);
  }

  componentWillReceiveProps(nextProps) {
    this.region = nextProps.region;
  }

  onRegionChange = region => {
    /* react-native-maps, событие срабатывает сразу же после рендеринга, ? */
    // console.log('========= region change');
    let zoom = this.regionToZoom(region);
    region.zoom = zoom;
    if (this.drag) region.drag = true;
    this.props.setRegion(region);
    console.log('region', region);
  };

  zoomToDelta = zoom => {
    let { isLandscape, width, height, aspectRatio } = this.props.layout,
      size = isLandscape ? height : width,
      x = size * 0.39 / Math.pow(1.82, zoom);
    return { x, y: x * aspectRatio, size };
  };

  regionToZoom = region => {
    let { isLandscape, width } = this.props.layout,
      delta = region[isLandscape ? 'longitudeDelta' : 'latitudeDelta'];
    return Math.round(Math.log(width * 0.39 / delta) / Math.log(1.82)) || 1;
  };

  getCoords = ({ match, locations }) => {
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
    zoom = (zoom && zoom.trim()) || defaultZoom;
    coords = validator.isCoords(coords);
    if (!coords) {
      coords = initialCoords;
      zoom = initialZoom;
    }
    // ShowPositon(this.map, coords[0], coords[1], zoom);
    return { x: coords[0], y: coords[1], zoom };
  };

  renderBackButton = () =>
    <IconButton
      style={mainCSS.backBtn}
      onPress={() => this.props.history.goBack()}
      color={iconColors.inverse}
      backgroundColor="rgba(255,255,255,0.4)"
      name="md-arrow-back"
    />;

  render() {
    // console.log('map page render', this.props.layout, this.region);
    return (
      <View style={mainCSS.fillContainer}>
        <MapView
          provider={this.props.provider}
          ref={ref => {
            this.map = ref;
          }}
          mapType={MAP_TYPES[this.props.mapViewMode]}
          style={mainCSS.fill}
          initialRegion={this.region}
          onRegionChangeComplete={this.onRegionChange}
          onPanDrag={() => (this.drag = true)}
        />
        {this.props.fullMapView && this.renderBackButton()}
      </View>
    );
  }
}

export default connect(
  ({ app, locations }) => ({
    layout: app.layout,
    region: app.region,
    mapViewMode: app.mapViewMode,
    locations,
  }),
  { setRegion }
)(MapPage);

/*
        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center' }}>
            {this.region.latitude.toPrecision(7)},
            {this.region.longitude.toPrecision(7)}
          </Text>
        </View>
        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center' }}>
            {this.region.latitudeDelta.toPrecision(7)},
            {this.region.longitudeDelta.toPrecision(7)}
          </Text>
        </View>
*/
