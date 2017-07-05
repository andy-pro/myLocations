import React from 'react';
import { connect } from 'react-redux';

import { cmdToolbar, setSortMode, setMapView } from '../app/actions';
import { findNameByUrl } from '../__lib/find';
import { View, Text, IconButton } from '../components';
import { deleteConfirm } from './Dialogs';
import { opts, mainCSS, colors, iconStyles, iconColors } from '../styles';
import os from '../os';

const setHighlight = (icon, props) =>
  icon.key === props.mapViewMode ? iconColors.main : iconColors.disabled;

// prettier-ignore
const icons = {
  // home: { key: 'home', title: 'Home', name: 'md-home', to: '/' },
  // menu: { key: 'menu', title: 'Menu', name: 'md-menu', act: 'toggleMenu' },
  back: { key: 'back', title: 'Back', name: 'md-arrow-back', act: 'goBack' },
  add: { key: 'add', title: 'Add', name: 'md-add-circle' },
  remove: { key: 'remove', title: 'Remove', name: 'md-remove-circle', confirm: true, dis: true },
  edit: { key: 'edit', title: 'Edit', name: 'md-edit', dis: true},
  map: { key: 'map', title: 'Map view', name: 'md-public' },
  addCoords: { key: 'addCoords', title: 'Add coords', name: 'md-add-location', act: 'addCoords' },
  editCoords: { key: 'editCoords', title: 'Edit coords', name: 'md-edit-location', act: 'editCoords' },
  sort0: { key: 'sort0', title: 'Sort by alpha', name: 'fa-sort-alpha-asc', act: 'nextSort' },
  sort1: { key: 'sort1', title: 'Sort ascendant', name: 'fa-sort-numeric-asc', act: 'nextSort' },
  sort2: { key: 'sort2', title: 'Sort descendant', name: 'fa-sort-numeric-desc', act: 'nextSort' },
  
  STANDARD: { key: 'STANDARD', title: 'Standard road map', name: 'fa-road', color: setHighlight, act: 'mapView' },
  SATELLITE: { key: 'SATELLITE', title: 'Satellite view', name: 'md-satellite', color: setHighlight, act: 'mapView' },
  HYBRID: { key: 'HYBRID', title: 'Hybrid', name: 'my-sigma', color: setHighlight, act: 'mapView' },
  TERRAIN: { key: 'TERRAIN', title: 'Topographic view', name: 'md-terrain', color: setHighlight, act: 'mapView' },

};

const ToolBar = props => {
  let {
    history,
    urlParts,
    activeEntry,
    sortMode,
    layout,
    categories,
    locations,
    cmdToolbar,
    setSortMode,
    setMapView,
  } = props,
    path = urlParts[0],
    // subTitle = urlParts[2],
    // _home = path === '/',
    _cats = path === '/categories',
    _locs = path === '/locations',
    _map = path === '/map',
    entryName = activeEntry ? activeEntry.name : '',
    notList = activeEntry && !entryName,
    subTitle,
    subTitleCSS;

  // prettier-ignore
  if (activeEntry && activeEntry.manual) {
    subTitle = `${activeEntry.latitude.toPrecision(7)}, ${activeEntry.longitude.toPrecision(7)}`;
  } else {
    subTitle = entryName || findNameByUrl(urlParts, { categories, locations });
  }

  if (os.isNative) {
    let { width } = layout,
      max = opts.maxWidth;
    subTitleCSS = {
      // 5 icons + gaps ~ 250px
      width: width && width > max ? max - 250 : 150,
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
    mapView: icon => setMapView(icon.key),
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
      dis = icon.dis && notList,
      { color } = icon;

    color = color
      ? typeof color === 'function' ? color(icon, props) : color
      : dis ? iconColors.disabled : iconColors.main;

    // if (color) {
    //   if (typeof color === 'function') color=color(icon)
    // } else if(dis) color= iconColors.disabled
    // else color= iconColors.main

    let set = {
      style: { ...iconStyles.header },
      backgroundColor: iconColors.bgMain,
      color,
      name: icon.name,
      title: icon.title,
    };
    if (!dis) {
      set.onPress = () => __cmd(icon);
    }
    return set;
  };

  let _list = _cats || _locs,
    _edit = _list && activeEntry;
  return (
    <View style={mainCSS.between}>

      <View style={mainCSS.centerRow}>
        <IconButton {...iconSet('back')} />
        <Text style={[mainCSS.subTitle, { color: colors.light }, subTitleCSS]}>
          {subTitle}
        </Text>
      </View>

      <View style={mainCSS.centerRow}>
        {_edit && <IconButton {...iconSet('add')} />}
        {_edit && <IconButton {...iconSet('remove')} />}
        {_edit && <IconButton {...iconSet('edit')} />}
        {_list && <IconButton {...iconSet('sort' + sortMode.index)} />}
        {_map && <IconButton {...iconSet('STANDARD')} />}
        {_map && <IconButton {...iconSet('SATELLITE')} />}
        {_map && <IconButton {...iconSet('HYBRID')} />}
        {_map && <IconButton {...iconSet('TERRAIN')} />}
      </View>

    </View>
  );
};

export default connect(
  ({ app, categories, locations }) => ({
    activeEntry: app.activeEntry,
    sortMode: app.sortMode,
    mapViewMode: app.mapViewMode,
    layout: app.layout,
    categories,
    locations,
  }),
  { cmdToolbar, setSortMode, setMapView }
)(ToolBar);
