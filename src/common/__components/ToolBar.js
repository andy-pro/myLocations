import React from 'react';
import { connect } from 'react-redux';

import { cmdToolbar, setSortMode } from '../app/actions';
import { findNameByUrl } from '../__lib/find';
import { View, Text } from '../components';
import { deleteConfirm } from './Dialogs';
import { IconButton } from './Icon';
import { mainCSS, colors, iconStyles, iconColors } from '../styles';
import os from '../os';

// prettier-ignore
const icons = {
  // home: { key: 'home', title: 'Home', name: 'md-home', to: '/' },
  // menu: { key: 'menu', title: 'Menu', name: 'md-menu', act: 'toggleMenu' },
  back: { key: 'back', title: 'Back', name: 'md-arrow-back', act: 'goBack' },
  add: { key: 'add', title: 'Add', name: 'md-add-circle' },
  remove: { key: 'remove', title: 'Remove', name: 'md-remove-circle', dis: true, confirm: true },
  edit: { key: 'edit', title: 'Edit', name: 'md-edit', dis: true },
  map: { key: 'map', title: 'Map view', name: 'md-public', dis: true, act: 'next' },
  sort0: { key: 'sort0', title: 'Sort by alpha', name: 'fa-sort-alpha-asc', act: 'nextSort' },
  sort1: { key: 'sort1', title: 'Sort ascendant', name: 'fa-sort-numeric-asc', act: 'nextSort' },
  sort2: { key: 'sort2', title: 'Sort descendant', name: 'fa-sort-numeric-desc', act: 'nextSort' },
};

const ToolBar = ({
  history,
  urlParts,
  activeEntry,
  sortMode,
  layout,
  categories,
  locations,
  cmdToolbar,
  setSortMode,
}) => {
  let path = urlParts[0],
    // subTitle = urlParts[2],
    // _home = path === '/',
    _cats = path === '/categories',
    _locs = path === '/locations',
    entryName = activeEntry ? activeEntry.name : '',
    subTitle = findNameByUrl(urlParts, { categories, locations }),
    subTitleWidth;

  if (os.isNative) {
    let { width, height } = layout;
    subTitleWidth = {
      // 5 icons + gaps ~ 250px
      width: width ? width - 250 : 150,
    };
    // console.log('layout', width, height);
  }

  // sortMode = sortMode || { index: 1, name: 'sort-asc' };
  // console.log('ToolBar', sortMode, 'sort' + sortMode.index);

  // let { isBrowser } = os,
  // homeIcon = isBrowser ? 'home' : 'menu';

  const actions = {
    // toggleMenu: () => appShowMenu(),
    goBack: () => history.goBack(),
    nextSort: icon => {
      var i = /^sort(\d+)/.exec(icon.key);
      i = +i[1] + 1;
      i %= 3; // 0, 1, 2, 0, 1, 2, ...
      setSortMode(i);
    },
  };

  const __cmd = icon => {
    if (icon.to) return history.push(icon.to);
    if (icon.act) return actions[icon.act](icon);
    let cb = () => cmdToolbar({ cmd: icon.key, path, activeEntry });
    if (icon.confirm) {
      // console.log('activeEntry', activeEntry);
      deleteConfirm(entryName, cb);
    } else cb();
  };

  const iconSet = key => {
    let icon = icons[key],
      dis = icon.dis && !activeEntry;
    // dis = icon.dis;
    let set = {
      style: { ...iconStyles.header },
      backgroundColor: iconColors.bgMain,
      color: dis ? iconColors.disabled : iconColors.main,
      name: icon.name,
      title: icon.title,
    };
    if (!dis) {
      set.onPress = () => __cmd(icon);
    }
    return set;
  };

  return (
    <View style={mainCSS.between}>
      <View style={mainCSS.centerRow}>
        <IconButton {...iconSet('back')} />
        <Text style={[mainCSS.subTitle, { color: colors.light }, subTitleWidth]}>
          {entryName || subTitle}
        </Text>
      </View>
      {(_cats || _locs) &&
        <View style={mainCSS.between}>
          {activeEntry &&
            <View style={mainCSS.row}>
              <IconButton {...iconSet('add')} />
              <IconButton {...iconSet('remove')} />
              <IconButton {...iconSet('edit')} />
            </View>}
          <IconButton {...iconSet('sort' + sortMode.index)} />
        </View>}
    </View>
  );
};

export default connect(
  ({ app, categories, locations }) => ({
    activeEntry: app.activeEntry,
    sortMode: app.sortMode,
    layout: app.layout,
    categories,
    locations,
  }),
  { cmdToolbar, setSortMode }
)(ToolBar);
