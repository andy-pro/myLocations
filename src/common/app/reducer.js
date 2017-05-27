import { getCurrentDate } from '../__lib/dateUtils'

const initialState = {
  currentTheme: 'defaultTheme',
  error: null,
  notify: null,
  menuShown: false,
  online: false,
  started: false,
  activeEntry: null,
  cmdToolbar: null,

  currentLocale: null,
  defaultLocale: null,
  locales: null,
  messages: null,

};

const setLocale = (state, locale) => {
  state.messages.setLanguage(locale)
  return { ...state, currentLocale: locale };
}

const reducer = (state=initialState, action) => {

  // Because it's called from the server/frontend/createInitialState.
  if (!action) return state;

  let { type, payload } = action

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
      return { ...state, menuShown: payload.menuShown };

    case 'APP_ONLINE':
      return { ...state, online: payload.online };

    case 'APP_START':
      return { ...state, started: true };

    case 'SET_ACTIVE_ENTRY':
      return { ...state, activeEntry: payload };

    case 'RESET_ACTIVE_ENTRY':
      return { ...state, activeEntry: null }

    case 'categories/UPDATED':
    case 'notify/categories/UPDATED':
      if (action.cmd === 'remove') {
        state = { ...state, activeEntry: null }
        if (state.cmdToolbar && state.cmdToolbar.name === 'edit') state.cmdToolbar = null
      }
      return state

    case 'RESET_MENU':
      return { ...state, cmdToolbar: null }

    case 'persist/REHYDRATE':
      if (payload.app && payload.app.currentLocale)
        return setLocale(state, payload.app.currentLocale)
      return state

    case 'SET_CURRENT_LOCALE':
      return setLocale(state, payload)

    case 'CMD_TOOLBAR':
      return { ...state, cmdToolbar: payload };

    default:
      return state;

  }
};

export default reducer;
