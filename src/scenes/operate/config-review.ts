import type { Scene } from '@graphlearning/flow'

// §1 — the whole catalogue stack reviewed once, as an architecture. Every decision from the course
// appears as one card, grouped by the boundary it protects, and the bottom row is what the application
// itself owes the platform — Docker cannot supply those.
export const configReview: Scene = {
  id: 'config-review',
  title: 'The production configuration, reviewed',
  flow: 'TB',
  nodes: [
    {
      id: 'edge',
      label: 'Exposure',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'x-proxy', label: 'Reverse proxy', sub: 'the only public entry', pattern: 'network', icon: 'globe' },
        { id: 'x-api', label: 'API published', sub: 'to 127.0.0.1 only', pattern: 'network', icon: 'plug' },
        { id: 'x-db', label: 'DB unpublished', sub: 'internal backend net', pattern: 'network', icon: 'lock' },
      ],
    },
    {
      id: 'runtime',
      label: 'Runtime',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-digest', label: 'Image by digest', sub: 'tested in staging', pattern: 'service', icon: 'fingerprint' },
        { id: 'r-user', label: 'USER 10001', sub: 'cap_drop ALL, read-only', pattern: 'service', icon: 'usercheck' },
        { id: 'r-limits', label: 'Limits', sub: 'memory, CPU, pids', pattern: 'service', icon: 'gauge' },
        { id: 'r-health', label: 'Health checks', sub: 'and restart policy', pattern: 'service', icon: 'circlecheck' },
        { id: 'r-secrets', label: 'Secret files', sub: 'never in env or image', pattern: 'service', icon: 'key' },
        { id: 'r-logs', label: 'Logs', sub: 'stdout, rotated', pattern: 'service', icon: 'scroll' },
      ],
    },
    {
      id: 'data',
      label: 'Data',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'd-volume', label: 'Named volume', sub: 'catalog_pgdata', pattern: 'storage', icon: 'harddrive' },
        { id: 'd-backup', label: 'Nightly dump', sub: 'stored off-host', pattern: 'storage', icon: 'cloud' },
        { id: 'd-restore', label: 'Restore drill', sub: 'monthly, timed', pattern: 'storage', icon: 'calendar' },
      ],
    },
    {
      id: 'app',
      label: 'What the application owes',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-sigterm', label: 'Handle SIGTERM', sub: 'finish, then exit', pattern: 'user', icon: 'power' },
        { id: 'a-retry', label: 'Retry', sub: 'reconnect with backoff', pattern: 'user', icon: 'repeat' },
        { id: 'a-paths', label: 'Known paths', sub: 'writes only to uploads', pattern: 'user', icon: 'folder' },
      ],
    },
  ],
  edges: [
    { source: 'edge', target: 'runtime' },
    { source: 'runtime', target: 'data' },
    { source: 'data', target: 'app', dashed: true },
  ],
}
