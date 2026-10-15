import type { Scene } from '@graphlearning/flow'

// §6 — cleanup and recovery driven by evidence. Inventory before reclaiming; reclaim what is rebuildable
// by name; keep evidence until it has been read; never free space by deleting data that has no verified
// backup. Recovery is proven by restoring into an isolated target and checking records AND behaviour.
export const recovery: Scene = {
  id: 'recovery',
  title: 'Evidence-led cleanup and recovery',
  flow: 'TB',
  nodes: [
    {
      id: 'order',
      label: 'Freeing space — in order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-inventory', label: '1 Inventory', sub: 'system df -v', pattern: 'user', icon: 'search' },
        { id: 'o-cache', label: '2 Build cache', sub: 'rebuildable', pattern: 'service', icon: 'repeat' },
        { id: 'o-images', label: '3 Old images', sub: 'yours, by name', pattern: 'service', icon: 'layers' },
        { id: 'o-volumes', label: 'Volumes', sub: 'only with a backup', pattern: 'warn', icon: 'harddrive' },
      ],
    },
    {
      id: 'restore',
      label: 'Proving a recovery — isolated target',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-target', label: 'Scratch stack', sub: 'own volume and network', pattern: 'network', icon: 'boxes' },
        { id: 'p-restore', label: 'Restore', sub: 'the latest dump', pattern: 'service', icon: 'database' },
        { id: 'p-records', label: 'Records', sub: 'counts and samples', pattern: 'service', icon: 'table' },
        { id: 'p-behaviour', label: 'Behaviour', sub: 'the API answers requests', pattern: 'service', icon: 'circlecheck' },
        { id: 'p-time', label: 'Time it', sub: 'how long recovery takes', pattern: 'user', icon: 'clock' },
        { id: 'p-gap', label: 'Data gap', sub: 'writes since the dump', pattern: 'warn', icon: 'history' },
      ],
    },
    {
      id: 'decide',
      label: 'Decide with evidence',
      sub: 'restart, roll back, or restore?',
      pattern: 'user',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'order', target: 'restore', label: 'before any data step' },
    { source: 'restore', target: 'decide' },
  ],
}
