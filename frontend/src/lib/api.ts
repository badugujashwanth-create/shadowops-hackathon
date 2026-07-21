import { SCENARIOS, Scenario } from '../data/scenarios'
import { BENCHMARKS, BenchmarkRow } from '../data/benchmarks'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export interface HealthResponse {
  status: 'online' | 'offline'
  timestamp: string
  policy?: string
  model?: string
}

export interface DecisionResponse {
  decision: 'ALLOW' | 'BLOCK' | 'QUARANTINE' | 'FORK'
  confidence: number
  reason: string
  source: 'backend' | 'fixture'
}

export interface BenchmarkResponse {
  benchmarks: BenchmarkRow[]
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })
  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export async function getHealth(): Promise<HealthResponse> {
  try {
    const health = await fetchJson<{ status?: string; policy?: string; model?: string }>('/health')
    return {
      status: health.status === 'ok' ? 'online' : 'offline',
      timestamp: new Date().toISOString(),
      policy: health.policy,
      model: health.model,
    }
  } catch {
    return {
      status: 'offline',
      timestamp: new Date().toISOString(),
    }
  }
}

export async function simulateScenario(
  scenarioId: string
): Promise<Scenario | null> {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)
  return scenario || null
}

export async function getDecision(scenarioId: string): Promise<DecisionResponse> {
  const scenario = await simulateScenario(scenarioId)
  if (!scenario) {
    return {
      decision: 'QUARANTINE',
      confidence: 0,
      reason: 'Scenario not found',
      source: 'fixture',
    }
  }

  try {
    const result = await fetchJson<{
      supervisor_decision?: {
        decision?: DecisionResponse['decision']
        action_taken?: DecisionResponse['decision']
        confidence?: number
        explanation?: string
        safe_outcome?: string
      }
    }>('/decision', {
      method: 'POST',
      body: JSON.stringify({
        domain: scenario.domain,
        action: {
          intent: scenario.intent,
          raw_payload: scenario.payload,
        },
        actor: 'frontend-demo',
        session_id: `frontend-${scenario.id}`,
        service: scenario.domain,
        environment: scenario.riskLevel === 'low' ? 'staging' : 'production',
        provided_evidence: scenario.evidence?.result ? [scenario.evidence.result] : [],
      }),
    })
    const supervisor = result.supervisor_decision ?? {}
    return {
      decision: supervisor.decision ?? supervisor.action_taken ?? scenario.decision,
      confidence:
        typeof supervisor.confidence === 'number'
          ? Math.round(supervisor.confidence * 100)
          : scenario.confidence,
      reason: supervisor.explanation ?? supervisor.safe_outcome ?? scenario.reason,
      source: 'backend',
    }
  } catch {
    return {
      decision: scenario.decision,
      confidence: scenario.confidence,
      reason: scenario.reason,
      source: 'fixture',
    }
  }
}

export async function getBenchmark(): Promise<BenchmarkResponse> {
  return {
    benchmarks: BENCHMARKS,
  }
}

export async function getDemoScenarios(): Promise<Scenario[]> {
  return SCENARIOS
}
