import * as actions from './Actions'

export const creds = { credentials: 'same-origin' };

export function fetchMe() {
  return dispatch => {
    return fetch('/api/me.json', creds).
      then(response => response.json()).
      then(me => dispatch(actions.receiveMe(me)));
  }
}

export function getEmployees() {
  return dispatch => {
    return fetch('/api/employees')
      .then(response => response.json())
      .then(employees => dispatch(actions.getEmployees(employees)));
  }
}