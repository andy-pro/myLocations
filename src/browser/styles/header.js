import { opts, colors } from '../../common/const';

export const headerCSS = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.header,
    height: opts.headerH,
    color: colors.light,
    // position: 'fixed',
    // top: 0,
    // zIndex: 1,
    // userSelect: 'none',
  },
  title: {
    display: 'block',
    fontSize: opts.fontSize * 1.2,
    textAlign: 'center',
    // marginVertical: 2,
  },
};
