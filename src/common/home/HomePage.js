// @flow
import React from 'react';
import { View, Text, Image } from '../__components';

// const image = require('./earth.jpg')

const HomePage = () => {
  return (
    <View style={{textAlign: 'center', marginTop: '25vh'}}>
      <Image 
        source='http://itc.ua/wp-content/uploads/2015/01/Earth-600x600.jpg'
        width={300}
      />
    </View>
  );
};

export default HomePage;
