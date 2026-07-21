# Test report

Audited on 2026-07-21 using the checked-out `phase4-shadowops-completion` branch on Windows.

| Command | Result | Evidence / notes |
|---|---|---|
| `backend lite: python -m pytest -q` | Pass | 40 tests passed with no warnings |
| `frontend: npm run lint` | Pass | TypeScript no-emit check passed |
| `frontend: npm run build` | Pass | Vite production bundle generated |
| `frontend: npm audit --omit=dev` | Pass | 0 vulnerabilities |
| Browser/API smoke | Pass | Real local health and `/decision`, local override, quarantine, benchmarks, incident report, return navigation |
| Media | Pass | 3:20.97, 1280×720 MP4/WebM, narrated audio, 7 cues, inspected frames, SHA-256 manifest |
| `Full training stack` | Not run | CUDA-specific dependencies were intentionally not installed |

## Overall status

Verified for the commands listed above. Unlisted platforms, deployments, external providers, and optional integrations were not inferred to work.

Warnings and missing checks remain limitations, even when another check passes.
