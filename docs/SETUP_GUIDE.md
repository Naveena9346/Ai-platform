# DataQuest AI Setup & Local Development Guide

## System Requirements
- Operating System: Windows, macOS, or Linux
- Python: 3.11 or higher
- Node.js: 18.x or higher
- Docker Desktop: Installed and running
- Git: Installed

---

## Environment Setup Instructions

### 1. Backend Virtual Environment Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### 2. Frontend Dependencies Setup
```bash
# Navigate to frontend directory
cd frontend

# Install packages
npm install
```

### 3. PostgreSQL & Redis Infrastructure
```bash
# From project root directory
docker-compose up -d postgres redis
```

### 4. Database Migrations & Initial Seeding
```bash
cd backend
alembic upgrade head
python -m app.utils.seed_database
```

### 5. Running Development Servers
```bash
# Terminal 1: Backend API Server
cd backend
uvicorn app.main:app --reload --port 8000

# Terminal 2: Frontend Vite Server
cd frontend
npm run dev
```

Open your browser to `http://localhost:5173` to access DataQuest AI!
