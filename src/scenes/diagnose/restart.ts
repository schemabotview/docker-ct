import type { Scene } from '@graphlearning/flow'

// §5 — what restarts a container, and what does not. Restart policies act when the main process EXITS;
// a health check only reports. The terminal shows the two states people confuse: a restart loop, and a
// container that is running but unhealthy, which plain Docker leaves alone. Output illustrative.
export const restart: Scene = {
  id: 'restart',
  title: 'Restart policies and health',
  flow: 'TB',
  nodes: [
    {
      id: 'ps',
      kind: 'code',
      filename: 'docker ps — illustrative',
      label: `NAME            STATUS
catalog-api-1   Restarting (1) 4 seconds ago      # a loop
catalog-db-1    Up 2 hours (unhealthy)            # left alone

$ docker inspect --format '{{.RestartCount}}' catalog-api-1
17`,
    },
    {
      id: 'policies',
      kind: 'table',
      label: 'Restart policies — they act on exit',
      headers: ['Policy', 'Restarts when'],
      values: [
        ['no', 'never (the default)'],
        ['on-failure[:N]', 'it exits non-zero, up to N times'],
        ['always', 'it exits, and when the daemon starts'],
        ['unless-stopped', 'like always, unless you stopped it'],
      ],
    },
    {
      id: 'reading',
      label: 'Reading the two states',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-loop', label: 'Restart loop', sub: 'fix the cause; logs first', pattern: 'warn', icon: 'repeat' },
        { id: 'r-backoff', label: 'Backoff', sub: 'delay grows between tries', pattern: 'storage', icon: 'clock' },
        { id: 'r-unhealthy', label: 'Unhealthy', sub: 'reported, not restarted', pattern: 'warn', icon: 'gauge' },
        { id: 'r-who', label: 'Who acts?', sub: 'you, or an orchestrator', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'ps', target: 'policies', label: 'why the loop' },
    { source: 'policies', target: 'reading' },
  ],
}
