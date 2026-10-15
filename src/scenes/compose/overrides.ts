import type { Scene } from '@graphlearning/flow'

// §6 — one base file, two environments. `compose.override.yaml` is merged automatically when present,
// so development additions live there; production is named explicitly with -f and leaves the override
// out. `docker compose config` is how you see the merged result rather than predicting it.
export const overrides: Scene = {
  id: 'overrides',
  title: 'Base file and overrides',
  flow: 'TB',
  padding: 0.12,
  nodes: [
    {
      id: 'base',
      label: 'compose.yaml — what every environment shares',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-services', label: 'Services', sub: 'api and db', pattern: 'storage', icon: 'boxes' },
        { id: 'b-health', label: 'Health checks', sub: 'and depends_on', pattern: 'storage', icon: 'circlecheck' },
        { id: 'b-vol', label: 'Volume', sub: 'pgdata', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'dev',
      label: 'compose.override.yaml — merged automatically',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'd-bind', label: 'Bind mount', sub: './src, read-only', pattern: 'user', icon: 'folder' },
        { id: 'd-reload', label: 'serve --reload', sub: 'command override', pattern: 'user', icon: 'repeat' },
        { id: 'd-debug', label: 'LOG_LEVEL', sub: 'debug', pattern: 'user', icon: 'bug' },
      ],
    },
    {
      id: 'prod',
      label: 'compose.prod.yaml — named with -f',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'p-image', label: 'Pinned image', sub: 'a tested digest, no build', pattern: 'service', icon: 'fingerprint' },
        { id: 'p-restart', label: 'restart:', sub: 'unless-stopped', pattern: 'service', icon: 'repeat' },
        { id: 'p-nomount', label: 'No source mount', sub: 'code from the image', pattern: 'service', icon: 'lock' },
      ],
    },
    {
      id: 'commands',
      kind: 'code',
      filename: 'terminal',
      label: `# development: base + override, merged automatically
$ docker compose up -d

# production: name the files; the override is not read
$ docker compose -f compose.yaml -f compose.prod.yaml up -d

# see the merged result, never guess it
$ docker compose -f compose.yaml -f compose.prod.yaml config`,
    },
  ],
  edges: [
    { source: 'base', target: 'dev', label: 'dev adds' },
    { source: 'base', target: 'prod', label: 'prod adds' },
    { source: 'dev', target: 'commands' },
    { source: 'prod', target: 'commands' },
  ],
}
