import React, { useState } from "react";
import axios from "axios";

function AddTodo({ setTodos }) {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    const addTodo = async () => {
        if (!task) return alert("Task cannot be empty!");
        if (!dueDate) return alert("Please select a due date!");

        const newTodo = { task, priority, dueDate };

        try {
            const response = await axios.post("http://localhost:5055/api/todos/", newTodo);
            if (response.data.success) {
                setTodos(prev => [...prev, response.data.todo]);
                setTask("");
                setPriority("Medium");
                setDueDate("");
            } else {
                console.error("Error adding task:", response.data.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="New Task" value={task} onChange={(e) => setTask(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button onClick={addTodo}>Add Task</button>
        </div>
    );
}

export default AddTodo;