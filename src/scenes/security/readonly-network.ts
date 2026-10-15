import type { Scene } from '@graphlearning/flow'

// §4 — restricting where a compromised process could write, and who it could talk to. The root
// filesystem is read-only, with one tmpfs and one volume as the only writable places (the app had to
// be told where those are). Two networks separate the published API from the database; the
// internal backend network has no route out.
export const readonlyNetwork: Scene = {
  id: 'readonly-network',
  title: 'Read-only filesystems and network separation',
  flow: 'TB',
  nodes: [
    {
      id: 'yaml',
      kind: 'code',
      filename: 'compose.yaml — restrictions',
      label: `services:
  api:
    read_only: true
    tmpfs: [/tmp]
    volumes: [uploads:/app/uploads]
    networks: [frontend, backend]
    ports: ["127.0.0.1:8081:8080"]
  db:
    networks: [backend]
networks:
  frontend: {}
  backend:
    internal: true          # no route to the outside`,
    },
    {
      id: 'fs',
      label: 'Where the API can write',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-root', label: 'Root filesystem', sub: 'read-only', pattern: 'service', icon: 'lock' },
        { id: 'f-tmp', label: '/tmp', sub: 'tmpfs, gone on stop', pattern: 'storage', icon: 'memory' },
        { id: 'f-uploads', label: '/app/uploads', sub: 'one named volume', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'net',
      label: 'Who can talk to whom',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-front', label: 'frontend', sub: 'api, published locally', pattern: 'network', icon: 'globe' },
        { id: 'n-back', label: 'backend', sub: 'api and db only', pattern: 'network', icon: 'network' },
        { id: 'n-out', label: 'No egress', sub: 'db cannot reach out', pattern: 'service', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'yaml', target: 'fs' },
    { source: 'fs', target: 'net' },
  ],
}
