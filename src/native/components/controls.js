import React from 'react';
import PropTypes from 'prop-types';
import { Link as NavLink } from 'react-router-native';
// import { Text, Linking, TouchableOpacity } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import { mainCSS, iconColors } from '../styles';

const TouchLink = ({ to, ...props }, { router }) =>
  // <TouchableOpacity onPress={() => router.history.push(to)} {...props} />;
  <TouchableHighlight onPress={() => router.history.push(to)} {...props} />;

TouchLink.contextTypes = {
  router: PropTypes.object,
};

export { TouchLink };

export const IconButtonPlatform = IconButtonBase => ({
  style,
  backgroundColor = iconColors.bgMain,
  onPress,
  ...props
}) =>
  <TouchableOpacity
    style={[mainCSS.button, { backgroundColor, borderColor: backgroundColor }, style]}
    onPress={onPress}
    activeOpacity={0.7}
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
  <NavLink to={to} component={TouchableOpacity} style={mainCSS.a_link}>
    <IconButtonBase {...props} />
  </NavLink>;
