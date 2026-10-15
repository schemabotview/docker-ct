import type { Scene } from '@graphlearning/flow'

// §3 — where disk goes, and which of it is safe to reclaim. Logs are one more consumer, with growth
// that depends on the logging driver's configuration (driver-specific options are left to its docs, as
// the plan requires). The split that matters is rebuildable versus data. Figures are illustrative.
export const disk: Scene = {
  id: 'disk',
  title: 'Logs and disk consumption',
  flow: 'TB',
  nodes: [
    {
      id: 'df',
      kind: 'code',
      filename: 'docker system df — illustrative output',
      label: `TYPE            TOTAL   ACTIVE   SIZE      RECLAIMABLE
Images          41      6        18.2GB    14.9GB (81%)
Containers      9       3        1.1GB     0.7GB (63%)
Local Volumes   5       3        9.4GB     2.1GB (22%)
Build Cache     212     0        11.6GB    11.6GB`,
    },
    {
      id: 'kinds',
      label: 'Rebuildable — or data?',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-images', label: 'Images', sub: 'can be pulled or built', pattern: 'service', icon: 'layers' },
        { id: 'r-cache', label: 'Build cache', sub: 'costs only time', pattern: 'service', icon: 'repeat' },
        { id: 'r-ctrs', label: 'Stopped ones', sub: 'containers you own', pattern: 'service', icon: 'box' },
        { id: 'd-volumes', label: 'Volumes', sub: 'the data itself', pattern: 'warn', icon: 'harddrive' },
        { id: 'd-logs', label: 'Logs', sub: 'grow with every request', pattern: 'storage', icon: 'scroll' },
        { id: 'd-evidence', label: 'Failed ones', sub: 'evidence, keep for now', pattern: 'storage', icon: 'search' },
      ],
    },
    {
      id: 'logs',
      label: 'Keeping logs bounded',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-stdout', label: 'stdout', sub: 'captured by the daemon', pattern: 'network', icon: 'terminal' },
        { id: 'l-driver', label: 'Logging driver', sub: 'decides where and how much', pattern: 'network', icon: 'gears' },
        { id: 'l-rotate', label: 'Rotation', sub: 'configure it; check its docs', pattern: 'user', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'df', target: 'kinds', label: 'sort it into' },
    { source: 'kinds', target: 'logs', label: 'the log row' },
  ],
}
