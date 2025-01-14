import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import './TodoItem.css'

type TodoItemProps = {
    todo: Todo;
    deleteTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Todo) => void;
    //updateTodo: (id: string, updatedTodo: Todo) => void:
    // updateTodo ist eine Funktion, die ein Todo mit einer neuen Beschreibung oder einem neuen Status aktualisieren soll.
    //
    // Sie erwartet die id des Todos, das aktualisiert werden soll, sowie das aktualisierte Todo-Objekt (updatedTodo).
    //
    // Die Funktion gibt auch nichts zurück (void).
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, updateTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    //isEditing ist eine State-Variable, die festlegt, ob sich das Todo gerade im Bearbeitungsmodus befindet.
    const [description, setDescription] = useState(todo.description);
    //description ist eine State-Variable, die die Beschreibung des Todos speichert.
    // Der Wert von description wird beim ersten Rendern der Komponente mit der todo.description initialisiert
    //  (also dem Wert der Beschreibung des jeweiligen Todos).
    // setDescription ist die Funktion, die verwendet wird, um den Wert von description zu ändern.
    // Diese Funktion wird oft aufgerufen, wenn der Benutzer das Eingabefeld für die Beschreibung bearbeitet.
    const [status, setStatus] = useState(todo.status);

    const handleUpdate = () => {
        const updatedTodo: Todo = { ...todo, description, status };
        updateTodo(todo.id, updatedTodo);
        setIsEditing(false);
    };

    return (
        <li className="todo-item">
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
