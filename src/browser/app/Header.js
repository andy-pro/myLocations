// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, HeaderBar, Title } from '../../common/__components'
import { colors, mainCSS, headerCSS } from '../../common/__themes'

const iconStyles = {
  // marginHorizontal: 10
  marginLeft: 5,
  marginRight: 5,
}

let iconColors = {
  common: colors.header,
  active: '#fff',
  disabled: '#fff',
  bgActive: colors.active,
  // bgActive: '#311',
  bgDisabled: colors.disabled,
  // bgDisabled: '#822',
  bgDelete: colors.alarm,
  delete: '#fff',
}

const Header = ({ messages, pattern }) => {

  const title = messages[`links.${pattern.slice(1) || 'home'}.title`]

  return (
    <View style={headerCSS.root}>
      <Title message={title} />
      <View style={mainCSS.fixContainer}>
        <HeaderBar
          style={headerCSS}
          iconStyles={iconStyles}
          iconColors={iconColors}
          pattern={pattern}
          title={title}
        />
      </View>
    </View>
  )

}

export default connect(
  ({ app }) => ({ messages: app.messages })
)(Header);
