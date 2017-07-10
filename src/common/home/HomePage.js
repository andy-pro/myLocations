import React from 'react';
import { TouchableOpacity, View, Image } from '../components';
// import { TouchableOpacity, View, Image, Svg, Circle, Rect, SvgText } from '../components';
import { mainCSS } from '../styles';

const earth = require('./earth.jpg');

export default ({ history, layout }) => {
  let size = layout.height ? Math.min(300, layout.height - 150) : 300;
  return (
    <View style={[mainCSS.fullMain, mainCSS.center]}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => history.push('/map')}>
        <Image source={earth} style={{ width: size, height: size }} />
      </TouchableOpacity>
    </View>
  );
};
