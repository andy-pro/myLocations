import React from 'react';
import { connect } from 'react-redux';

import { View, IconButton, MapView, MAP_TYPES, PROVIDER_GOOGLE } from '../components';
import { setEntry } from '../app/actions';
import { findItemById } from '../__lib/find';
import validator from '../__lib/validator';
import { makeCancelable } from '../__lib/cancelablePromise';
import { mainCSS, iconColors } from '../styles';
import os from '../os';

// const defaultCoords = [50.6092, 33.4515];
// const defaultCoords = [28.95626, -3.493260];
const initialCoords = [36.5174, -26.1953], // center of world :)
  // const initialCoords = [37.774929, -122.419416], // San-Francisco

  // initialZoom = 0.5, // native
  // initialZoom = 2, // browser
  defaultZoom = 9;

class MapPage extends React.Component {
  // static propTypes = {
  //   provider: MapView.ProviderPropType,
  // };

  constructor(props) {
    super(props);
    if (props.dataReady) {
      this.region = this.getRegion(props);
    }
  }

  componentWillMount() {
    if (this.region) {
      this.setRegion(this.region);
    }
  }

  setRegion = region => {
    this.props.setEntry({ listName: 'map', entry: { region } });
  };

  getRegion = props => {
    let coords = this.getCoords(props),
      { x, y, zoom } = coords,
      delta = this.zoomToDelta(zoom);
    return {
      latitude: Number(x),
      longitude: Number(y),
      latitudeDelta: delta.x,
      longitudeDelta: delta.y,
      zoom,
    };
  };

  zoomToDelta = zoom => {
    let { isLandscape, width, height, aspectRatio } = this.props.layout,
      size = isLandscape ? height : width,
      x = size * 0.39 / Math.pow(1.82, zoom);
    return { x, y: x * aspectRatio, size };
  };

  componentWillReceiveProps(nextProps) {
    let { entry, dataReady, locations } = nextProps,
      region = entry ? entry.region : {},
      dataChanged =
        dataReady !== this.props.dataReady || locations !== this.props.locations;
    //prettier-ignore
    // console.log('MapPage receive new props', 'region changed:', region !== this.region, 'data changed:', dataChanged, nextProps);
    if (region !== this.region) {
      this.region = region;
    }
    if (dataChanged) {
      this.region = this.getRegion(nextProps);
      this.setRegion(this.region);
    }
  }

  onRegionChange = region => {
    /* react-native-maps, событие срабатывает сразу же после рендеринга, ? */
    // console.log('========= region change');
    if (!region.zoom) {
      region.zoom = this.regionToZoom(region);
    }
    if (this.manual) region.manual = true;
    this.setRegion(region);
    // console.log('region', region);
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
    // console.log('locations', locations, match);
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
      coords.initial = true;
      // zoom = initialZoom;
      zoom = os.isBrowser ? 2 : 0.5;
    }
    // ShowPositon(this.map, coords[0], coords[1], zoom);
    // console.log('calc coords from window.location', coords, zoom);
    return {
      x: Number(coords[0]),
      y: Number(coords[1]),
      zoom: Number(zoom),
      initial: coords.initial,
    };
  };

  getCurrentLocation = () => {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        this.geoPromise = makeCancelable(
          new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          })
        );

        this.geoPromise.promise
          .then(pos => {
            const coords = pos.coords;
            this.setState({
              currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude,
              },
            });
          })
          .catch(e => e);
      }
    }
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
    // console.log('map page render', this.props.mapViewMode, this.props.dataReady);
    if (!this.props.dataReady) return null;
    return (
      <View style={mainCSS.fullArea}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={ref => {
            this.map = ref;
          }}
          mapType={MAP_TYPES[this.props.mapViewMode]}
          style={mainCSS.fullMain}
          initialRegion={this.region}
          onRegionChangeComplete={this.onRegionChange}
          onPanDrag={() => (this.manual = true)}
        />
        {this.props.fullMapView && this.renderBackButton()}
      </View>
    );
  }
}

export default connect(
  ({ app, locations }) => ({
    entry: app.entry,
    mapViewMode: app.mapViewMode,
    locations,
  }),
  { setEntry }
)(MapPage);
