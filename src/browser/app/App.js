// @flow
import React, { Component } from 'react';
import { Redirect, Miss } from 'react-router';
import { connect } from 'react-redux';
import { ThemeProvider } from 'react-fela';
import Helmet from 'react-helmet';

import * as themes from './themes';
import Page from './Page';

import { View } from '../../common/__components';
import favicon from '../../common/app/favicon';
import { appStart, appStop, resetMenu } from '../../common/app/actions';
import { categoryAction } from '../../common/categories/actions'
import showNotify from '../../common/__components/notify';
import { deleteConfirm } from '../../common/__components/Dialogs'

// Pages
import HomePage from '../../common/home/HomePage';
import CategoriesPage from '../../common/categories/CategoriesPage';
import LocationsPage from '../../common/locations/LocationsPage';
import MapPage from '../../common/map/MapPage';

class App extends Component {

  componentDidMount() {
    // Must be called after the initial render to match server rendered HTML.
    this.props.appStart();
    document.onkeydown = e => {
      // console.log('e.keyCode', e.keyCode);
      // esc
      if (e.keyCode == 27 && this.props.cmdToolbar) { 
        this.props.resetMenu()
        return false;
      }
      // delete
      /*
      if (e.keyCode == 46 && this.props.activeEntry) {
        let { entry } = this.props.activeEntry
        deleteConfirm(entry.name, () => this.props.categoryAction(entry.id, 'remove'))
        return false;
      }
      */
    }
  }

  componentWillUnmount() {
    // App is rerended on hot reload, therefore we need a proper cleanup.
    this.props.appStop();
  }

  shouldComponentUpdate({ cmdToolbar, activeEntry, notify }, nextState) {
    if (cmdToolbar !== this.props.cmdToolbar || activeEntry !== this.props.activeEntry) {
      return false
    }
    if (notify !== this.props.notify) {
      showNotify(notify, this.props.messages)
      return false
    }
    return true
  }

  render() {
    const { theme, themeName, currentLocale } = this.props
    // console.log('%cApp render', 'color:blue;font-weight:bold', currentLocale)
    return (
      <ThemeProvider
        key={themeName} // Enforce rerender.
        theme={theme}
      >
        <View>
          <Helmet
            htmlAttributes={{ lang: currentLocale }}
            meta={[
              // v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
              { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
              ...favicon.meta,
            ]}
            link={[
              ...favicon.link,
            ]}
            script={[
              { type: "text/javascript", src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZaRY770THMIy_Oa03SUiluEUxh4f3skw&extension=.js" },
              //{ type: "text/javascript", src: "https://maps.googleapis.com/maps/api/js" },
            ]}
          />
          <Page pattern="/" exactly component={HomePage} />
          <Page pattern="/categories" component={CategoriesPage} />
          <Page pattern="/locations" component={LocationsPage} />
          <Page pattern="/map" component={MapPage} />
        </View>
      </ThemeProvider>
    );
  }

}

export default connect(
  ({ app }) => ({
    cmdToolbar: app.cmdToolbar,
    activeEntry: app.activeEntry,
    notify: app.notify,
    messages: app.messages,
    currentLocale: app.currentLocale,
    themeName: app.currentTheme,
    theme: themes[app.currentTheme] || themes.defaultTheme,
  }),
  { appStart, appStop, resetMenu, categoryAction }
)(App);
