// @flow
import React from 'react';
import { View, Text, Image } from '../__components';
import { mainCSS } from '../__themes'

const earth = require('./earth.jpg')

const HomePage = () => {
  return (
    <View style={mainCSS.centerContainer}>
      <Image 
        source={earth}
        width={300}
      />
    </View>
  );
};

export default HomePage;
