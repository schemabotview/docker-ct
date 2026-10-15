import type { Scene } from '@graphlearning/flow'

// §5 — what `docker stop` actually does, and how to read the exit code afterwards. The spine is the
// stop sequence (SIGTERM, a grace period, SIGKILL only if needed); the two branches are a process
// that handles the signal and one that does not — usually because PID 1 ignores signals it has no
// handler for. Only the SIGKILL branch is drawn into the comparison group: an edge from the graceful
// branch crossed the SIGKILL card. The bottom group compares the three containers the chapter keeps contrasting.
export const stopSignals: Scene = {
  id: 'stop-signals',
  title: 'Stop, signals and exit codes',
  flow: 'TB',
  nodes: [
    { id: 'stop', label: 'docker stop', sub: 'catalog-demo', pattern: 'user', icon: 'terminal' },
    { id: 'sigterm', label: 'SIGTERM', sub: 'sent to PID 1', pattern: 'network', icon: 'bell' },
    {
      id: 'graceful',
      label: 'Handles it',
      sub: 'finishes requests, exits',
      pattern: 'service',
      icon: 'circlecheck',
    },
    {
      id: 'ignored',
      label: 'Ignores it',
      sub: 'no handler, or a shell wrapper as PID 1',
      pattern: 'warn',
      icon: 'circleslash',
    },
    { id: 'sigkill', label: 'SIGKILL', sub: 'after the grace period', pattern: 'warn', icon: 'skull' },
    {
      id: 'exits',
      label: 'Three exited containers, compared',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'exit-batch', label: 'Batch job', sub: 'Exited (0) — done', pattern: 'service', icon: 'circlecheck' },
        { id: 'exit-crash', label: 'Crashing API', sub: 'Exited (1) — failed', pattern: 'warn', icon: 'bug' },
        { id: 'exit-stopped', label: 'Stopped API', sub: 'Exited (143) or (137)', pattern: 'storage', icon: 'power' },
      ],
    },
  ],
  edges: [
    { source: 'stop', target: 'sigterm' },
    { source: 'sigterm', target: 'graceful', label: 'exit 0 or 143' },
    { source: 'sigterm', target: 'ignored', label: 'grace period' },
    { source: 'ignored', target: 'sigkill', label: 'timeout' },
    { source: 'sigkill', target: 'exits', label: 'exit 137', dashed: true },
  ],
}
