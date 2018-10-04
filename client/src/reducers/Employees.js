import { merge } from '../utils'
import { GET_EMPLOYEES } from '../actions/Constants'

export function employees(
    state = {},
    action
) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return merge(state, action.employees)
        default:
            return state
    }
}