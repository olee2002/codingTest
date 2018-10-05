import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'
import { employees } from './Employees'

const Reducers = combineReducers({
  router: routerReducer,
  me,
  employees
});

export default Reducers