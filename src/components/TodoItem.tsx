import React from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
    todo: Todo;
    deleteTodo: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> =
    ({ todo }) => {
    return (
        <li>
            <span>{todo.description} ({todo.status})</span>

        </li>
    );
};

export default TodoItem;
