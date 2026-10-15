import type { Scene } from '@graphlearning/flow'

// §2 — reading docker stats, and remembering whose capacity it is. Every container shares the host
// (or the Desktop VM); limits can add up to more than exists. Output is illustrative and trimmed.
export const stats: Scene = {
  id: 'stats',
  title: 'Container statistics and shared capacity',
  flow: 'TB',
  nodes: [
    {
      id: 'output',
      kind: 'code',
      filename: 'docker stats --no-stream — illustrative',
      label: `NAME            CPU %    MEM USAGE / LIMIT     MEM %    PIDS
catalog-api-1   98.7%    231MiB / 256MiB       90.2%    23
catalog-db-1     4.1%    412MiB / 1GiB         40.2%    11
billing-db-1     2.0%    1.6GiB / 3.8GiB       42.1%    9`,
    },
    {
      id: 'columns',
      label: 'Reading the columns',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-cpu', label: 'CPU %', sub: '100% is one full core', pattern: 'network', icon: 'cpu' },
        { id: 'k-mem', label: 'MEM / LIMIT', sub: 'no limit shows the total', pattern: 'network', icon: 'memory' },
        { id: 'k-hot', label: 'api at 90%', sub: 'near its memory ceiling', pattern: 'warn', icon: 'gauge' },
        { id: 'k-pids', label: 'PIDS', sub: 'processes and threads', pattern: 'network', icon: 'hash' },
      ],
    },
    {
      id: 'capacity',
      label: 'Whose capacity is it?',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-host', label: 'One host', sub: 'every container shares it', pattern: 'storage', icon: 'server' },
        { id: 'h-vm', label: 'On Desktop', sub: 'the VM’s CPUs and memory', pattern: 'storage', icon: 'monitor' },
        { id: 'h-over', label: 'Overcommit', sub: 'limits can exceed the total', pattern: 'warn', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'output', target: 'columns' },
    { source: 'columns', target: 'capacity', label: 'in context' },
  ],
}
