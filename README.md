# NexusAI — Enterprise Large-Scale AI & Gamification Platform

![NexusAI Architecture](https://img.shields.io/badge/Architecture-Modular%20Layered-blue)
![Python](https://img.shields.io/badge/Python-3.11%2B-green)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688)
![Next.js](https://img.shields.io/badge/Next.js-14%2B-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16%20%2B%20pgvector-336791)
![Redis](https://img.shields.io/badge/Redis-7.0-red)

NexusAI is a full-stack, production-ready enterprise AI platform built for scaling multi-provider AI integrations (OpenAI, Google Gemini, Anthropic Claude, Local Ollama, HuggingFace) alongside dynamic **AI Workflows (DAGs)**, **Autonomous ReAct Agents**, **Document RAG Pipelines**, and an event-driven **Gamification Engine** (XP, Levels, Points, Badges, Daily Quests, Streaks, and Real-Time Leaderboards).

---

## Key Features

- 🔑 **Authentication & Role-Based Access Control (RBAC)**: JWT access/refresh tokens with Argon2id hashing and granular permissions (`SuperAdmin`, `Admin`, `ProUser`, `StandardUser`, `Guest`).
- 🤖 **Provider-Agnostic AI Layer**: Abstract driver interfaces supporting OpenAI, Google Gemini, Anthropic, Ollama, and HuggingFace with dynamic cost/latency routing and circuit breakers.
- ⚡ **AI Workflows (DAG Engine)**: Visual Directed Acyclic Graph executor supporting dynamic branching, condition evaluation, custom Python code nodes, document search, and prompt chaining.
- 🛠️ **Autonomous ReAct Agents**: Autonomous reasoning agents equipped with dynamic tools (`WebSearch`, `PythonREPL`, `DocumentSearch`, `Calculator`, `SQLQuery`, `HTTPWebhook`).
- 📚 **Document Analysis & RAG**: Multi-format parsing (PDF, DOCX, CSV, TXT) with recursive character chunking and hybrid dense/sparse vector search via PostgreSQL `pgvector`.
- 🎮 **Enterprise Gamification System**:
  - **XP & Level Progression**: Mathematical level curve $\text{Level} = \lfloor \sqrt{\text{XP}/100} \rfloor + 1$.
  - **Achievements & Badges**: Event-driven achievement evaluator with multi-tiered badges (Bronze to Diamond).
  - **Missions & Quests**: Daily and weekly quest boards with progress tracking and reward claims.
  - **Streaks & Multipliers**: Active interaction streak tracking with bonus multipliers.
  - **Leaderboards**: Redis `ZSET`-backed real-time global, weekly, and domain leaderboards.
- 📊 **Usage Tracking & Financial Analytics**: Token usage counters, per-request financial cost estimations, quota management, and platform governance dashboards.

---

## Directory Structure

```
.
├── docker-compose.yml
├── Dockerfile.backend
├── requirements.txt
├── .env.example
├── README.md
├── nexus_backend/
│   ├── main.py
│   ├── core/           # Config, Security, Database, Redis, Middleware, Exceptions
│   ├── models/         # SQLAlchemy 2.0 ORM Entities & pgvector schemas
│   ├── ai/             # AI Provider Adapters, Router, Token Counters, Circuit Breakers
│   ├── prompts/        # Prompt Templates & Versioning Engine
│   ├── chat/           # Conversation Manager & SSE Streaming
│   ├── rag/            # Document Parser, Text Chunkers & pgvector RAG Engine
│   ├── orchestration/  # AI Workflows (DAG Executor) & Autonomous ReAct Agents
│   ├── gamification/   # XP Engine, Badges, Quests, Streaks & Redis Leaderboards
│   ├── analytics/      # Financial Cost Calculator, Token Tracking & Rate Limiters
│   └── api/            # Modular FastAPI Routers & Pydantic V2 Schemas
├── nexus_frontend/     # Next.js 14 Web Application (React, TypeScript, Tailwind)
└── nexus_tests/        # Automated Pytest Suite (Unit, Integration, API, RAG, Gamification)
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+ & npm/yarn
- Docker & Docker Compose
- PostgreSQL 16 (with `pgvector` extension)
- Redis 7

### Installation & Local Setup

1. **Clone the Repository**:
   ```bash
   git clone <repo-url>
   cd "Ai platforms"
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```

3. **Run with Docker Compose**:
   ```bash
   docker-compose up -d --build
   ```

4. **Run Backend Locally**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn nexus_backend.main:app --reload --port 8000
   ```

5. **Run Automated Test Suite**:
   ```bash
   pytest nexus_tests/ -v
   ```

---

## API Documentation

Once the backend service is running, interactive API documentation is available at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## License

Enterprise Proprietary License. All rights reserved.
