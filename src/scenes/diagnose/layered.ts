import type { Scene } from '@graphlearning/flow'

// §4 — four failures, the first evidence for each, and the layer it points to. The terminal shows the
// one check that separates an out-of-memory kill from any other SIGKILL: exit 137 alone proves
// nothing. The bottom row separates CPU throttling from a slow database. Output illustrative.
export const layered: Scene = {
  id: 'layered',
  title: 'Diagnosis by layer',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Four failures, first evidence',
      headers: ['Symptom', 'First evidence', 'Layer'],
      values: [
        ['exits at start-up', 'logs: a traceback, exit 1', 'application'],
        ['killed under load', 'exit 137 and OOMKilled: true', 'memory limit'],
        ['writes fail', 'logs: no space left on device', 'storage'],
        ['500s on every query', 'logs: connection refused to db', 'network or db'],
      ],
    },
    {
      id: 'oom',
      kind: 'code',
      filename: 'terminal — illustrative',
      label: `$ docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}}' catalog-api-1
137 true          # the kernel's OOM killer, not docker stop

$ docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}}' catalog-old-1
137 false         # killed some other way: stop timeout, kill`,
    },
    {
      id: 'slow',
      label: 'Slow: throttled, or waiting?',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-cpu', label: 'CPU throttled', sub: 'CPU at the cap, all slow', pattern: 'warn', icon: 'cpu' },
        { id: 's-db', label: 'Slow database', sub: 'CPU low, DB pages slow', pattern: 'warn', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'table', target: 'oom', label: 'row 2, checked' },
    { source: 'oom', target: 'slow', label: 'and when nothing crashes' },
  ],
}
