import type { Scene } from '@graphlearning/flow'

// §2 — two different times a value is filled in. Interpolation happens on the HOST, when Compose reads
// the file: `${LOG_LEVEL:-info}` is replaced from the shell or the project's `.env`. The container's
// environment is what the application actually sees at run time. `docker compose config` shows the
// file after interpolation — which is why its output can contain secrets.
export const interpolation: Scene = {
  id: 'interpolation',
  title: 'Interpolation and container environment',
  flow: 'TB',
  nodes: [
    {
      id: 'files',
      kind: 'code',
      filename: 'compose.yaml  +  .env',
      label: `# compose.yaml
services:
  api:
    environment:
      LOG_LEVEL: \${LOG_LEVEL:-info}    # filled in by Compose
      CATALOG_DB_HOST: db              # passed as written
    env_file: [api.env]                # loaded into the container

# .env  (beside compose.yaml — read by Compose itself)
LOG_LEVEL=debug`,
    },
    {
      id: 'host',
      label: '1 · On the host, when Compose reads the file',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-shell', label: 'Shell variable', sub: 'wins over .env', pattern: 'user', icon: 'terminal' },
        { id: 'h-dotenv', label: '.env file', sub: 'for interpolation', pattern: 'storage', icon: 'file' },
        { id: 'h-default', label: 'Default', sub: ':-info if neither is set', pattern: 'storage', icon: 'pencil' },
      ],
    },
    {
      id: 'container',
      label: '2 · Inside the container, at run time',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-env', label: 'environment:', sub: 'LOG_LEVEL=debug', pattern: 'service', icon: 'key' },
        { id: 'c-envfile', label: 'env_file:', sub: 'api.env, loaded in', pattern: 'service', icon: 'file' },
        { id: 'c-app', label: 'The app reads', sub: 'its process environment', pattern: 'service', icon: 'code' },
      ],
    },
    {
      id: 'config',
      label: 'compose config',
      sub: 'may print secrets',
      pattern: 'warn',
      icon: 'search',
    },
  ],
  edges: [
    { source: 'files', target: 'host' },
    { source: 'host', target: 'container', label: 'resolved file' },
    { source: 'container', target: 'config', dashed: true },
  ],
}
