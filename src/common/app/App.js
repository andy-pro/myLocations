import React from 'react';
import { connect } from 'react-redux';

import { appStart, appStop, resetForm } from './actions';
import { View, withRouter } from '../components';
import Page from '../__components/Page';
import config from '../../common/config';
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
        if (this.props.cmdToolbar) {
          this.props.resetForm();
          return false;
        }
        return true;
      });
    }
  }

  componentWillUnmount() {
    this.props.appStop();
  }

  shouldComponentUpdate({ cmdToolbar, notify }) {
    if (cmdToolbar !== this.props.cmdToolbar) {
      return false;
    }
    // if (notify !== this.props.notify) {
    //   showNotify(notify, this.props.messages)
    //   return false
    // }
    return true;
  }

  render() {
    console.log('%cApp render', 'color:blue;font-weight:bold', this.props);
    return (
      <View>
        <Page path="/" exact component={HomePage} />
        <Page path="/categories" component={CategoriesPage} />
        <Page path="/locations/:category?" component={LocationsPage} />
        <Page path="/map/:location?" component={MapPage} />
      </View>
    );
  }
}

export default withRouter(
  connect(({ app }) => ({ cmdToolbar: app.cmdToolbar }), {
    appStart,
    appStop,
    resetForm,
  })(App)
);
