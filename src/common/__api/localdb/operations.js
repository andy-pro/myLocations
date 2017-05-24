// import shortid from 'shortid'
import shortid from 'js-shortid'

import constants from './constants'
import Filter from './filter'
import config from '../../config'
import users from '../../__mockData/users'

import categories from '../../__mockData/categories'

export default operations = (file, { table, query }, state) => {

  // file - часть store для хранения базы данных

  // объект для фиксации данных в store.localdb
  const action = {
    type: constants.STATE,
    payload: file
  }

  let __table = file[table],
      payload, data

  switch (query.cmd) {

    case '$init':
      data = query.localdb || {}
      // console.log('state', state);
      // let categories = data.categories || [],
      let localdb = data[constants.filename] || {},
          transactions = localdb.transactions || []
      // payload = {
      //   user: users[config.userId],
      //   categories,
      //   transactions: Filter(transactions, query.query, '$pick', 1)
      // }


      payload = {
        // user,
        transactions: Filter(transactions, query.query, '$pick', 1)
      }
      if (!state.user) {
        console.log('!!! user init !!!');
        let user = users[config.userId]        
        user.categories = {title: 'Categories', sub: categories}
        payload.user = user
      }

      // for debug
      // var __data = payload.transactions[0]
      // console.log('localdb $get', typeof __data.rawDate, JSON.stringify(__data));
      // payload.transactions = [__data]
      // for debug

      return { payload }

    case '$add':
      data = query.data
      data = Array.isArray(data) ? data : [data]
      file[table] = __table.concat(__copy_and_id(data))
      return {
        action,
        payload: query.data
      }

    case '$replace':
      data = __del_and_calc(__table, query.query)
      // console.log('replace, db after delete', JSON.stringify(data));
      file[table] = data.payload.concat(__copy_and_id(query.data))
      // console.log('mode replace, db after add', file[table].length);
      return {
        action,
        payload: {
          removed: data.removed,
          added: query.data.length
        }
      }

    case '$del':
      data = __del_and_calc(__table, query.query)
      file[table] = data.payload
      return {
        action,
        payload: { removed: data.removed }
      }

    case '$get':
      payload = Filter(__table, query.query, '$pick', 1)
      // console.log('localdb $get', JSON.stringify(payload[0]));
      return { payload }

  }

}

// исходные данные - нужно возвратить тот же объект, но с id;
// в localdb нужно положить копию
const __copy_and_id = data => data.map(item => {
  // item.id = shortid.generate()
  item.id = shortid.gen()
  return Object.assign({}, item)
})

const __del_and_calc = (data, query) => {
  let payload = Filter(data, query, '$omit')
  return {
    payload,
    removed: data.length - payload.length
  }
}
