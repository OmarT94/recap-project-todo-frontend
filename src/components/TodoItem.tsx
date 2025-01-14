import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
    todo: Todo;
    deleteTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, updateTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(todo.description);
    const [status, setStatus] = useState(todo.status);

    const handleUpdate = () => {
        const updatedTodo: Todo = { ...todo, description, status };
        updateTodo(todo.id, updatedTodo);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Todo['status'])}
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <span>
                        {todo.description} ({todo.status})
                    </span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            )}
        </li>
    );
};

export default TodoItem;
