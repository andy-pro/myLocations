import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map, { GoogleApiWrapper } from '../../browser/components/GoogleMapsReact/__index';
import { setRegion } from '../app/actions';
// import { IconButton } from '../__components/Icon';
import { IconButton } from '../../browser/components/icons';
import { findItemById } from '../__lib/find';
import validator from '../__lib/validator';
import { mainCSS, iconColors } from '../styles';

// import Map, { GoogleApiWrapper } from 'google-maps-react';
// import GoogleMap from 'google-map-react';

import { View } from '../components';

const initialCoords = [36.5174, -26.1953],
  initialZoom = 0.5,
  defaultZoom = 9;

class SimpleMapPage extends React.Component {
  // static propTypes = {
  //   center: PropTypes.array,
  //   zoom: PropTypes.number,
  // };

  // static defaultProps = {
  //   center: [59.938043, 30.337157],
  //   zoom: 9,
  //   greatPlaceCoords: { lat: 59.724465, lng: 30.080121 },
  //   //    <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
  //   //  <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
  // };

  constructor(props) {
    super(props);
  }

  render() {
    // console.log('props', this.props);

    /*
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyBAefhRlXEH3vCko-zZTX6PHllTR6av4WI',
            language: 'ru',
          }}
          center={this.props.center}
          zoom={this.props.zoom}
        />
    return (
      <View style={[mainCSS.fullWindow, { backgroundColor: 'grey' }]}>
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyAZaRY770THMIy_Oa03SUiluEUxh4f3skw',
            language: 'ru',
          }}
          center={[60.938043, 30.337157]}
          zoom={9}
        />
      </View>
    );
*/

    console.log('region', this.props.region);
    return (
      <Map
        containerStyle={{
          position: 'relative',
          width: '100%',
          height: 'initial',
          flex: 1,
        }}
        google={this.props.google}
        zoom={14}
        center={{
          lat: Number(this.props.region.latitude),
          lng: Number(this.props.region.longitude),
        }}
      />
    );
  }
}

const WrappedMap = GoogleApiWrapper({
  apiKey: 'AIzaSyAZaRY770THMIy_Oa03SUiluEUxh4f3skw',
})(SimpleMapPage);

class UniMap extends React.Component {
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
    return <WrappedMap region={this.region} />;
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
)(UniMap);
