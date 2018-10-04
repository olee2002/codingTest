import * as actions from './Constants'

export function receiveMe(me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}
export function getEmployees(employees) {
  return {
    type: actions.GET_EMPLOYEES,
    employees
  }
}