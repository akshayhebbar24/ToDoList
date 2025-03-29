import React from "react";
import axios from "axios";

function TodoItem({ todo, fetchTodos }) {
    const handleComplete = async () => {
        try {
            await axios.put(`http://localhost:5055/api/todos/complete/${todo._id}`);
            fetchTodos();
        } catch (error) {
            console.error("Error completing task", error);
        }
    };

    const handleUpdate = async () => {
        const updatedTask = prompt("Update task:", todo.task);
        if (!updatedTask) return;
        try {
            await axios.put(`http://localhost:5055/api/todos/${todo._id}`, { task: updatedTask });
            fetchTodos();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5055/api/todos/${todo._id}`);
            fetchTodos();
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    return (
        <div className="todo-item" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <div className="todo-details">
                <strong>{todo.task}</strong>
                <span className="todo-meta">Priority: {todo.priority} | Due: {todo.dueDate}</span>
            </div>
            <div className="button-group">
                <button className="complete-button" onClick={handleComplete}>Complete</button>
                <button className="update-button" onClick={handleUpdate}>Update</button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default TodoItem;
