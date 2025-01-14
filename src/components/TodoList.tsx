import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../types/Todo';


const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get('/api/todo')
            .then((response) => setTodos(response.data))
            .catch((error) => console.error('Error fetching todos:', error));
    }, []);




    return (
        <div>
            <h1>Todo List</h1>
            <ul>

                ))


            </ul>
        </div>
    );
};

export default TodoList;
