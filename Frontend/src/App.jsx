import React, { useState } from "react";
import AddTodo from "./Components/AddTodo.jsx";
import TodoList from "./Components/TodoList.jsx";
import "./styles.css"; // Assuming you have a CSS file for styling
function App() {
    const [todos, setTodos] = useState([]);

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <AddTodo setTodos={setTodos} />
            <TodoList todos={todos} setTodos={setTodos} />
        </div>
    );
}

export default App;
