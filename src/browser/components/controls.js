import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import { Text, Linking, TouchableOpacity } from 'react-native';
import { mainCSS, iconColors } from '../styles';
import { TouchableOpacity, TouchableHighlight } from './fela';

const TouchLink = ({ to, ...props }, { router }) =>
  <TouchableOpacity to={() => router.history.push(to)} {...props} />;

TouchLink.contextTypes = {
  router: PropTypes.object,
};

export { TouchLink };

export const IconButtonPlatform2 = IconButtonBase => ({ onPress, title, ...props }) =>
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} title={title}>
    <IconButtonBase {...props} />
  </TouchableOpacity>;

export const IconButtonPlatform = IconButtonBase => ({ onPress, title, ...props }) =>
  <TouchableOpacity
    style={{ opacity: '0.8' }}
    onPress={onPress}
    activeOpacity={1}
    title={title}
  >
    <IconButtonBase {...props} />
  </TouchableOpacity>;

export const IconLinkPlatform = IconButtonBase => ({ to, ...props }) =>
  // let linkProps = {
  //   to,
  //   style: mainCSS.a_link,
  //   activeStyle: { color: iconColors.main, textDecoration: 'underline' },
  // };
  // if (os.isNative) linkProps.component = TouchableOpacity;
  <NavLink
    style={mainCSS.a_link}
    activeStyle={{ color: iconColors.main, textDecoration: 'underline' }}
    to={to}
  >
    <IconButtonBase {...props} />
  </NavLink>;
