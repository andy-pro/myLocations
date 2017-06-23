# myLocations

Collection management application demo for the Google Map locations.

## Try running it
* [Online demo](https://andy-pro.github.io/myLocations/)
* Download [myLocations.apk](https://github.com/andy-pro/icon-viewer/raw/master/myLocations.apk)

## Code sharing

The project demonstrates the possibility of maximum sharing of code between web and the React Native platforms. In fact, only `src/browser/Root.js` and `src/native/Root.js` differ, well, also, the code for some components and styles is different.

The boilerplate [web-native-app](https://github.com/andy-pro/web-native-app) is based on:

* [Create React App](https://github.com/facebookincubator/create-react-app)
* [React Native](https://github.com/facebook/react-native)
* [Este](https://github.com/este/este)

The stylization of the web components - [Fela](https://github.com/rofrischmann/fela). This approach allowed us to apply StyleSheets of the same structure.

### Browser Tasks

- `npm run browser` run web app in development mode
- `npm run build` build web app for production
- `npm run deploy` deploy to Github pages (configure `git remote` before this)

### React Native Tasks

- `npm run android` install React Native Android application
- `npm run native` start React Native application
- `npm run apk` generating the release APK
