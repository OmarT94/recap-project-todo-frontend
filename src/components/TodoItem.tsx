import React from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
    todo: Todo;
    deleteTodo: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> =
    ({ todo, deleteTodo }) => {
    return (
        <li>
            <span>{todo.description} ({todo.status})</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
