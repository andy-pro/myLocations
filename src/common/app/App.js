import React from 'react';
import { connect } from 'react-redux';

import { appStart, appStop, appLayout, resetForm } from './actions';
import { View, withRouter } from '../components';

import Page from '../__components/Page';
import config from '../../common/config';
import { mainCSS } from '../styles';
import os from '../../common/os';

// Pages
import HomePage from '../home/HomePage';
import CategoriesPage from '../categories/CategoriesPage';
import LocationsPage from '../locations/LocationsPage';
import MapPage from '../map/MapPage';

class App extends React.Component {
  componentDidMount() {
    this.props.appStart();
    if (config.hardwareBackPress) {
      os.subscribe('hardwareBackPress', () => {
        if (this.props.command) {
          this.props.resetForm();
          return true;
        }
        return false;
      });
    }
  }

  componentWillUnmount() {
    this.props.appStop();
  }

  shouldComponentUpdate(nextProps) {
    // console.log('nextProps', Object.keys(nextProps.location));
    // console.log('nextProps', nextProps.location.pathname);
    return (
      nextProps.layout !== this.props.layout ||
      nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.dataReady !== this.props.dataReady
    );
  }

  // shouldComponentUpdate({ command }) {
  //   if (command !== this.props.command) {
  //     // prevent re-render, but props must contain 'command'
  //     return false;
  //   }
  //   // if (notify !== this.props.notify) {
  //   //   showNotify(notify, this.props.messages)
  //   //   return false
  //   // }
  //   return true;
  // }

  render() {
    // console.log('%cApp render', 'color:blue;font-weight:bold', this.props);
    let { layout, dataReady } = this.props,
      props = { layout, dataReady },
      mainViewProps = { style: mainCSS.fullMain };
    if (os.isNative) {
      mainViewProps.onLayout = e => this.props.appLayout(e.nativeEvent.layout);
    }
    // console.log('App render', layout);
    return (
      <View {...mainViewProps}>
        <Page path="/" exact component={HomePage} {...props} />
        <Page path="/categories" component={CategoriesPage} {...props} />
        <Page path="/locations/:category?" component={LocationsPage} {...props} />
        <Page path="/map/:location?" component={MapPage} {...props} />
      </View>
    );
  }
}

export default withRouter(
  connect(
    ({ app }) => ({
      command: app.command,
      dataReady: app.dataReady,
      layout: app.layout,
    }),
    {
      appStart,
      appStop,
      appLayout,
      resetForm,
    }
  )(App)
);
