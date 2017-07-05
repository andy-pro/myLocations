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
        if (this.props.cmdToolbar) {
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

  shouldComponentUpdate({ cmdToolbar }) {
    if (cmdToolbar !== this.props.cmdToolbar) {
      // prevent re-render, but props must contain 'cmdToolbar'
      return false;
    }
    // if (notify !== this.props.notify) {
    //   showNotify(notify, this.props.messages)
    //   return false
    // }
    return true;
  }

  render() {
    // console.log('%cApp render', 'color:blue;font-weight:bold', this.props);
    console.log('%cApp render', 'color:blue;font-weight:bold');
    // <Page component={HomePage} />
    let mainViewProps = { style: mainCSS.app };
    if (os.isNative) {
      mainViewProps.onLayout = e => this.props.appLayout(e.nativeEvent.layout);
    }
    return (
      <View {...mainViewProps}>
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
    appLayout,
    resetForm,
  })(App)
);
