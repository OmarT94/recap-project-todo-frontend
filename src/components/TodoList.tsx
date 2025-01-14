import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import AddTodoForm from "./AddTodo.tsx";

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

    const addTodo = (description: string) => {
        axios.post('/api/todo', { description, status: 'OPEN' })
            .then((response) => setTodos([...todos, response.data]))
            .catch((error) => console.error('Error adding todo:', error));
    };

    const updateTodo = (id: string, updatedTodo: Todo) => {
        axios.put(`/api/todo/${id}`, updatedTodo)
            .then((response) => {
                setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            })
            .catch((error) => console.error('Error updating todo:', error));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodoForm addTodo={addTodo} />
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                ))}


            </ul>
        </div>
    );
};

export default TodoList;
