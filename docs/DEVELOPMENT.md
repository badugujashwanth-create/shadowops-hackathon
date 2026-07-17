# Development guide

## Purpose

Hackathon environment for evaluating and demonstrating safe agent decisions, policy constraints, replayable scenarios, and trained-adapter evidence.

## Prerequisites

Python, FastAPI, Pydantic, NumPy, React/TypeScript, optional PyTorch/Unsloth/vLLM.

## Install

```powershell
Backend lite: pip install -r backend-ml/requirements-lite.txt; frontend: npm ci --prefix frontend
```

## Run

```powershell
Run the backend environment/CLI and Vite frontend using the README commands
```

## Verify

- Tests: `backend pytest; frontend npm run lint`
- Build: `npm run build --prefix frontend`

See [TEST_REPORT.md](TEST_REPORT.md) for the latest audited results. Copy example environment files instead of committing real values. Generated dependencies, caches, logs, databases, and build output must remain untracked.

