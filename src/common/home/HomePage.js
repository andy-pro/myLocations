import React from 'react';
import { View, Image } from '../components';
import { mainCSS } from '../styles';

const earth = require('./earth.jpg');

const HomePage = () => {
  return (
    <View style={mainCSS.centerContainer}>
      <Image source={earth} width={300} />
    </View>
  );
};

export default HomePage;
