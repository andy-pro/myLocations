import React from 'react';
// import { connect } from 'react-redux';

// import { Route, withRouter, Redirect, View } from '../components';
import { Route, Redirect, View } from '../components';
import Header from './Header';
import Footer from './Footer';
import RoundButton from './RoundButton';
import { mainCSS } from '../styles';

const minH = 400;

export default ({ component: Component, path = '', exact, dataReady, layout }) => {
  // console.log('PAGE props', props);
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
          let urlParts = routerProps.match.url
            .split('/')
            .map((e, i, a) => (i ? e : '/' + a[1]));
          /* urlParts:
              [0] - root path ('/', '/categories', '/locations', '/map')
              [1, ...] root and params w/o slashes ([''], ['categories'], ['locations', ':category'], ...)
            */
          /* screen layout, width, position of the RoundButton */
          let root = urlParts[0],
            isRoot = root === '/',
            isMap = root === '/map',
            height = layout.height || minH,
            fullMapView = isMap && layout.isLandscape && height < minH;
          Object.assign(routerProps, {
            dataReady,
            layout,
            urlParts,
            isMap,
            fullMapView,
          });
          //console.log('Page render', layout);
          return (
            <View style={mainCSS.root}>
              {!fullMapView && <Header {...routerProps} />}
              <Component {...routerProps} />
              <View style={[mainCSS.fullWidth, !isMap && mainCSS.limited]}>
                <RoundButton {...routerProps} />
              </View>
              {(isRoot || height >= minH) && <Footer />}
            </View>
          );
        }
      }}
    />
  );
};
