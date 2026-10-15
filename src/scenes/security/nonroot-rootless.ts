import type { Scene } from '@graphlearning/flow'

// §2 — two different controls that are often confused. A non-root USER limits the process inside the
// container; rootless mode runs the DAEMON (and therefore every container) as an unprivileged host
// user via user namespaces. The table shows what a breakout would land as in each combination —
// neither control settles the trust question alone. Simplified; user-namespace remapping in rootful
// mode is a further option not drawn.
export const nonrootRootless: Scene = {
  id: 'nonroot-rootless',
  title: 'Non-root process, rootless daemon',
  flow: 'TB',
  nodes: [
    {
      id: 'controls',
      label: 'Two controls, two layers',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'c-user',
          label: 'Non-root USER — the process',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'u-uid', label: 'Process UID', sub: '10001, not 0', pattern: 'service', icon: 'usercheck' },
            { id: 'u-image', label: 'Set in the image', sub: 'or with --user', pattern: 'storage', icon: 'layers' },
            { id: 'u-daemon', label: 'Daemon', sub: 'still runs as root', pattern: 'warn', icon: 'server' },
          ],
        },
        {
          id: 'c-rootless',
          label: 'Rootless mode — the daemon',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'r-daemon', label: 'Daemon', sub: 'runs as your user', pattern: 'service', icon: 'server' },
            { id: 'r-map', label: 'Container root', sub: 'mapped to your UID range', pattern: 'service', icon: 'fingerprint' },
            { id: 'r-limits', label: 'Trade-offs', sub: 'low ports, some drivers', pattern: 'warn', icon: 'ban' },
          ],
        },
      ],
    },
    {
      id: 'table',
      kind: 'table',
      label: 'If the process escaped, it would land as',
      headers: ['Daemon', 'Container USER', 'Escape lands as'],
      values: [
        ['root', 'root', 'host root'],
        ['root', '10001', 'host UID 10001'],
        ['rootless', 'root', 'your unprivileged user'],
        ['rootless', '10001', 'a subordinate, unprivileged UID'],
      ],
    },
  ],
  edges: [{ source: 'controls', target: 'table', label: 'combined' }],
}
