// @flow
import React from 'react';
import { connect } from 'react-redux';

import { View } from '../__components';

function ShowPositon(el, [x, y]) {
    // console.log('el', el, document);
    if (!window && !window.google) return
    var google = window.google
    var mapOptions = {
        center: new google.maps.LatLng(x, y),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(el, mapOptions);
    return (false);
}



class MapPage extends React.Component {

  componentDidMount() {
    let { activeEntry } = this.props,
        coords = activeEntry ? activeEntry.entry.coords : [50.6092, 33.4515]
    ShowPositon(this.map, coords)
  }

  render() {
    return (
      <View 
        style={{width: '100%', height: '100%'}} 
        $ref={c => this.map = c}
      />
    );
  }

};

export default connect(
  ({ app }) => ({
    activeEntry: app.activeEntry,
  })
)(MapPage);
