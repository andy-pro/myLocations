import React from 'react';
import { TouchableOpacity, View, Image } from '../components';
import { mainCSS } from '../styles';

const earth = require('./earth.jpg');

export default ({ history }) =>
  <View style={mainCSS.center}>
    <TouchableOpacity activeOpacity={0.9} onPress={() => history.push('/map')}>
      <Image source={earth} width={300} />
    </TouchableOpacity>
  </View>;
