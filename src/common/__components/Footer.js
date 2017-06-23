import React from 'react';
import { connect } from 'react-redux';
import { View } from '../components';
import RoundButton from './RoundButton';
import { IconLink } from './Icon';
import { mainCSS } from '../styles';

export default connect(({ app }) => ({
  cmdToolbar: app.cmdToolbar,
}))(({ size, urlParts, cmdToolbar }) => {
  let path = urlParts[0],
    cmd = cmdToolbar && cmdToolbar.cmd,
    show = !(path === '/' || path === '/map' || cmd === 'add' || cmd === 'edit');
  return (
    <View style={mainCSS.footer}>
      <View style={size}>
        <View style={mainCSS.centerContainer}>
          {show && <RoundButton path={urlParts[0]} />}
          <IconLink to="/categories" message="Categories" name="go-list-unordered" />
          <IconLink to="/locations" message="Locations" name="go-globe" />
        </View>
      </View>
    </View>
  );
});
