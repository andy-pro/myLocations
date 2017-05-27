import { Observable } from 'rxjs'
import { categoryAction } from '../categories/actions'
import { locationAction } from '../locations/actions'

export const appError = (error: Object) => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const dispatchError = error =>
  Observable.of(appError(error))

export const appStart = () => ({
  type: 'APP_START',
});

export const appStop = () => ({
  type: 'APP_STOP',
});

export const setCurrentLocale = locale => ({
  type: 'SET_CURRENT_LOCALE',
  payload: locale
});

export const setActiveEntry = payload => ({
  type: 'SET_ACTIVE_ENTRY',
  payload,
})

export const resetMenu = () => ({
  type: 'RESET_MENU',
})

export const resetActiveEntry = () => ({
  type: 'RESET_ACTIVE_ENTRY',
})

export const cmdToolbar = (opts) => {
  if (opts.name === 'remove') {
    let { pattern, entry } = opts.activeEntry,
        act
    switch (pattern) {
      case '/categories':
        act = categoryAction
        break;
      case '/locations':
        act = locationAction
        break;
    }
    return act(entry.id, opts.name)
}
  return {
    type: 'CMD_TOOLBAR',
    payload: opts
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const cmdUpdateLocal = payload => Observable.of(payload)

const cmdEpic = action$ =>
  action$.ofType('epic/UPDATE')
    .mergeMap(({ list, payload, cmd, opts={} }) =>
      cmdUpdateLocal(payload, cmd)
        .map(response => ({
          type: `${opts.notify ? 'notify/' : ''}${list}/UPDATED`,
          payload,
          opts,
          response,
          cmd,
        }))
        .catch(dispatchError)
    )

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  cmdEpic,
];