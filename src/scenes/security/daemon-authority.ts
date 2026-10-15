import type { Scene } from '@graphlearning/flow'

// §1 — the plan's review case: an API service that runs privileged, mounts the daemon socket and
// binds the host root. The table replaces each grant with what the API actually needs, and marks the
// one change that needs the APPLICATION to change (writing only to an owned directory). The YAML is
// the deliberately bad starting point.
export const daemonAuthority: Scene = {
  id: 'daemon-authority',
  title: 'Reviewing what a container is allowed to do',
  flow: 'TB',
  nodes: [
    {
      id: 'bad',
      kind: 'code',
      filename: 'compose.yaml — as found (do not copy)',
      label: `services:
  api:
    image: catalog-api:1.4.0
    privileged: true
    user: root
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /:/host`,
    },
    {
      id: 'review',
      kind: 'table',
      label: 'Each grant, and what the API needs',
      headers: ['Setting', 'What it grants', 'Needed?', 'Replace with'],
      values: [
        ['privileged: true', 'all capabilities, all devices', 'no', 'remove'],
        ['docker.sock mount', 'control of the daemon: host root', 'no', 'remove'],
        ['/:/host', 'read and write the whole host', 'no', 'one uploads volume'],
        ['user: root', 'root inside the container', 'no', 'USER 10001'],
      ],
    },
    {
      id: 'boundary',
      label: 'Who else holds daemon authority',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-group', label: 'docker group', sub: 'members are root-equivalent', pattern: 'warn', icon: 'users' },
        { id: 'b-remote', label: 'Remote API', sub: 'only with TLS, or SSH', pattern: 'warn', icon: 'globe' },
        { id: 'b-app', label: 'App change', sub: 'write only to /app/uploads', pattern: 'user', icon: 'wrench' },
      ],
    },
  ],
  edges: [
    { source: 'bad', target: 'review', label: 'review each line' },
    { source: 'review', target: 'boundary' },
  ],
}
