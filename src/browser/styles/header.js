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
  toolbar: {
    display: 'flex',
    // height: 40,
    // paddingHorizontal: 15,
    alignItems: 'center',
    // justify-content: flex-start (default) | flex-end | center | space-between | space-around
    justifyContent: 'space-between',
  },
  // title: {
  //   // paddingHorizontal: 15,
  //   display: 'flex',
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  // },
  title: {
    fontSize: opts.fontSize * 1.2,
    // marginVertical: 2,
  },
  subTitle: {
    fontSize: opts.fontSize,
    fontWeight: '600',
    lineHeight: opts.fontSize + 'px',
    // whiteSpace: 'nowrap',
  },
};
