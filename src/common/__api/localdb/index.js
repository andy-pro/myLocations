import { Observable } from 'rxjs'
import constants from './constants'
import operations from './operations'

export const apiTransactions = (query, { dispatch, getState }) => {

  // console.log('localdb query', query)
  // let __start_time = performance.now()

  let state = getState(),
      file = state[constants.filename],
      $query = { table: 'transactions', query },
      cursor = operations(file, $query, state)

  // console.log('Operations localdb time', performance.now() - __start_time);

  // внесение именений в store.localdb, если необходимо
  if (cursor.action)
    dispatch(cursor.action)

  return Observable.of(cursor.payload)

}
