# Recording guide

## Preparation

1. Install dependencies using docs/DEVELOPMENT.md.
2. Copy example environment files and use only local or synthetic values.
3. Start the demo with scripts/run-demo.ps1 or the component-specific command.
4. Confirm the complete workflow manually before recording.
5. Close notifications, unrelated applications, password managers, and personal browser profiles.

## Record

Start both the laptop-safe FastAPI process and frontend, confirm `/health`, then run `scripts/record-demo.ps1` with the healthy frontend `BaseUrl`. The Playwright specification captures a 1280×720 overview, thumbnail, and real browser/API workflow.

## Post-production

Do not splice in fake success states. Mux the reviewed narration into MP4 and WebM, keep `demo-captions.vtt` beside both formats, and verify duration, codecs, dimensions, audio level, representative frames, and SHA-256 checksums. Commit only final deliverables.
