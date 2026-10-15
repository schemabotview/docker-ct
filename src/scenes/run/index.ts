import type { Scene } from '@graphlearning/flow'
import { pullCreateStart } from './pull-create-start'
import { runModes } from './run-modes'
import { commandEnvPorts } from './command-env-ports'
import { logsInspectExec } from './logs-inspect-exec'
import { stopSignals } from './stop-signals'
import { removeOwnership } from './remove-ownership'

// Chapter 2 — Running and Inspecting Containers.
export const runScenes: Scene[] = [
  pullCreateStart,
  runModes,
  commandEnvPorts,
  logsInspectExec,
  stopSignals,
  removeOwnership,
]
