import { useState } from "react";
import styles from "./TaskForm.module.css";

const INITIAL = { title: "", description: "", status: "pending", priority: "medium" };

export default function TaskForm({ onSubmit, initial = null, onCancel }) {
  const [form, setForm] = useState(initial || INITIAL);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    if (!initial) setForm(INITIAL);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>{initial ? "Edit Task" : "New Task"}</h2>

      <div className={styles.field}>
        <label>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          required
        />
      </div>

      <div className={styles.field}>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add details (optional)"
          rows={3}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <button type="button" className={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Saving…" : initial ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}
