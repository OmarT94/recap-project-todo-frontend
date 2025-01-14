import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import AddTodoForm from "./AddTodo.tsx";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    ///1. React.FC
    // React.FC ist ein TypeScript-Typ, der speziell für Functional Components in React verwendet wird. Es bietet Typ-Sicherheit für die Komponente.
    //
    // Was macht React.FC?
    // Typsicherheit für Props: Es hilft, die Typen der Props, die die Komponente akzeptiert, zu definieren und sicherzustellen, dass sie korrekt verwendet werden.
    // Es macht klar, dass TodoList eine React-Komponente ist.

    useEffect(() => {
        axios.get('/api/todo')
            .then((response) => setTodos(response.data))
            .catch((error) => console.error('Error fetching todos:', error));
    }, []);
    //1. Was ist useEffect?
    // useEffect ist ein React-Hook, der es ermöglicht, Nebeneffekte (Side Effects) in funktionalen Komponenten auszuführen. Beispiele für Side Effects sind:
    //
    // Daten von einer API abrufen.
    // Abonnements einrichten.
    // Event-Listener hinzufügen.

    const deleteTodo = (id: string) => {
        axios.delete(`/api/todo/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch((error) => console.error('Error deleting todo:', error));
    };
    //setTodos(todos.filter(todo => todo.id !== id)):
    // todos.filter(...) erstellt eine neue Liste, die alle Todos außer dem gelöschten Todo enthält.

    const addTodo = (description: string) => {
        axios.post('/api/todo', { description, status: 'OPEN' })
            .then((response) => setTodos([...todos, response.data]))
            .catch((error) => console.error('Error adding todo:', error));
    };
    //setTodos([...todos, response.data]):
    // Erstellt eine neue Todo-Liste, die alle bisherigen Todos (...todos) und das neue Todo (response.data) enthält.
    // Aktualisiert den State (setTodos), sodass die UI das neue Todo anzeigt.


    const updateTodo = (id: string, updatedTodo: Todo) => {
        axios.put(`/api/todo/${id}`, updatedTodo)
            .then((response) => {
                setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            })
            .catch((error) => console.error('Error updating todo:', error));
    };
    //setTodos(...):
    // Der State wird aktualisiert, indem die geänderte Todo-Liste erstellt wird:
    // todos.map(...):
    // Iteriert durch die aktuelle Liste aller Todos.
    // Vergleicht jedes todo.id mit der aktualisierten id.
    // Falls es ein Match gibt (das Todo mit der gesuchten ID), wird es durch die aktualisierte Version aus response.data ersetzt.
    // Falls kein Match vorliegt, bleibt das Todo unverändert.

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
//key ist ein spezielles Attribut in React.
//deleteTodo={deleteTodo}:
//
// Übergibt die Funktion deleteTodo als Prop.
// Diese Funktion wird in der TodoItem-Komponente verwendet, um das jeweilige Todo zu löschen.

export default TodoList;
