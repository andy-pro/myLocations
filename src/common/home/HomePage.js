import React from 'react';
import { View, Image } from '../components';
import { mainCSS } from '../styles';

const earth = require('./earth.jpg');

export default () =>
  <View style={[mainCSS.center, mainCSS.fullWindow]}>
    <Image source={earth} width={300} />
  </View>;
