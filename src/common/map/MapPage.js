// @flow
import React from 'react';
import { connect } from 'react-redux';

import { View, Text } from '../__components';

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

// const MapPage = () => {
class MapPage extends React.Component {

  // setTimeout(() => {
  //   // this.view = 'test'
  //   // console.log('this.view', this.view);
  //   // let el = document.getElementById("map")
  //   // ShowPositon(el, 59.940224, 30.308533)

  // }, 1000);

  componentDidMount() {
    // console.log('this.map', this.map);
    console.log('activeEntry', this.props.activeEntry);

    let { activeEntry } = this.props,
        // coords = activeEntry ? activeEntry.coords : [59.940224, 30.308533]
        coords = activeEntry ? activeEntry.entry.coords : [50.6092, 33.4515]
        // coords = [50.6092, 33.4515]
    ShowPositon(this.map, coords)
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}} ref={c => this.map = c}></div>
    );
  }

};

export default connect(
  ({ app }) => ({
    activeEntry: app.activeEntry,
  })
)(MapPage);
