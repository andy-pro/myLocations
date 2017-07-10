import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
// import { mainCSS, iconColors } from '../styles';
// import { TouchableOpacity, TouchableHighlight } from './fela';
import { TouchableOpacity } from './fela';

const TouchLink = ({ to, ...props }, { router }) =>
  <TouchableOpacity to={() => router.history.push(to)} {...props} />;

TouchLink.contextTypes = {
  router: PropTypes.object,
};

export { TouchLink };
