import type { Scene } from '@graphlearning/flow'

// §7 — a runtime secret as a file, and how far that protection goes. The file stays on the host (and
// out of git); Compose mounts it read-only at /run/secrets/<name> in the services that list it; the
// application reads the FILE, so the value is not in its environment. The bottom row is the boundary:
// this is a delivery mechanism, not a secret-management system.
export const secrets: Scene = {
  id: 'secrets',
  title: 'Secret files at run time',
  flow: 'TB',
  nodes: [
    {
      id: 'yaml',
      kind: 'code',
      filename: 'compose.yaml — secrets',
      label: `services:
  db:
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets: [db_password]
  api:
    environment:
      CATALOG_DB_PASSWORD_FILE: /run/secrets/db_password
    secrets: [db_password]
secrets:
  db_password:
    file: ./secrets/db_password.txt     # in .gitignore`,
    },
    {
      id: 'path',
      label: 'How the value travels',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-host', label: 'Host file', sub: 'never in git or image', pattern: 'storage', icon: 'file' },
        { id: 'p-mount', label: 'Mounted', sub: '/run/secrets, read-only', pattern: 'network', icon: 'lock' },
        { id: 'p-app', label: 'App reads file', sub: 'not an env variable', pattern: 'service', icon: 'key' },
      ],
    },
    {
      id: 'limits',
      label: 'What it does not give you',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-plain', label: 'Encryption', sub: 'a plain file on disk', pattern: 'warn', icon: 'harddrive' },
        { id: 'l-exec', label: 'Access control', sub: 'docker exec can read it', pattern: 'warn', icon: 'terminal' },
        { id: 'l-rotate', label: 'Rotation', sub: 'change file, recreate', pattern: 'warn', icon: 'repeat' },
        { id: 'l-audit', label: 'Audit trail', sub: 'no record of reads', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'yaml', target: 'path' },
    { source: 'path', target: 'limits', label: 'its limits' },
  ],
}
