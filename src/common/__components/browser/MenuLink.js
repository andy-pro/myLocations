// @flow
import React from 'react';

import Link from './Link'

const MenuLink = ({ exactly, to, message, action, children }) => {

  return (
    <Link
      display='block'
      bold
      color="white"
      exactly={exactly}
      paddingHorizontal={0.7}
      paddingVertical={0.3}
      to={action || to}
      message={message}
    >
      {children}
      {message}
    </Link>
  )

}

export default MenuLink
