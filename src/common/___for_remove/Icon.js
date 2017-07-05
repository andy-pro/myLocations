import React from 'react';
import { View, Text, IconLinkPlatform, IconButtonPlatform } from '../components';
import Icon from './IconBase';
import { mainCSS, iconColors } from '../styles';
import os from '../os';

const IconButtonBase = ({ message, children, size, color = iconColors.main, name }) => {
  size = size || os.isBrowser ? (os.isTouchDevice ? 16 : 14) : 17;
  message = message || children;
  return (
    <View style={mainCSS.centerRow}>
      <Icon size={size * 1.65} color={color} name={name} />
      {message &&
        <Text
          style={{
            fontSize: size,
            color,
            fontWeight: '600',
            paddingHorizontal: 3,
          }}
        >
          {message}
        </Text>}
    </View>
  );
};

const IconButton = IconButtonPlatform(IconButtonBase);
const IconLink = IconLinkPlatform(IconButtonBase);

export { Icon, IconLink, IconButton };
