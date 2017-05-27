import * as CONST from './_const'

const header = {
  root: {
    backgroundColor: '#311',
    position: 'fixed',
    top: 0,
    height: '70',
    width: '100%',
    color: 'white',
    zIndex: 1,
  },
  title: {
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'flex-start',
    // justify-content: flex-start (default) | flex-end | center | space-between | space-around
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  subtext: {
    fontSize: 18,
    // paddingLeft: 10,
    // lineHeight: '46px',
    marginTop: 3,
    color: CONST._selected_,
    whiteSpace: 'nowrap',
  },
  toolbar: {
    display: 'flex',
    paddingTop: 10,
    justifyContent: 'flex-end',
  },
}

export default header
