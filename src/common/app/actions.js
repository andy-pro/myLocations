import { REHYDRATE } from 'redux-persist/constants';
import { Observable } from 'rxjs'

import { apiTransactions } from '../__api'
import * as dt from '../__lib/dateUtils'
import { Query } from '../transactions/utils'

export const appError = (error: Object) => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const dispatchError = error =>
  Observable.of(appError(error))

export const appOnline = (online: boolean) => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appShowMenu = (menuShown: boolean) => ({
  type: 'APP_SHOW_MENU',
  payload: { menuShown },
});

// Called on componentDidMount aka only at the client (browser or native).
export const appStart = () => ({
  type: 'APP_START',
});

export const appStop = () => ({
  type: 'APP_STOP',
});

export const changeMonth = (date=dt.getCurrentDate()) => ({
  type: 'MONTH_CHANGED',
  payload: date
});

export const setTheme = theme => ({
  type: 'SET_THEME',
  payload: { theme },
});

export const setCurrentLocale = locale => ({
  type: 'SET_CURRENT_LOCALE',
  payload: locale
});

export const changeCategoryView = () => ({
  type: 'CHANGE_CATEGORY_VIEW',
})

export const scanUserAsset = () => ({
  type: 'SCAN_USER_ASSET',
})

export const changeStatsMode = (name) => ({
  type: 'CHANGE_STATS_MODE',
  payload: name,
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* start application after rehydrate data */
// const appStartedFinanGoEpic = action$ => action$.ofType(REHYDRATE).map(getUserData)
/* store is:
  config: {appName, appVersion, locally, mongolab: {...}, storage, userId},
  getState(), getUid(), now(), storageEngine, uuid()
*/
const appStartedFinanGoEpic = (action$, store) =>
  action$.ofType(REHYDRATE)
    // payload - is a data from REHYDRATE, need for restore from localdb to store
    .switchMap(({ payload }) =>
      // Query без параметров - это запрос по дате за текущий месяц
      // store, $init - for localdb
      apiTransactions({ query: Query(), localdb: payload, cmd: '$init' }, store)
        .map(payload => ({
          type: 'user/LOADED',
          payload
        }))
        .catch(dispatchError)
    )
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  appStartedFinanGoEpic,
];
