import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  currentTheme: 'defaultTheme',
  error: null,
  notify: null,
  menuShown: false,
  online: false,
  started: false,
  listName: '',
  activeEntry: null,
  cmdToolbar: null,

  currentLocale: null,
  defaultLocale: null,
  locales: null,
  messages: null,
};

const sortModes = ['sort-alpha', 'sort-asc', 'sort-desc'];

const setLocale = (state, locale) => {
  // state.messages.setLanguage(locale);
  return { ...state, currentLocale: locale };
};

const reducer = (state = initialState, action) => {
  // Because it's called from the server/frontend/createInitialState.
  if (!action) return state;

  let { type, payload } = action;

  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // TODO: Refactor it. We don't want sticky strings.
  if (type.endsWith('_FAIL')) {
    // $FlowFixMe
    state = { ...state, error: payload.error };
  }

  if (type.startsWith('notify/')) {
    state = { ...state, notify: action.opts.notify };
  }

  switch (type) {
    case 'APP_ERROR':
      return { ...state, error: payload.error };

    case 'APP_SHOW_MENU':
      if (payload === undefined) {
        payload = !state.menuShown;
      }
      return { ...state, menuShown: payload };

    case 'APP_ONLINE':
      return { ...state, online: payload.online };

    case 'APP_START':
      return { ...state, started: true };

    case 'APP_LAYOUT':
      return { ...state, layout: payload };

    case 'SET_SORT_MODE':
      let name = sortModes[payload];
      return { ...state, sortMode: { index: payload, name } };

    case 'SET_ACTIVE_ENTRY':
      let { listName, entry } = payload;
      return { ...state, listName, activeEntry: entry };

    case 'RESET_ACTIVE_ENTRY':
      return { ...state, listName: '', activeEntry: null, cmdToolbar: null };

    case 'categories/UPDATED':
    case 'notify/categories/UPDATED':
    case 'locations/UPDATED':
    case 'notify/locations/UPDATED':
      if (action.cmd === 'remove') {
        state = { ...state, activeEntry: null };
        if (state.cmdToolbar && state.cmdToolbar.name === 'edit') state.cmdToolbar = null;
      }
      return state;

    case 'CMD_TOOLBAR':
      return { ...state, cmdToolbar: payload };

    case 'RESET_FORM':
      return { ...state, cmdToolbar: null };

    // process all the keys listed in 'config/storage.path
    case REHYDRATE:
      let { app } = payload;
      if (app) {
        if (app.currentLocale) state = setLocale(state, app.currentLocale);
        if (app.sortMode) state = { ...state, sortMode: app.sortMode };
      }
      return state;

    case 'SET_CURRENT_LOCALE':
      return setLocale(state, payload);

    default:
      return state;
  }
};

export default reducer;
