import React, { useEffect } from 'react';
import TodoList from '../components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import * as todoActions from "../actions/todo"
import { RootState } from '../reducers';

const todosSelector = (state: RootState) => state.todo.todos

const TodoListContainer: React.FC = () => {
  const todos = useSelector(todosSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(todoActions.fetchTodos())
  }, [dispatch])

  return <TodoList todos={todos} />
}

export default TodoListContainer;
