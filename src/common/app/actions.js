import { Observable } from 'rxjs';

export const appError = error => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const dispatchError = error => Observable.of(appError(error));

export const appStart = () => ({
  type: 'APP_START',
});

export const appStop = () => ({
  type: 'APP_STOP',
});

export const appShowMenu = menuShown => ({
  type: 'APP_SHOW_MENU',
  payload: menuShown,
});

export const setCurrentLocale = locale => ({
  type: 'SET_CURRENT_LOCALE',
  payload: locale,
});

export const appLayout = ({ width, height }) => ({
  type: 'APP_LAYOUT',
  payload: {
    // orientation: width > height ? 'LANDSCAPE' : 'PORTRAIT',
    isLandscape: width > height,
    width,
    height,
    aspectRatio: width / height,
  },
});

export const setSortMode = payload => ({
  type: 'SET_SORT_MODE',
  payload,
});

export const setMapView = payload => ({
  type: 'SET_MAP_VIEW',
  payload,
});

export const setActiveEntry = payload => ({
  type: 'SET_ACTIVE_ENTRY',
  payload,
});

export const resetActiveEntry = () => ({
  type: 'RESET_ACTIVE_ENTRY',
});

export const resetForm = () => ({
  type: 'RESET_FORM',
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const listAction = (list, payload, cmd, opts) => ({
  type: 'epic/UPDATE',
  list,
  payload,
  cmd, // add, edit, remove, purge, replace
  opts,
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const cmdToolbar = payload => {
  let { cmd, path, activeEntry } = payload;
  if (cmd === 'remove' || cmd === 'purge') {
    let list = path.replace(/^\//, '');
    return listAction(list, activeEntry.id, cmd);
  }
  payload.isForm = cmd === 'add' || cmd === 'edit';
  return {
    type: 'CMD_TOOLBAR',
    payload,
  };
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* It's just a stub, immediately resolving an observer.
   Here you can provide any asynchronous operation, for example, ajax request. 
   https://redux-observable.js.org/docs/basics/Epics.html */
const cmdUpdateLocal = payload => Observable.of(payload);

const cmdEpic = action$ =>
  action$.ofType('epic/UPDATE').mergeMap(({ list, payload, cmd, opts = {} }) =>
    cmdUpdateLocal(payload, cmd)
      .map(response => ({
        type: `${opts.notify ? 'notify/' : ''}${list}/UPDATED`,
        payload,
        opts,
        response,
        cmd,
      }))
      .catch(dispatchError)
  );

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [cmdEpic];
