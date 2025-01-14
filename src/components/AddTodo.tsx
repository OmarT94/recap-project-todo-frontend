import React, { useState } from 'react';

type AddTodoFormProps = {
    addTodo: (description: string) => void;
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo(description);
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;
