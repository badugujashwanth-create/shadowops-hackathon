# Test report

Audited on 2026-07-17 using the checked-out `portfolio-polish` branch on Windows.

| Command | Result | Evidence / notes |
|---|---|---|
| `backend lite: python -m pytest -q` | Pass | 34 tests passed; 17 `datetime.utcnow` deprecation warnings |
| `frontend: npm run lint` | Pass | TypeScript no-emit check passed |
| `frontend: npm run build` | Pass | Vite production bundle generated |
| `Full training stack` | Not run | CUDA-specific dependencies were intentionally not installed |

## Overall status

Verified for the commands listed above. Unlisted platforms, deployments, external providers, and optional integrations were not inferred to work.

Warnings and missing checks remain limitations, even when another check passes.

