import type { Scene } from '@graphlearning/flow'

// §1 — three limits, three very different failure modes. Memory is enforced by killing; CPU by
// slowing; process count by refusing to create more. The table is what each looks like from outside,
// which is what the rest of the chapter diagnoses. Values are illustrative.
export const limits: Scene = {
  id: 'limits',
  title: 'CPU, memory and process limits',
  flow: 'TB',
  nodes: [
    {
      id: 'cmd',
      kind: 'code',
      filename: 'compose.yaml — limits, illustrative values',
      label: `services:
  api:
    mem_limit: 256m        # hard ceiling
    cpus: 1.0              # one core's worth of time
    pids_limit: 200        # processes and threads
  db:
    mem_limit: 1g
    cpus: 2.0`,
    },
    {
      id: 'table',
      kind: 'table',
      label: 'When a limit is reached',
      headers: ['Limit', 'What happens', 'What you see'],
      values: [
        ['memory', 'the kernel kills a process', 'exit 137, OOMKilled: true'],
        ['cpus', 'the process is throttled', 'slower, CPU % at the cap'],
        ['pids', 'new threads are refused', 'app errors creating work'],
        ['none set', 'it competes for the host', 'neighbours slow down'],
      ],
    },
    {
      id: 'choose',
      label: 'Setting them',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-measure', label: 'Measure first', sub: 'normal and peak use', pattern: 'user', icon: 'ruler' },
        { id: 'c-headroom', label: 'Leave headroom', sub: 'above the peak', pattern: 'service', icon: 'gauge' },
        { id: 'c-app', label: 'Tell the app', sub: 'pools and caches fit', pattern: 'service', icon: 'code' },
      ],
    },
  ],
  edges: [
    { source: 'cmd', target: 'table' },
    { source: 'table', target: 'choose' },
  ],
}
