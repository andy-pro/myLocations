import { StyleSheet } from 'react-native';
import { opts, colors } from '../../common/const';

export const headerCSS = StyleSheet.create({
  root: {
    backgroundColor: colors.header,
    paddingHorizontal: 6,
    height: opts.headerH,
  },
  title: {
    color: colors.light,
    fontSize: opts.fontSize * 1.4,
  },
});
