# ⬡ TaskFlow — Full Stack Task Manager

A clean, end-to-end Task Manager built with:

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, React 18, CSS Modules |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
task-manager/
├── backend/         # Express + Node.js REST API
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API route handlers
│   └── server.js    # Entry point
└── frontend/        # Next.js app
    ├── components/  # React components
    ├── pages/       # Next.js pages
    ├── styles/      # Global CSS
    └── utils/       # Axios API helper
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the repo

```bash
git clone https://github.com/shiva1101/task-manager.git
cd task-manager
```

### 2. Set up Backend

```bash
cd backend
cp .env.example .env
# Edit .env and set your MONGO_URI
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

### 3. Set up Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports `?status=`, `?priority=`, `?search=`) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Example Request

```bash
# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","priority":"high"}'
```

---

## ✨ Features

- ✅ Full CRUD — Create, Read, Update, Delete tasks
- ✅ Filter by status and priority
- ✅ Search tasks by title
- ✅ Quick status change from the card
- ✅ Stats dashboard (total / pending / active / done)
- ✅ Responsive dark-mode UI

---

## 🛠 Tech Details

- **Mongoose** for MongoDB ODM with schema validation
- **CORS** configured for local dev (frontend ↔ backend)
- **react-hot-toast** for non-intrusive notifications
- **CSS Modules** for scoped, conflict-free styling
- **Next.js** `pages/` router with `_app.js` global wrapper
