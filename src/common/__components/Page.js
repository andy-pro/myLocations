import React from 'react';

import { Route, View } from '../components';
import Header from './Header';
import Footer from './Footer';
// import { IconLink } from './Icon';
import { mainCSS } from '../styles';
// import os from '../os';

export default ({ component: Component, path, exact }) => {
  // console.log('PAGE props', props);
  let size = mainCSS[path.startsWith('/map') ? 'full' : 'limited'];
  /* routerProps:
  {match: Object, location: Object, history: Object, staticContext: undefined,
    urlParts: Array (non-native, urlParts[0] - url root, urlParts[1] - root w/o slash)} */
  return (
    <Route
      exact={exact}
      path={path}
      render={routerProps => {
        routerProps.urlParts = routerProps.match.url
          .split('/')
          .map((e, i, a) => (i ? e : '/' + a[1]));
        return (
          <View style={mainCSS.root}>
            <Header {...routerProps} />
            <View style={mainCSS.main}>
              <View style={size}>
                <Component {...routerProps} />
              </View>
            </View>
            <Footer size={size} {...routerProps} />
          </View>
        );
      }}
    />
  );
};
