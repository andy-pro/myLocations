import React from 'react';

import { View, Text, Icon, MenuLink, IconLink } from './'
import { mainCSS } from '../__themes'

const Footer = () => {

  let iconStyles = {
    set1: {
      marginRight: 10,
    },
  }

  let style ={
    bar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#311',
      bottom: 0,
      color: '#ccc',
      position: 'fixed',
      width: '100%',
      height: 50,
    }
  }

  return (
    <View style={style.bar}>

        <IconLink
          to='/categories'
          message='Categories'
          backgroundColor='#311'
          name="ios-list-box-outline"
        />

        <IconLink
          to='/locations'
          message='Locations'
          backgroundColor='#311'
          name="ios-globe"
        />

    </View>
  )
}

export default Footer;
