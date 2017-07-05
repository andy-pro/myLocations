import React from 'react';
import { NavLink } from 'react-router-dom';

import { Text, AnchorLink, TouchableHighlight } from './fela';
import { mainCSS } from '../styles';

const Link = ({ to, exactly, style, message, children, ...props }) =>
  typeof to === 'function'
    ? <Text onClick={to} style={mainCSS.t_link} />
    : to.includes('://')
      ? <AnchorLink href={to} target="_blank" style={[mainCSS.h_link, style]} {...props}>
          {props.message}
        </AnchorLink>
      : <TouchableHighlight style={[style, mainCSS.v_link]} {...props}>
          <NavLink
            exact={props.exactly}
            to={to}
            style={mainCSS.a_link}
            activeStyle={{ textDecoration: 'underline' }}
          >
            {message}
            {children}
          </NavLink>
        </TouchableHighlight>;

export default Link;
