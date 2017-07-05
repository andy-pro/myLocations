import React from 'react';
import { connect } from 'react-redux';
import { cmdToolbar } from '../app/actions';
import { Text, TouchableHighlight } from '../components';
import { roundBtnCSS, colors } from '../styles';

export default connect(
  /* props */
  ({ app }) => ({
    cmdToolbar: app.cmdToolbar,
  }),
  /* actions */
  { setCmdToolbar: cmdToolbar }
)(({ urlParts, fullMapView, isMap, cmdToolbar, setCmdToolbar, history }) => {
  let cmd = cmdToolbar && cmdToolbar.cmd,
    path = urlParts[0],
    // hide = cmd === 'add' || cmd === 'edit' || path === '/' || path === '/map';
    hide = cmd === 'add' || cmd === 'edit' || path === '/';
  return hide
    ? null
    : <TouchableHighlight
        onPress={() => {
          let _map = path === '/map',
            payload = { cmd: 'add', path };
          if (_map) payload.external = true;
          setCmdToolbar(payload);
          if (_map) {
            setTimeout(() => history.push('/locations'), 0);
          }
        }}
        style={[
          roundBtnCSS.button,
          fullMapView && { bottom: 25 },
          isMap && { right: 50 },
        ]}
        underlayColor={colors.mainTouch}
      >
        <Text style={roundBtnCSS.text}>+</Text>
      </TouchableHighlight>;
});
// activeOpacity={0.4}
