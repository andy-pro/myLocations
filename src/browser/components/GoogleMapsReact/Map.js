import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { camelize } from './lib/String';
import invariant from 'invariant';

const mapStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
};

const evtNames = [
  'ready',
  'click',
  'dragend',
  'recenter',
  'bounds_changed',
  'center_changed',
  'dblclick',
  'dragstart',
  'heading_change',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'resize',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed',
];

export class Map extends React.Component {
  constructor(props) {
    super(props);
    invariant(props.hasOwnProperty('google'), 'You must include a `google` prop.');
    this.listeners = {};
  }

  componentDidMount() {
    this.loadMap();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillReceiveProps({ mapTypeId, center }) {
    let { google } = this.props,
      { maps } = google;
    if (mapTypeId !== this.props.mapTypeId) {
      this.map.setMapTypeId(mapTypeId);
    }
    if (center !== this.props.center) {
      if (!(center instanceof maps.LatLng)) {
        center = new maps.LatLng(center.lat, center.lng);
      }
      this.map.setCenter(center);
    }
  }

  componentWillUnmount() {
    const { google } = this.props;
    if (this.geoPromise) {
      this.geoPromise.cancel();
    }
    Object.keys(this.listeners).forEach(e => {
      google.maps.event.removeListener(this.listeners[e]);
    });
  }

  loadMap() {
    if (this.props && this.props.google) {
      let { props } = this,
        { center } = props,
        { maps } = props.google,
        mapRef = this.refs.map,
        node = ReactDOM.findDOMNode(mapRef);
      center = new maps.LatLng(center.lat, center.lng);
      const mapConfig = Object.assign(
        {},
        {
          center,
          mapTypeId: props.mapTypeId,
          zoom: props.zoom,
          maxZoom: props.maxZoom,
          minZoom: props.maxZoom,
          clickableIcons: Boolean(props.clickableIcons),
          disableDefaultUI: props.disableDefaultUI,
          zoomControl: props.zoomControl,
          mapTypeControl: props.mapTypeControl,
          scaleControl: props.scaleControl,
          streetViewControl: props.streetViewControl,
          panControl: props.panControl,
          rotateControl: props.rotateControl,
          scrollwheel: props.scrollwheel,
          draggable: props.draggable,
          keyboardShortcuts: props.keyboardShortcuts,
          disableDoubleClickZoom: props.disableDoubleClickZoom,
          noClear: props.noClear,
          styles: props.styles,
          gestureHandling: props.gestureHandling,
        }
      );

      Object.keys(mapConfig).forEach(key => {
        // Allow to configure mapConfig with 'false'
        if (mapConfig[key] === null) {
          delete mapConfig[key];
        }
      });

      this.map = new maps.Map(node, mapConfig);

      evtNames.forEach(name => {
        const handlerName = `on${camelize(name)}`;
        if (this.props[handlerName]) {
          this.listeners[name] = this.map.addListener(
            name,
            this.handleEvent(handlerName)
          );
        }
      });

      maps.event.trigger(this.map, 'ready');
      // this.forceUpdate();
    }
  }

  handleEvent = (name, timeout) => e => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      this.props[name](this.props, this.map, e);
    }, 0);
  };

  renderChildren() {
    const { children, center, google } = this.props;
    if (!children) return;
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: google,
        mapCenter: center,
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map, this.props.style, {
      display: this.props.visible ? 'inherit' : 'none',
    });
    const containerStyles = Object.assign(
      {},
      mapStyles.container,
      this.props.containerStyle
    );
    // console.log('+++++++render Google Map React++++++++++', this.props.google);
    return (
      <div style={containerStyles} className={this.props.className}>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  centerAroundCurrentLocation: PropTypes.bool,
  center: PropTypes.object,
  initialCenter: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  visible: PropTypes.bool,
  mapTypeId: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  clickableIcons: PropTypes.bool,
  disableDefaultUI: PropTypes.bool,
  zoomControl: PropTypes.bool,
  mapTypeControl: PropTypes.bool,
  scaleControl: PropTypes.bool,
  streetViewControl: PropTypes.bool,
  panControl: PropTypes.bool,
  rotateControl: PropTypes.bool,
  scrollwheel: PropTypes.bool,
  draggable: PropTypes.bool,
  keyboardShortcuts: PropTypes.bool,
  disableDoubleClickZoom: PropTypes.bool,
  noClear: PropTypes.bool,
  styles: PropTypes.array,
  gestureHandling: PropTypes.string,
};

evtNames.forEach(e => (Map.propTypes[camelize(e)] = PropTypes.func));

Map.defaultProps = {
  style: {},
  containerStyle: {},
  visible: true,
};

export default Map;
