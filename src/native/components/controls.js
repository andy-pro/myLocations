import React from 'react';
import PropTypes from 'prop-types';
import { Link as NavLink } from 'react-router-native';
// import { Text, Linking, TouchableOpacity } from 'react-native';
import { TouchableOpacity } from 'react-native';

const TouchLink = ({ to, ...props }, { router }) =>
  <TouchableOpacity onPress={() => router.history.push(to)} {...props} />;

TouchLink.contextTypes = {
  router: PropTypes.object,
};

export { TouchLink };

export const IconButtonPlatform = IconButtonBase => ({ onPress, ...props }) =>
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <IconButtonBase {...props} />
  </TouchableOpacity>;

export const IconLinkPlatform = IconButtonBase => ({ to, ...props }) =>
  // let linkProps = {
  //   to,
  //   style: mainCSS.a_link,
  //   activeStyle: { color: iconColors.main, textDecoration: 'underline' },
  // };
  // if (os.isNative) linkProps.component = TouchableOpacity;
  <NavLink to={to} component={TouchableOpacity}>
    <IconButtonBase {...props} />
  </NavLink>;