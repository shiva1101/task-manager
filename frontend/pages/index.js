import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import toast from "react-hot-toast";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { getTasks, createTask, updateTask, deleteTask } from "../utils/api";
import styles from "./index.module.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState({ status: "", priority: "", search: "" });
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.priority) params.priority = filter.priority;
      if (filter.search) params.search = filter.search;

      const res = await getTasks(params);
      const data = res.data.data;
      setTasks(data);
      setStats({
        total: data.length,
        pending: data.filter((t) => t.status === "pending").length,
        inProgress: data.filter((t) => t.status === "in-progress").length,
        completed: data.filter((t) => t.status === "completed").length,
      });
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      toast.success("Task created!");
      fetchTasks();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create task");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateTask(editingTask._id, data);
      toast.success("Task updated!");
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTask(id, { status });
      fetchTasks();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Full-stack task manager — Next.js + Express + MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <div className="container">
            <div className={styles.headerInner}>
              <div>
                <h1 className={styles.logo}>⬡ TaskFlow</h1>
                <p className={styles.subheading}>Next.js · Express · MongoDB</p>
              </div>
              <div className={styles.statsRow}>
                <Stat label="Total" value={stats.total} color="var(--text)" />
                <Stat label="Pending" value={stats.pending} color="var(--yellow)" />
                <Stat label="Active" value={stats.inProgress} color="var(--blue)" />
                <Stat label="Done" value={stats.completed} color="var(--accent)" />
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          {/* ── Form ── */}
          {editingTask ? (
            <TaskForm
              initial={editingTask}
              onSubmit={handleUpdate}
              onCancel={() => setEditingTask(null)}
            />
          ) : (
            <TaskForm onSubmit={handleCreate} />
          )}

          {/* ── Filters ── */}
          <div className={styles.filters}>
            <input
              className={styles.search}
              placeholder="🔍  Search tasks…"
              value={filter.search}
              onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
            />
            <select
              className={styles.select}
              value={filter.status}
              onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className={styles.select}
              value={filter.priority}
              onChange={(e) => setFilter((f) => ({ ...f, priority: e.target.value }))}
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* ── Task List ── */}
          {loading ? (
            <p className={styles.empty}>Loading tasks…</p>
          ) : tasks.length === 0 ? (
            <p className={styles.empty}>No tasks found. Create one above! ✨</p>
          ) : (
            <div className={styles.grid}>
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}
