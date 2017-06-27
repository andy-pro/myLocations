import React from 'react';
import { TouchableOpacity, View, Text, NavLink } from '../components';
import IconBase from './IconBase';
import { mainCSS, iconColors } from '../styles';
import os from '../os';

const Icon = ({ name, color, size = 32 }) => {
  return <IconBase name={name} fill={color} size={size} />;
};

const IconButton = ({
  message,
  children,
  title,
  // size = 14, // size: isBrowser ? 15 : 20,
  // size = iconProps.linkSize, // size: isBrowser ? 15 : 20,
  size,
  color = iconColors.main,
  backgroundColor = iconColors.bgMain,
  style,
  name,
  onPress,
}) => {
  // size = 15;
  // console.log('os', os);
  size = size || os.isBrowser ? (os.isTouchDevice ? 16 : 14) : 20;
  message = message || children;
  return (
    <TouchableOpacity
      style={[
        mainCSS.button,
        {
          borderColor: backgroundColor,
          backgroundColor,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      title={title}
    >
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
    </TouchableOpacity>
  );
};

const Demo = props =>
  <TouchableOpacity
    style={[
      mainCSS.button,
      {
        borderColor: props.backgroundColor,
        backgroundColor: props.backgroundColor,
      },
      props.style,
    ]}
    onPress={props.onPress}
    activeOpacity={0.8}
    title={props.title}
  >
    <View>

      <Icon name={props.name} />
      <Text>
        {props.message}
      </Text>
    </View>
  </TouchableOpacity>;

const IconLink = ({
  to,
  message,
  children,
  title,
  // size = 14, // size: isBrowser ? 15 : 20,
  // size = iconProps.linkSize, // size: isBrowser ? 15 : 20,
  size,
  color = iconColors.main,
  backgroundColor = iconColors.bgMain,
  style,
  name,
  onPress,
}) => {
  size = size || os.isBrowser ? (os.isTouchDevice ? 16 : 14) : 20;
  message = message || children;
  return (
    <NavLink
      style={mainCSS.a_link}
      activeStyle={{ color: iconColors.main, textDecoration: 'underline' }}
      to={to}
      component={TouchableOpacity}
    >
      <TouchableOpacity
        style={[
          mainCSS.button,
          {
            borderColor: backgroundColor,
            backgroundColor,
          },
          style,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
        title={title}
      >
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
      </TouchableOpacity>
    </NavLink>
  );
};

export { Icon, IconButton, IconLink };
