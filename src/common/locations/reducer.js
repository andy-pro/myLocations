import { REHYDRATE } from 'redux-persist/constants';
import mockData from '../__mockData';
import { cmdUpdateLocal } from '../__lib/utils';

const reducer = (state = [], action) => {
  switch (action.type) {
    case REHYDRATE:
      // load mock data for first run
      return action.payload.locations ? state : mockData.locations;

    case 'locations/UPDATED':
    case 'notify/locations/UPDATED':
      return cmdUpdateLocal(state, action);

    default:
      return state;
  }
};

export default reducer;
