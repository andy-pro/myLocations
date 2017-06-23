import React from 'react';
import PropTypes from 'prop-types';

import { TouchableVirtual } from './fela';
// import { mainCSS } from '../styles';

const Link = ({ to, exactly, message, children, ...props }, { router }) => {
  // style={[style, mainCSS.v_link]}
  return (
    <TouchableVirtual to={() => router.history.push(to)} {...props}>
      {message}
      {children}
    </TouchableVirtual>
  );
};

Link.contextTypes = {
  router: PropTypes.object,
};

export default Link;
