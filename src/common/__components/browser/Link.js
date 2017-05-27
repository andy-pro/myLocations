import React from 'react';
import { Link as ReactRouterLink } from 'react-router';

import { Text, View, AnchorLink } from './fela';
import { mainCSS } from '../../__themes'

const isExternalLink = to => to.includes('://');

const Link = props => (
  typeof props.to === 'function' ?
    <View
      {...props}
      onClick={props.to}
    />
  :
  isExternalLink(props.to) ?
    <AnchorLink
      {...props}
      href={props.to}
      target="_blank"
    />
  :
    <ReactRouterLink 
      activeOnlyWhenExact={props.exactly}
      activeStyle={{ textDecoration: 'underline' }}
      to={props.to}
      style={mainCSS.link}
    >
      {props.children}
    </ReactRouterLink>
);

export default Link;
