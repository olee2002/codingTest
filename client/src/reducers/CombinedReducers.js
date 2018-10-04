import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'
import { me } from './Me'

const Reducers = combineReducers({
  router: routerReducer,
  me,
  employees
});

export default Reducers