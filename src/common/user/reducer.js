import config from '../config'
import {
  // addCategoryToPath,
  // updateCategoryByPath,
  // delCategoryByPath,
  cmdCategoryLocal,
} from '../__lib/utils';

export default function user(state=null, action) {

  switch (action.type) {

    case 'user/LOADED':
    // action.payload.user.categories = {title: 'Categories', sub: action.payload.user.categories}
      let r,
          p = action.payload
      if (config.locally) {
        // get mock user if first run 
        r = p.user || state
      } else r = p.user
      return r
      // return config.locally ? state : action.payload.user

    case 'categories/UPDATED':
    case 'notify/categories/UPDATED':
      if (config.locally) {
        return cmdCategoryLocal(state, action)
        // let { payload } = action
        // switch (action.cmd) {
        //   case 'add':
        //     return addCategoryToPath(state, payload)
        //   case 'update':
        //     return updateCategoryByPath(state, payload)
        //   case 'del':
        //     return delCategoryByPath(state, payload)
        //   case 'replace':
        //     return payload
        // }
      } else return action.response

    default:
      return state;
  }

}
