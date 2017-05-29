import React from 'react';
import { connect } from 'react-redux';

import { View, Text, Icon } from './'
import { cmdToolbar } from '../app/actions'
import { deleteConfirm } from './Dialogs'
import { colors, mainCSS } from '../__themes'

const icons = {
  add:    { name: 'add', title: 'Add', icon: 'ios-add-circle-outline' },
  remove: { name: 'remove', title: 'Remove', icon: 'ios-remove-circle-outline', dis: true, confirm: true },
  edit:   { name: 'edit', title: 'Edit', icon: 'ios-create-outline', dis: true },
  view:   { name: 'view', title: 'View', icon: 'ios-eye-outline', dis: true },
  map:    { name: 'map', title: 'Map view', icon: 'ios-globe', dis: true, act: 'next' },
  sort:   { name: 'sort', title: 'Sort', icon: 'md-shuffle' },
}

const HeaderBar = ({ title, pattern, iconStyles, iconColors, style, activeEntry, cmdToolbar }, { router }) => {

  let _home = pattern === '/',
      _cats = pattern ==='/categories',
      _locs = pattern ==='/locations',
      entryName = activeEntry ? activeEntry.entry.name : ''

  const actions = {
    next: () => {
      if (_cats) return router.transitionTo('./locations')
      if (_locs) return router.transitionTo('./map')
    },
  }

  const __cmd = icon => {
    if (icon.to) return router.transitionTo(icon.to)
    if (icon.act) return actions[icon.act]()
    let cb = () => cmdToolbar({ name: icon.name, pattern, activeEntry })
    if (icon.confirm) {
      // console.log('activeEntry', activeEntry);
      deleteConfirm(entryName, cb)
    } else cb()
  }

  const iconSet = (name) => {
    let icon = icons[name],
        dis = icon.dis && !activeEntry
    let set = {
      style: { ...iconStyles },
      backgroundColor: iconColors.bgActive,
      color: dis ? colors.disabled : colors.icon,
      name: icon.icon,
      title: icon.title,
    }
    if (!dis) {
      set.onPress = () => __cmd(icon)
    }
    return set
  }

  return (
    <View style={{paddingHorizontal: 15}}>

      <View style={style.title}>
        <Text style={style.text}>
          {title}
        </Text>
      </View>

      {(_cats || _locs) &&
        <View style={mainCSS.between}>
          <View style={style.toolbar}>
            {entryName && 
              <Icon.Button { ...iconSet('map') }>
                {entryName}
              </Icon.Button>
            }
          </View>
          <View style={style.toolbar}>
            <Icon.Button { ...iconSet('add') } />
            <Icon.Button { ...iconSet('remove') } />
            <Icon.Button { ...iconSet('edit') } />
            {/*<Icon.Button { ...iconSet('view') } />*/}
            {_locs && <Icon.Button { ...iconSet('sort') } /> }         
          </View>
        </View>
      }

    </View>
  )
}

HeaderBar.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  ({ app }) => ({
    activeEntry: app.activeEntry,
  }),
  { cmdToolbar }
)(HeaderBar);
