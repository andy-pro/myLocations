// @flow
import React from 'react';
import { View, Match, Footer } from '../../common/__components';
import Header from './Header';
import { mainCSS } from '../../common/__themes';

export default Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => ( // renderProps: isExact, location, params, pathname, pattern
      <View>
        <Header pattern={pattern} />
        <View style={mainCSS.root}>
          <Component {...renderProps} />
        </View>
        <Footer />
      </View>
    )}
  />
);
