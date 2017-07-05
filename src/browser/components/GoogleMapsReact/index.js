import React from 'react';
// import PropTypes from 'prop-types';

// import Map, { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import GoogleApiWrapper from './GoogleApiWrapper';
// import GoogleMap from 'google-map-react';

// import { View } from '../components';
// import { mainCSS } from '../../styles';

export const MAP_TYPES = {
  // STANDARD: 'standard',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  HYBRID: 'hybrid',
  TERRAIN: 'terrain',
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZaRY770THMIy_Oa03SUiluEUxh4f3skw',
})(
  class extends React.Component {
    onRegionChange = (mapProps, map) => {
      let zoom = map.getZoom(),
        latLng = map.getCenter();
      // console.log('=================== drag end, zoom', zoom, latLng.lat(), latLng.lng());
      this.props.onRegionChangeComplete({
        latitude: latLng.lat(),
        longitude: latLng.lng(),
        zoom,
      });
    };

    render() {
      let { google, initialRegion: center, mapType = 'roadmap', onPanDrag } = this.props;
      if (!google) return null;
      // console.log('%cBrowser Map render', 'color:red;font-weight:bold', this.props);
      // console.log('props', this.props);
      let { zoom } = center;
      this.zoom = zoom;
      return (
        <Map
          google={google}
          mapTypeId={mapType}
          mapTypeControl={false}
          zoom={zoom}
          center={{
            lat: center.latitude,
            lng: center.longitude,
          }}
          onDragend={(p, m) => {
            onPanDrag();
            this.onRegionChange(p, m);
          }}
          onZoomChanged={(p, m) => {
            if (m.getZoom() !== this.zoom) {
              this.onRegionChange(p, m);
            }
          }}
        />
      );
    }
  }
);
