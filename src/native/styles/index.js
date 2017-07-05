import { StyleSheet } from 'react-native';
import { opts, colors, iconColors } from '../../common/const';

export { opts, colors, iconColors };
export { headerCSS } from './header';
export { sectionsCSS } from './sections';
export { roundBtnCSS } from './roundBtn';

/*
justifyContent: 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'
*/

export const mainCSS = StyleSheet.create({
  app: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    // backgroundColor: colors.background,
  },
  full: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    // backgroundColor: colors.background,
  },
  limited: {
    // flex: 1,
    maxWidth: opts.maxWidth,
    // width: '100%',
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'yellow',
    // justifyContent: 'space-between',
  },
  list: {
    flex: 1,
  },
  fullWindow: {
    width: '100%',
    height: '100%',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },

  text: {
    fontSize: opts.fontSize,
    color: colors.dark,
  },
  subTitle: {
    fontSize: opts.fontSize,
    fontWeight: '600',
    // color: colors.light,
    // lineHeight: opts.fontSize + 'px',
    // flexWrap: 'wrap',
  },

  divider: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
  },

  row: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // align-items: flex-start | flex-end | center | baseline | stretch (default)
    // alignItems: 'flex-start',
    // alignItems: 'center',
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  between: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  pullRightRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pullRightCol: {
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
    flexDirection: 'row',
  },
  formBtn: {
    marginBottom: 3,
  },
  input: {
    flex: 1,
    fontSize: opts.fontSize,
    paddingHorizontal: 8,
    paddingVertical: 1,
    // marginTop: 4,
  },
  picker: {
    flex: 1,
    // flexDirection: 'row',
    // paddingHorizontal: 8,
    // paddingLeft: -5,
    // margin: 0,
    height: 35,
    marginTop: 6,
    // lineHeight: 1,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 12,
    width: 80,
    justifyContent: 'center',
  },

  /* links */
  h_link: {
    marginHorizontal: 20,
    paddingHorizontal: 15,
    fontSize: opts.fontSize * 1.3,
    color: '#559',
    textDecorationLine: 'underline',
    // backgroundColor: '#ffa',
  },
  a_link: {
    padding: 6,
  },

  /* footer */
  footer: {
    // display: 'flex',
    backgroundColor: colors.footer,
    // bottom: 0,
    // position: 'fixed',
    width: '100%',
    height: opts.footerH,
  },
  f_link: {
    color: colors.light,
    fontSize: opts.fontSize * 0.8,
  },
});

export const checkboxCSS = StyleSheet.create({
  input: {
    flexDirection: 'row',
    marginVertical: 4,
    // marginTop: 6,
    marginLeft: 3,
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    // paddingVertical: 10,
    paddingRight: 10,
  },
});

export const iconStyles = {
  header: {
    // width: 38,
    // paddingLeft: 11,
    // paddingHorizontal: 10,
  },

  // native set 1
  // size: 30,
  // paddingLeft: 12,
  // paddingRight: 6,

  // native set 2
  // size: 30,
  // paddingLeft: 8,
  // paddingRight: 0,
};
