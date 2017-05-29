import * as CONST from './_const'

import categoriesCSS from './categories'
// import suggestionsCSS from './suggestions'
import locationsCSS from './locations'
import headerCSS from './header'

const colors = {
  header: CONST._main_,
  touch: '#eee',
  active: CONST._active_,
  selected: CONST._selected_,
  icon: '#eee',
  disabled: '#555',
  alarm: '#d66',
  success: '#18a06a',
}

const fontFamily = 'Arial, sans-serif'

const mainCSS = {

  root: {
    // flex: 1,
    fontFamily,
    position: 'absolute',
    top: 70,
    bottom: 50,
    left: 0,
    right: 0,
  },
  centerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixContainer: {
    marginHorizontal: 'auto',
    maxWidth: 450,
  },

  container: {
    marginHorizontal: 15,
    paddingVertical: 10,
    // marginTop: 70,
    marginBottom: 50,
  },

  form: {
    // flex: 1,
    // paddingTop: 15,
    paddingBottom: 10,
    // paddingHorizontal: 15,
    // backgroundColor: '#ffd',
  },

  divider: {
    borderBottomColor: 'silver',
    borderBottomWidth: 2,
    marginBottom: 10,
  },

  row: {
    display: 'flex',
    // align-items: flex-start | flex-end | center | baseline | stretch (default)
    // alignItems: 'flex-start',
    alignItems: 'baseline',
  },
  between: {
    display: 'flex',
    alignItems: 'flex-start',
    // justify-content: flex-start (default) | flex-end | center | space-between | space-around
    justifyContent: 'space-between',
  },
  pullRightRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pullRightCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  active: {
    backgroundColor: colors.selected,
  },
  // text-type input
  input: {
    width: 0,
    borderRadius: 4,
    border: '1px solid #bbb',
    outline: 0,
    flex: '1 0 auto',
    fontSize: 14,
    // flexDirection: 'row',
    // marginVertical: 5,
    // height: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
    // marginRight: 5
  },

  menu: {
    backgroundColor: CONST._main_,
    position: 'fixed',
    // top: 0,
    // left: 0,
    marginTop: 24,
    // paddingTop: 10,
    width: 150,
  },
  menuFooter: {
    backgroundColor: '#085',
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    height: 42,
    marginTop: 10,
    // color: '#aaa',
  },
  link: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    cursor: 'pointer',
    color: 'white',
    fontSize: 16,
    fontFamily,
    marginRight: 16,
  },

}

// global button styles for Ionicons
const buttonCSS = {
  backgroundColor: '#888',
  color: 'white',
  // paddingVertical: 5,
  // paddingTop: 5,
  // paddingBottom: 1,
  // paddingHorizontal: 0,
  outline: 0,
  border: 0,
  borderRadius: 4,
  // cursor: 'pointer',
  // height: 26,
  // verticalAlign: 'center'
}

const checkboxCSS = {
  input: {
    // marginLeft: 0,
    // marginRight: 10,

    // for TouchableOpacity and TouchableHighlight if set prop underlayColor
    // auto set property cursor=pointer (see fela/createComponent)
    // cursor: 'pointer',
  },
  image: {
    top: 4,
    position: 'relative',
    width: 18,
    marginRight: 10,
  },
  label: {
    color: '#555',
    fontSize: 14,
    paddingRight: 10,
    // cursor: 'pointer',
  },
  // pull to right
  // rinput: {
  //   marginLeft: 10,
  //   marginRight: 0,
  //   marginTop: 2,
  //   // cursor: 'pointer',
  // }
}

const iconBtnCSS = {}

mainCSS.picker = mainCSS.input

export {
  colors,
  mainCSS,
  categoriesCSS,
  // suggestionsCSS,
  locationsCSS,
  buttonCSS,
  checkboxCSS,
  headerCSS,
}
