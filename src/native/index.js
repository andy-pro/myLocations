import React from 'react';
import { AppRegistry } from 'react-native';

import Root from './app/Root';

const myLocations = () => (
  <Root />
);

AppRegistry.registerComponent('myLocations', () => myLocations);
