import React from 'react';
import Map from '../../browser/components/GoogleMapsReact/Map';
import GoogleApiWrapper from '../../browser/components/GoogleMapsReact/GoogleApiWrapper';

class SimpleMapPage extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        center={{
          lat: 48,
          lng: 38,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZaRY770THMIy_Oa03SUiluEUxh4f3skw',
})(SimpleMapPage);
