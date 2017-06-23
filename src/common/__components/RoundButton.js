import React from 'react';
import { connect } from 'react-redux';
import { cmdToolbar } from '../app/actions';
import { Text, TouchableOpacity } from '../components';
import { colors } from '../styles';

// const styles = StyleSheet.create({
const styles = {
  button: {
    // position: 'fixed',
    position: 'absolute',
    bottom: 90,
    // right: 50,
    right: 25,
    borderRadius: 30,
    backgroundColor: colors.header,
    width: 60,
    height: 60,
    opacity: 0.4,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '2px 2px 15px black',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    textShadow: '2px 2px 4px black',
    // textShadowColor: 'black',
  },
};

export default connect(null, { cmdToolbar })(({ path, cmdToolbar }) =>
  <TouchableOpacity
    onPress={() => cmdToolbar({ cmd: 'add', path })}
    underlayColor="#699"
    style={styles.button}
  >
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
);
