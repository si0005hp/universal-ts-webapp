import { ActionTypes } from "./action-types"
import { Action, Dispatch } from "redux"
import { apiGet } from "../api/api"
import { Todo } from "../types/types"

export type Actions = ReturnType<typeof fetchTodosStart> | ReturnType<typeof fetchTodosSuccess> | ReturnType<typeof fetchTodosFail>

interface ErrorPayload {
  error: string
}

const fetchTodosStart = () => ({
  type: ActionTypes.FETCH_TODOS_START,
})

const fetchTodosSuccess = (payload: Array<Todo>) => ({
  type: ActionTypes.FETCH_TODOS_SUCCESS,
  payload
})

const fetchTodosFail = (payload: ErrorPayload) => ({
  type: ActionTypes.FETCH_TODOS_FAIL,
  payload
})

export const fetchTodos = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchTodosStart())
    try {
      const res = await apiGet('/todos')
      return dispatch(fetchTodosSuccess(res.data))
    } catch (e) {
      return dispatch(fetchTodosFail(e))
    }
  }
}
