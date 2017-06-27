import React from 'react';
import { Route, Redirect, View } from '../components';
import Header from './Header';
import Footer from './Footer';
import RoundButton from './RoundButton';
import { mainCSS } from '../styles';

export default ({ component: Component, path = '', exact }) => {
  // console.log('PAGE props', props);
  /* screen width, position of the RoundButton */
  let width = mainCSS[path.startsWith('/map') ? 'full' : 'limited'];
  /* routerProps:
  {match: Object, location: Object, history: Object, staticContext: undefined,
    urlParts: Array (non-native, urlParts[0] - url root, urlParts[1] - root w/o slash)} */
  return (
    <Route
      exact={exact}
      path={path}
      render={routerProps => {
        /*  Single Page Apps for GitHub Pages
            https://github.com/rafrex/spa-github-pages
            Long live Single Page */
        let { search } = routerProps.location,
          qs = /^\?p=\/?(.+)/.exec(search);
        if (qs) {
          qs = '/' + qs[1];
          return <Redirect to={qs} />;
        } else {
          routerProps.urlParts = routerProps.match.url
            .split('/')
            .map((e, i, a) => (i ? e : '/' + a[1]));
          /* urlParts:
              [0] - root path ('/', '/categories', '/locations', '/map')
              [1, ...] root and params w/o slashes ([''], ['categories'], ['locations', ':category'], ...)
          */
          //console.log('urlParts', routerProps.urlParts);
          return (
            <View style={mainCSS.root}>
              <Header {...routerProps} />
              <View style={mainCSS.main}>
                <View style={width}>
                  <Component {...routerProps} />
                </View>
              </View>
              <RoundButton path={routerProps.urlParts[0]} />
              <Footer />
            </View>
          );
        }
      }}
    />
  );
};
