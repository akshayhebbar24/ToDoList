import express from "express";
import Todo from "../models/ToDoListModel.js";

const router = express.Router();


router.post("/", async (req, res) => {
    const { task, priority, dueDate } = req.body;
    try {
        const todo = await Todo.create({ task, priority, dueDate, completed: false });
        res.status(201).json({ success: true, todo });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({ success: true, todos });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) return res.status(404).json({ success: false, error: "Todo not found" });
        res.status(200).json({ success: true, todo: updatedTodo });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.put("/complete/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
        if (!updatedTodo) return res.status(404).json({ success: false, error: "Todo not found" });
        res.status(200).json({ success: true, todo: updatedTodo });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ success: false, error: "Todo not found" });
        res.status(200).json({ success: true, message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



export default router;
