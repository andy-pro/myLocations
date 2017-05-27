import React, { Component } from 'react'
import MenuLink from './MenuLink'
import Icon from './icons/Ionicons'
import { Text } from './'

export default ({ to, message, ...icon }) => {

  return (
    <MenuLink to={to} message={message}>
      <Icon.Button
        { ...icon }
        buttonStyle={{
          marginRight: 6
        }}
      />
    </MenuLink>
  )

}
