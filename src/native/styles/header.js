import { StyleSheet } from 'react-native';
import { opts, colors } from '../../common/const';

export const headerCSS = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: colors.header,
    // paddingHorizontal: opts.gaps,
    height: opts.headerH,
    alignItems: 'center',
  },
  title: {
    color: colors.light,
    fontSize: opts.fontSize * 1.4,
    // lineHeight: '1',
    marginBottom: -3,
    textAlign: 'center',
  },
});
