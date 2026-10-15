import type { Scene } from '@graphlearning/flow'

// §5 — three different meanings of "the database is up", and the limit of depends_on. A health check
// turns "process started" into "accepting connections", and `condition: service_healthy` makes the
// API wait for it — at START-UP only. A database restart later is the application's problem: it must
// retry. The YAML is the relevant fragment; the pg_isready check is illustrative for postgres:16.
export const readiness: Scene = {
  id: 'readiness',
  title: 'Health, dependencies and retry',
  flow: 'TB',
  nodes: [
    {
      id: 'yaml',
      kind: 'code',
      filename: 'compose.yaml — readiness',
      label: `services:
  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d catalog"]
      interval: 5s
      retries: 10
  api:
    depends_on:
      db:
        condition: service_healthy`,
    },
    {
      id: 'ready',
      label: 'Three meanings of "the database is up"',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-started', label: 'Started', sub: 'process exists', pattern: 'storage', icon: 'power' },
        { id: 'r-healthy', label: 'Healthy', sub: 'pg_isready passes', pattern: 'network', icon: 'circlecheck' },
        { id: 'r-queries', label: 'Queries work', sub: 'the API gets rows', pattern: 'service', icon: 'database' },
      ],
    },
    {
      id: 'limits',
      label: 'What depends_on does not do',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-once', label: 'Start-up only', sub: 'checked once, at up', pattern: 'warn', icon: 'clock' },
        { id: 'l-restart', label: 'DB restarts', sub: 'the API is not paused', pattern: 'warn', icon: 'repeat' },
        { id: 'l-retry', label: 'App must retry', sub: 'reconnect with backoff', pattern: 'service', icon: 'wrench' },
        { id: 'l-order', label: 'Shutdown order', sub: 'down stops api before db', pattern: 'storage', icon: 'sortarrows' },
        { id: 'l-default', label: 'Plain list', sub: 'waits for start only', pattern: 'storage', icon: 'ban' },
        { id: 'l-health', label: 'Health status', sub: 'restarts nothing by itself', pattern: 'storage', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'yaml', target: 'ready' },
    { source: 'ready', target: 'limits', label: 'after start-up' },
  ],
}
