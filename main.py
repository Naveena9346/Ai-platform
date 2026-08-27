"""
DataQuest AI Enterprise Platform Entry Point
Provides CLI commands, server initialization, database migrations, and pipeline runners.
"""

import os
import sys
import argparse
import uvicorn


def run_server(host: str = "127.0.0.1", port: int = 8000, reload: bool = False):
    """Start the DataQuest AI FastAPI application server."""
    print(f"🚀 Starting DataQuest AI Backend Server on http://{host}:{port}")
    sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))
    uvicorn.run("app.main:app", host=host, port=port, reload=reload)


def run_cli():
    """Command Line Interface for DataQuest AI Management."""
    parser = argparse.ArgumentParser(
        description="DataQuest AI - Gamified Enterprise AI/ML Platform CLI",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    subparsers = parser.add_subparsers(dest="command", help="Available Commands")

    # Serve command
    server_parser = subparsers.add_parser("serve", help="Run the FastAPI Uvicorn web server")
    server_parser.add_argument("--host", type=str, default="127.0.0.1", help="Host address to bind")
    server_parser.add_argument("--port", type=int, default=8000, help="Port number to listen on")
    server_parser.add_argument("--reload", action="store_true", help="Enable auto-reload for development")

    # Seed command
    subparsers.add_parser("seed", help="Seed default users, quests, and benchmark datasets")

    # Test command
    subparsers.add_parser("test", help="Execute automated PyTest test suite")

    args = parser.parse_args()

    if args.command == "serve" or args.command is None:
        host = getattr(args, "host", "127.0.0.1")
        port = getattr(args, "port", 8000)
        reload = getattr(args, "reload", False)
        run_server(host=host, port=port, reload=reload)
    elif args.command == "seed":
        print("🌱 Seeding DataQuest AI database with initial benchmark datasets and quests...")
        os.system("python -m app.db.init_db")
        print("✅ Seeding completed successfully.")
    elif args.command == "test":
        print("🧪 Running PyTest test suite...")
        os.system("cd backend && python -m pytest")


if __name__ == "__main__":
    run_cli()
