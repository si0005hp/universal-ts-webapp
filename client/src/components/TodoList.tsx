import React from 'react';
import { Todo } from '../types/types';

interface Props {
  todos: Array<Todo>
}

const TodoRow = ({ id, title, completed, userId }: Todo) => <li>{title}</li>

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="TodoList">
      <ul>
        {todos.map(todo => <TodoRow key={todo.id} {...todo} />)}
      </ul>
    </div>
  );
}

export default TodoList;
