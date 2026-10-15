import type { Scene } from '@graphlearning/flow'

// §4 — the host is gone. What survives is whatever was stored somewhere else; what is lost is
// everything that lived only on that host. The rebuild order on the right only works if the left
// column existed before the failure. The bottom row separates three things often called "recovered".
export const hostLoss: Scene = {
  id: 'host-loss',
  title: 'When the host is lost',
  flow: 'TB',
  nodes: [
    {
      id: 'survives',
      label: 'Survives — stored elsewhere',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 's-registry', label: 'Images', sub: 'in the registry, by digest', pattern: 'service', icon: 'cloud' },
        { id: 's-repo', label: 'Compose files', sub: 'in version control', pattern: 'service', icon: 'gitbranch' },
        { id: 's-secrets', label: 'Secrets', sub: 'in the secret store', pattern: 'service', icon: 'key' },
        { id: 's-dump', label: 'Off-host dump', sub: 'last night’s backup', pattern: 'service', icon: 'database' },
      ],
    },
    {
      id: 'lost',
      label: 'Lost — lived only on the host',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'l-volume', label: 'catalog_pgdata', sub: 'writes since the dump', pattern: 'warn', icon: 'harddrive' },
        { id: 'l-cache', label: 'Build cache', sub: 'costs only time', pattern: 'storage', icon: 'layers' },
        { id: 'l-logs', label: 'Local logs', sub: 'unless shipped off-host', pattern: 'warn', icon: 'scroll' },
        { id: 'l-hand', label: 'Hand edits', sub: 'anything not in git', pattern: 'warn', icon: 'pencil' },
      ],
    },
    {
      id: 'three',
      label: 'Three meanings of "recovered"',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-process', label: 'Process up', sub: 'containers running', pattern: 'storage', icon: 'power' },
        { id: 't-data', label: 'Data restored', sub: 'and the gap known', pattern: 'storage', icon: 'table' },
        { id: 't-user', label: 'Users served', sub: 'a real request works', pattern: 'service', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'survives', target: 'three', label: 'rebuild from' },
    { source: 'lost', target: 'three', label: 'accept or prevent', dashed: true },
  ],
}
