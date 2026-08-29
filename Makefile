.PHONY: help install dev build test seed clean docker-up docker-down

help:
	@echo "DataQuest AI Management Commands:"
	@echo "  make install     Install all backend and frontend dependencies"
	@echo "  make dev         Run local development servers (Backend & Frontend)"
	@echo "  make build       Build frontend bundle and production assets"
	@echo "  make test        Execute automated backend and frontend tests"
	@echo "  make seed        Seed initial benchmark datasets and gamification quests"
	@echo "  make clean       Remove cached artifacts and temporary files"
	@echo "  make docker-up   Launch full enterprise stack via Docker Compose"

install:
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

dev:
	python main.py --reload

build:
	cd frontend && npm run build

test:
	cd backend && python -m pytest
	cd frontend && npm run test -- --run

seed:
	python main.py seed

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	rm -rf frontend/dist

docker-up:
	docker-compose up -d --build

docker-down:
	docker-compose down
