import { combineReducers } from 'redux'
import todoReducer, { State as TodoState } from './todo';

export interface RootState {
  todo: TodoState
}

export default () =>
  combineReducers({
    todo: todoReducer
  })
