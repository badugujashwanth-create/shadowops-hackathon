import benchmarkReport from '../../../backend-ml/training/demo_benchmark_report.json'

export interface BenchmarkRow {
  policy: string
  exactMatch: number
  safetyAccuracy: number
  unsafeDecisionRate: number
  rewardMean: number
  isHighlight?: boolean
}

export const BENCHMARKS: BenchmarkRow[] = benchmarkReport.metrics.map((metric) => ({
  policy: metric.policy === 'Q-aware' ? 'Q-Aware Supervisor' : metric.policy,
  exactMatch: metric.exact_match * 100,
  safetyAccuracy: metric.safety_accuracy * 100,
  unsafeDecisionRate: metric.unsafe_decision_rate * 100,
  rewardMean: metric.reward_mean,
  isHighlight: metric.policy === 'Q-aware',
}))

export const BENCHMARK_CARDS = [
  {
    title: 'Best Laptop-Safe Policy',
    value: 'Q-Aware Supervisor',
    status: 'verified' as const,
  },
  {
    title: 'Checkpoint Evaluation',
    value: 'Not Reproduced Locally',
    status: 'pending' as const,
  },
  {
    title: 'Demo Readiness',
    value: 'Verified',
    status: 'verified' as const,
  },
]
