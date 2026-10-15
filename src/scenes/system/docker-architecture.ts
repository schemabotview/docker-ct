import type { Scene } from '@graphlearning/flow'

// §4 — where a command acts. The CLI is only a client: it sends API requests to whichever daemon the
// current context names. Each daemon owns its own images, containers and volumes, so the same
// `docker ps` lists different things depending on the context. The registry is a third machine.
export const dockerArchitecture: Scene = {
  id: 'docker-architecture',
  title: 'Client, daemon, context',
  flow: 'TB',
  nodes: [
    {
      id: 'client',
      label: 'Your terminal',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'cli', label: 'docker CLI', sub: 'a client only', pattern: 'user', icon: 'terminal' },
        { id: 'context', label: 'Current context', sub: 'which daemon to call', pattern: 'user', icon: 'link' },
        { id: 'context-use', label: 'context use', sub: 'changes the default', pattern: 'user', icon: 'swap' },
        { id: 'context-flag', label: '--context', sub: 'one command only', pattern: 'user', icon: 'pencil' },
      ],
    },
    {
      id: 'local-host',
      label: 'Context “default” — this machine',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'local-daemon', label: 'dockerd', sub: 'owns the objects', pattern: 'service', icon: 'server' },
        { id: 'local-images', label: 'Images', sub: 'local image store', pattern: 'storage', icon: 'layers' },
        { id: 'local-ctrs', label: 'Containers', sub: 'processes it started', pattern: 'service', icon: 'boxes' },
        { id: 'local-vols', label: 'Volumes', sub: 'managed data', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'remote-host',
      label: 'Context “build-box” — another host',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'remote-daemon', label: 'dockerd', sub: 'a different daemon', pattern: 'service', icon: 'server' },
        { id: 'remote-images', label: 'Images', sub: 'its own image store', pattern: 'storage', icon: 'layers' },
        { id: 'remote-ctrs', label: 'Containers', sub: 'not visible locally', pattern: 'service', icon: 'boxes' },
        { id: 'remote-vols', label: 'Volumes', sub: 'its own data', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'registry',
      label: 'Registry — a third machine',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'reg-repo', label: 'Repositories', sub: 'shared by every host', pattern: 'network', icon: 'cloud' },
        { id: 'reg-auth', label: 'Login', sub: 'stored per client', pattern: 'network', icon: 'key' },
      ],
    },
  ],
  edges: [
    { source: 'client', target: 'local-host', label: 'API · local socket' },
    { source: 'client', target: 'remote-host', label: 'API · SSH', dashed: true },
    { source: 'local-host', target: 'registry', label: 'pull / push' },
  ],
}
