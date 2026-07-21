import React, { useEffect, useState } from 'react'
import { SCENARIOS, Scenario } from '../data/scenarios'
import { ScenarioFeed } from '../components/ScenarioFeed'
import { ActionDetails } from '../components/ActionDetails'
import { SupervisorDecision } from '../components/SupervisorDecision'
import { getDecision } from '../lib/api'

export const MissionControl: React.FC<{ onNavigate?: (page: string) => void }> = () => {
  const [selectedId, setSelectedId] = useState('github-poisoned-pr')
  const selectedScenario = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0]
  const [evaluatedScenario, setEvaluatedScenario] = useState<Scenario>(selectedScenario)
  const [runState, setRunState] = useState('Repository fixture loaded · no external action')

  useEffect(() => {
    setEvaluatedScenario(selectedScenario)
    setRunState('Repository fixture loaded · no external action')
  }, [selectedScenario])

  const handleReplay = async () => {
    setRunState('Evaluating with the local runtime…')
    const result = await getDecision(selectedId)
    setEvaluatedScenario({
      ...selectedScenario,
      decision: result.decision,
      confidence: result.confidence,
      reason: result.reason,
    })
    setRunState(
      result.source === 'backend'
        ? 'Local backend decision · no production action executed'
        : 'Fixture fallback decision · local backend unavailable',
    )
  }

  const applyLocalDecision = (decision: Scenario['decision']) => {
    setEvaluatedScenario({ ...evaluatedScenario, decision })
    setRunState(`Local-only ${decision} override · no external action executed`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Mission Control Dashboard</h2>
        <p className="text-slate-400 mt-1">Manage incoming actions and supervisor decisions</p>
        <p className="text-xs text-cyan-300 mt-2" role="status">{runState}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Scenario Feed */}
        <div>
          <ScenarioFeed
            scenarios={SCENARIOS}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* Center Column - Action Details */}
        <div>
          <ActionDetails scenario={evaluatedScenario} />
        </div>

        {/* Right Column - Supervisor Decision */}
        <div>
          <SupervisorDecision
            scenario={evaluatedScenario}
            onReplay={handleReplay}
            onApprove={() => applyLocalDecision('ALLOW')}
            onBlock={() => applyLocalDecision('BLOCK')}
            onFork={() => applyLocalDecision('FORK')}
          />
        </div>
      </div>
    </div>
  )
}
