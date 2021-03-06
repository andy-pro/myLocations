import { opts, colors, iconColors } from '../../common/const';

export { colors, iconColors };
export { headerCSS } from './header';
export { sectionsCSS } from './sections';
export { roundBtnCSS } from './roundBtn';

// alignItems: flex-start | flex-end | center | baseline | stretch (default)
// justifyContent: flex-start (default) | flex-end | center | space-between | space-around

const col = {
  display: 'flex',
  flexDirection: 'column',
};

const center = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const mainCSS = {
  root: {
    ...col,
    fontFamily: opts.fontFamily,
    backgroundColor: colors.background,
    height: '100vh',
    alignItems: 'center',
  },
  fullMain: {
    // full along the main axis
    ...col,
    flex: 1,
    // width: '100%',
  },
  fullArea: {
    // full on both axes
    ...col,
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  fullWidth: {
    position: 'relative',
    width: '100%',
  },
  limited: {
    maxWidth: opts.maxWidth,
  },
  list: {
    overflow: 'auto',
  },
  fullWindow: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fillContainer: {
    position: 'relative',
    width: '100%',
    flex: 1,
  },
  center: {
    flex: 1,
    ...center,
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
  vgap20: {
    marginTop: 20,
  },

  row: {
    display: 'flex',
  },
  centerRow: {
    display: 'flex',
    ...center,
  },
  between: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  pullRightRow: {
    display: 'flex',
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
    paddingVertical: 6,
    paddingHorizontal: opts.gaps,
    backgroundColor: colors.active,
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 3,
  },
  formBtn: {},
  input: {
    ':focus': {
      borderColor: colors.mainTouch,
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,136,138,.6)',
    },
    width: 0,
    outline: 0,
    flex: 1,
    fontSize: opts.fontSize * 0.9,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // marginBottom: 6,
    borderRadius: 4,
    marginHorizontal: 5,
    transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
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
    marginHorizontal: 5,
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
