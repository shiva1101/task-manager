const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ─── GET all tasks ────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: "i" };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET single task ─────────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: "Task not found" });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── CREATE task ─────────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title) return res.status(400).json({ success: false, error: "Title is required" });

    const task = await Task.create({ title, description, status, priority });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ─── UPDATE task ─────────────────────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ success: false, error: "Task not found" });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ─── DELETE task ─────────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: "Task not found" });
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
