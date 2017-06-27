import { opts, colors, iconColors } from '../../common/const';

export { colors, iconColors };
export { headerCSS } from './header';
export { sectionsCSS } from './sections';
export { roundBtnCSS } from './roundBtn';

export const mainCSS = {
  root: {
    fontFamily: opts.fontFamily,
    // fontSize: opts.fontSize,
    backgroundColor: colors.background,
  },
  main: {
    display: 'flex',
    // marginHorizontal: opts.gaps,
    // marginVertical: 60,
    paddingTop: opts.headerH,
    paddingBottom: opts.footerH,
    minHeight: '100vh',
  },
  page: {
    paddingVertical: 20,
    flex: 1,
  },
  limited: {
    // display: 'flex',
    position: 'relative',
    flex: 1,
    marginHorizontal: 'auto',
    maxWidth: 450,
    // height: '100%',
  },
  full: {
    // display: 'flex',
    // position: 'relative',
    flex: 1,
    // marginHorizontal: 'auto',
    // maxWidth: 450,
  },
  fullWindow: {
    width: '100%',
    height: '100%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
  },

  text: {
    fontSize: opts.fontSize,
    color: colors.dark,
  },
  subTitle: {
    fontSize: opts.fontSize,
    fontWeight: '600',
    lineHeight: opts.fontSize + 'px',
    // whiteSpace: 'nowrap',
  },

  divider: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
    // marginBottom: 10,
  },

  row: {
    display: 'flex',
  },
  centerRow: {
    display: 'flex',
    // align-items: flex-start | flex-end | center | baseline | stretch (default)
    // alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  between: {
    display: 'flex',
    alignItems: 'flex-start',
    // justify-content: flex-start (default) | flex-end | center | space-between | space-around
    justifyContent: 'space-between',
  },
  pullRightRow: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pullRightCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  active: {
    backgroundColor: colors.active,
  },

  /* form styles */
  form: {
    paddingBottom: 10,
    paddingHorizontal: opts.gaps - 5,
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 3,
  },
  formBtn: {
    marginHorizontal: 5,
  },
  input: {
    width: 0,
    outline: 0,
    flex: 1,
    fontSize: opts.fontSize * 0.9,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // marginBottom: 6,
    borderRadius: 4,
    marginHorizontal: 5,
    ...colors.border,
  },
  button: {
    display: 'flex',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    padding: 3,
    cursor: 'pointer',
    // paddingHorizontal: 2,
    // paddingVertical: 1,
  },

  /* links */
  v_link: {
    ':hover': {
      textDecoration: 'underline',
      // backgroundColor: colors.touch,
      // backgroundColor: 'red',
    },
    // cursor: 'pointer',
    fontSize: opts.fontSize * 0.9,
    // fontFamily: opts.fontFamily,
  },
  h_link: {
    display: 'inline-block',
    padding: '0 0.3em',
  },
  a_link: {
    ':hover': {
      textDecoration: 'underline',
      // backgroundColor: colors.touch,
    },
    fontSize: opts.fontSize * 0.9,
    // color: colors.dark,
    textDecoration: 'none',
    // textDecoration: 'inherit',
    padding: '6px 2px',
    // paddingTop: 6,
    // paddingBottom: 6,
    display: 'block',
    userSelect: 'none',
  },

  /* footer */
  footer: {
    display: 'flex',
    backgroundColor: colors.footer,
    bottom: 0,
    position: 'fixed',
    width: '100%',
    height: opts.footerH,
  },
  f_link: {
    color: colors.light,
    fontSize: opts.fontSize * 0.8,
  },
};

export const checkboxCSS = {
  input: {},
  image: {
    top: 4,
    position: 'relative',
    width: 18,
    marginRight: 10,
  },
  label: {
    color: colors.dark,
    fontSize: opts.fontSize * 0.9,
    paddingRight: 10,
    // cursor: 'pointer',
  },
};

mainCSS.picker = mainCSS.input;

export const iconStyles = {
  header: {
    display: 'flex',
    marginLeft: 5,
    marginRight: 5,
    // padding: 3,
  },
};
