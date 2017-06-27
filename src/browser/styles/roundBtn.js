import { colors } from '../../common/const';

export const roundBtnCSS = {
  button: {
    position: 'fixed',
    // position: 'absolute',
    bottom: 90,
    // right: 50,
    right: 25,
    borderRadius: 30,
    backgroundColor: colors.header,
    width: 60,
    height: 60,
    opacity: 0.5,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '2px 2px 15px black',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    textShadow: '2px 2px 4px black',
    // textShadowColor: 'black',
  },
};
