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
    orientation: width > height ? 'LANDSCAPE' : 'PORTRAIT',
    width,
    height,
  },
});

export const setSortMode = payload => ({
  type: 'SET_SORT_MODE',
  payload,
});

export const setActiveEntry = payload => ({
  type: 'SET_ACTIVE_ENTRY',
  payload,
});

export const resetForm = () => ({
  type: 'RESET_FORM',
});

export const resetActiveEntry = () => ({
  type: 'RESET_ACTIVE_ENTRY',
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const listAction = (list, payload, cmd, opts) => ({
  type: 'epic/UPDATE',
  list,
  payload,
  cmd, // add, update, remove, purge, replace
  opts,
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const cmdToolbar = payload => {
  let { cmd, path, activeEntry } = payload;
  if (cmd === 'remove' || cmd === 'purge') {
    let list = path.replace(/^\//, '');
    return listAction(list, activeEntry.id, cmd);
  }
  return {
    type: 'CMD_TOOLBAR',
    payload,
  };
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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
