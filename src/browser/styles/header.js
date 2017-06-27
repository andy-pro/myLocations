import { opts, colors } from '../../common/const';

export const headerCSS = {
  root: {
    backgroundColor: colors.header,
    position: 'fixed',
    top: 0,
    width: '100%',
    height: opts.headerH,
    color: colors.light,
    zIndex: 1,
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: opts.fontSize * 1.2,
    // marginVertical: 2,
  },
};
