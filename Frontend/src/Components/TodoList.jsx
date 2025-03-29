import React, { useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, setTodos }) {
    const fetchTodos = async () => {
        try {
            const response = await axios.get("http://localhost:5055/api/todos/");
            setTodos(response.data.todos);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
            ))}
        </ul>
    );
}

export default TodoList;
