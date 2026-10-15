import type { Scene } from '@graphlearning/flow'

// §4 — tmpfs, placed in the comparison it belongs in. The table is the four places a container can
// write and how long each lasts; the code card is the tmpfs mount itself, and the cards below say
// what it is for and what it costs. tmpfs is a Linux feature: on Desktop the memory is the VM's.
export const storageCompare: Scene = {
  id: 'storage-compare',
  title: 'Temporary storage, compared',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Where a write goes, and how long it lasts',
      headers: ['', 'stop / start', 'docker rm', 'stored in'],
      values: [
        ['Writable layer', 'kept', 'lost', 'container layer'],
        ['Named volume', 'kept', 'kept', 'daemon-managed'],
        ['Bind mount', 'kept', 'kept', 'host directory'],
        ['tmpfs', 'lost', 'lost', 'host memory'],
      ],
    },
    {
      id: 'cmd',
      kind: 'code',
      filename: 'terminal — illustrative',
      label: `$ docker run -d --name catalog-api \\
    --tmpfs /app/cache \\
    -p 127.0.0.1:8081:8080 catalog-api:1.0`,
    },
    {
      id: 'uses',
      label: 'tmpfs — memory, never disk',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'u-cache', label: 'Use for', sub: 'caches, scratch files', pattern: 'service', icon: 'zap' },
        { id: 'u-sensitive', label: 'Also for', sub: 'data never to hit disk', pattern: 'service', icon: 'lock' },
        { id: 'u-gone', label: 'Gone on stop', sub: 'never for real data', pattern: 'warn', icon: 'power' },
        { id: 'u-mem', label: 'Costs memory', sub: 'counts against limits', pattern: 'warn', icon: 'memory' },
        { id: 'u-share', label: 'Not shared', sub: 'one container only', pattern: 'storage', icon: 'box' },
        { id: 'u-linux', label: 'Linux only', sub: 'Desktop: the VM’s memory', pattern: 'storage', icon: 'monitor' },
      ],
    },
  ],
  edges: [
    { source: 'table', target: 'cmd', label: 'the last row' },
    { source: 'cmd', target: 'uses' },
  ],
}
