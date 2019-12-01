import { Actions } from '../actions/todo'
import { Reducer } from 'redux'
import { ActionTypes } from '../actions/action-types'
import { Todo } from '../types/types'

export interface State {
  todos: Array<Todo>
}

const initialState: State = {
  todos: [],
}

const todoReducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODOS_START: {
      return state
    }
    case ActionTypes.FETCH_TODOS_SUCCESS: {
      return { ...state, todos: action.payload }
    }
    case ActionTypes.FETCH_TODOS_FAIL: {
      return state
    }
    default: {
      return state
    }
  }
}

export default todoReducer
