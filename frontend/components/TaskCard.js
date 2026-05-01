import styles from "./TaskCard.module.css";

const STATUS_LABELS = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

const PRIORITY_COLORS = {
  low: "#60a5fa",
  medium: "#fbbf24",
  high: "#f87171",
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className={`${styles.card} ${styles[task.status.replace("-", "")]}`}>
      <div className={styles.top}>
        <div className={styles.meta}>
          <span
            className={styles.priority}
            style={{ color: PRIORITY_COLORS[task.priority] }}
          >
            ● {task.priority}
          </span>
          <span className={styles.date}>
            {new Date(task.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </span>
        </div>
        <div className={styles.menuActions}>
          <button className={styles.editBtn} onClick={() => onEdit(task)} title="Edit">✏️</button>
          <button className={styles.deleteBtn} onClick={() => onDelete(task._id)} title="Delete">🗑</button>
        </div>
      </div>

      <h3 className={styles.title}>{task.title}</h3>
      {task.description && <p className={styles.desc}>{task.description}</p>}

      <div className={styles.bottom}>
        <select
          className={styles.statusSelect}
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span className={`${styles.badge} ${styles[task.status.replace("-","")]}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>
    </div>
  );
}
