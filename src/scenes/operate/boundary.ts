import type { Scene } from '@graphlearning/flow'

// §5 — what a single-host Compose deployment provides, what a cluster scheduler adds, and what neither
// provides. Orientation only: no cluster is built, and replication is explicitly not a substitute for
// database recovery.
export const boundary: Scene = {
  id: 'boundary',
  title: 'Where single-host Compose ends',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Who is responsible for what',
      headers: ['Responsibility', 'One host + Compose', 'Kubernetes / Swarm'],
      values: [
        ['Restart a crashed container', 'restart policy', 'the scheduler'],
        ['Replace an unhealthy one', 'you', 'the scheduler'],
        ['Survive losing a host', 'no: you rebuild', 'reschedule elsewhere'],
        ['Spread load over machines', 'no', 'yes, with replicas'],
        ['Rolling, zero-downtime release', 'limited, by hand', 'built in'],
        ['Database backup and restore', 'you', 'still you'],
      ],
    },
    {
      id: 'next',
      label: 'Where to go next',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'n-linux', label: 'Linux ops', sub: 'the host underneath', pattern: 'user', icon: 'terminal' },
        { id: 'n-cicd', label: 'CI/CD', sub: 'pipelines in depth', pattern: 'user', icon: 'workflow' },
        { id: 'n-cloud', label: 'Cloud services', sub: 'managed containers', pattern: 'user', icon: 'cloud' },
        { id: 'n-k8s', label: 'Kubernetes', sub: 'or Swarm', pattern: 'user', icon: 'boxes' },
      ],
    },
    {
      id: 'note',
      label: 'Replicas are not backups',
      sub: 'a bad write is copied too',
      pattern: 'warn',
      icon: 'copy',
    },
  ],
  edges: [
    { source: 'table', target: 'note', label: 'the last row' },
    { source: 'note', target: 'next', dashed: true },
  ],
}
