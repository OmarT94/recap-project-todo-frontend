import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../types/Todo';
import TodoItem from "./TodoItem.tsx";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get('/api/todo')
            .then((response) => setTodos(response.data))
            .catch((error) => console.error('Error fetching todos:', error));
    }, []);

    const deleteTodo = (id: string) => {
        axios.delete(`/api/todo/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch((error) => console.error('Error deleting todo:', error));
    };

    return (
        <div>
            <h1>Todo List</h1>

            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
                ))}


            </ul>
        </div>
    );
};

export default TodoList;
