## ShadowOps Evaluation Summary

> Metrics below are loaded only from real repository artifacts.

> Training curves are generated only from real `trainer_state.json` or `metrics.jsonl` artifacts.

| Policy | exact_match | safety_accuracy | unsafe_decision_rate | false_positive_rate | reward_mean |
| --- | ---: | ---: | ---: | ---: | ---: |
| Random | 0.350 | 0.800 | 0.200 | 0.163 | 0.065 |
| Heuristic | 0.510 | 0.920 | 0.080 | 0.000 | 1.146 |
| Q-aware | 0.990 | 1.000 | 0.000 | 0.000 | 1.920 |
| Oracle | 1.000 | 1.000 | 0.000 | 0.000 | 1.942 |

### Pending Model Metrics

- trained checkpoint metrics: PENDING_REAL_ARTIFACT