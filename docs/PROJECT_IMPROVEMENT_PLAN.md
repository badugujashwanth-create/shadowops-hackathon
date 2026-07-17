# Project Improvement Plan

## Current state

ShadowOps is a collaborative fork with ambitious ML/security artifacts, but upstream/team work dominates and individual contribution is not clear enough for primary portfolio use.

## Findings

- **Works:** integration/demo material, substantial shared artifacts, and portfolio-branch CI/documentation additions.
- **Does not / missing:** clean individual provenance, reproducible owned training/evaluation, and comprehensive tests.
- **UX / architecture:** generated/artifact-heavy history obscures maintainable product boundaries.
- **Testing / security:** claims about model/security effectiveness require upstream evidence; machine-specific training paths existed in artifacts.
- **Performance / docs / demo:** training cost and evaluation reproducibility are unclear; a video does not resolve ownership.

## Recommendations

### Critical

- Preserve explicit fork/upstream/team/individual attribution and remove machine-specific paths.
- Exclude from pins and sole-authored flagship claims.

### High value

- Only if team evidence becomes available, document a reproducible evaluation tied to the individual's commits.

### Optional

- Contribute fixes upstream rather than expanding a portfolio-only fork.

## Delivery constraints

- **Priority:** attribution; **complexity:** small for documentation, high for reproducible ML evidence; **dependencies:** upstream/team records.
- **Acceptance:** no sole-ownership ambiguity, portable artifacts, and claims linked to evidence.
- **Excluded:** major new feature investment, rewritten history, and unsupported training claims.
