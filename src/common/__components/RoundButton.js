import React from 'react';
import { connect } from 'react-redux';
import { cmdToolbar } from '../app/actions';
import { Text, TouchableOpacity, TouchableHighlight } from '../components';
import { roundBtnCSS, colors } from '../styles';

export default connect(
  /* props */
  ({ app }) => ({
    cmdToolbar: app.cmdToolbar,
  }),
  /* actions */
  { setCmdToolbar: cmdToolbar }
)(({ path, cmdToolbar, setCmdToolbar }) => {
  let cmd = cmdToolbar && cmdToolbar.cmd,
    hide = cmd === 'add' || cmd === 'edit' || path === '/' || path === '/map';
  return hide
    ? null
    : <TouchableOpacity
        onPress={() => setCmdToolbar({ cmd: 'add', path })}
        style={roundBtnCSS.button}
        activeOpacity={0.4}
      >
        <Text style={roundBtnCSS.text}>+</Text>
      </TouchableOpacity>;
});

// underlayColor={colors.mainTouch}
