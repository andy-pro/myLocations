// @flow weak
import { createEpicMiddleware } from 'redux-observable';
// import createLoggerMiddleware from 'redux-logger';

import configureDeps from './deps';
import configureEpics from './epics';
import __config from '../config'

// Like redux-thunk, but with just one argument.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action,
  );

const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  const deps = configureDeps(initialState, platformDeps);
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = [
    injectMiddleware(deps),
    epicMiddleware,
    ...platformMiddleware,
  ];

/*
  const enableLogger = process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER
  // const enableLogger = false

  // const enableLogger = process.env.NODE_ENV !== 'production' && (
  //   process.env.IS_BROWSER || initialState.device.isReactNative
  // );

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLoggerMiddleware({
      collapsed: true,
    });
    middleware.push(logger);
  }


  if (module.hot && typeof module.hot.accept === 'function') {
    if (__config.isNative) {
      module.hot.accept(() => {
        const configureEpics = require('./epics').default;
        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    } else {
      module.hot.accept('./epics', () => {
        const configureEpics = require('./epics').default;
        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    }
  }
*/

  return middleware;
};

export default configureMiddleware;
