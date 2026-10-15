import type { Course } from '../types'
import { pullCreateStart } from './01-pull-create-start'
import { runModes } from './02-run-modes'
import { commandEnvPorts } from './03-command-env-ports'
import { logsInspectExec } from './04-logs-inspect-exec'
import { exitSignalsShutdown } from './05-exit-signals-shutdown'
import { stopRemoveCleanup } from './06-stop-remove-cleanup'

// Chapter 2 — Running and Inspecting Containers (DOCKER-COURSE-PLAN.md).
export const run: Course = {
  id: 'run',
  title: 'Running and Inspecting Containers',
  sections: [
    pullCreateStart,
    runModes,
    commandEnvPorts,
    logsInspectExec,
    exitSignalsShutdown,
    stopRemoveCleanup,
  ],
}
