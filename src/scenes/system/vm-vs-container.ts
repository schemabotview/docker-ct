import type { Scene } from '@graphlearning/flow'

// §2 — the two stacks side by side, built row-for-row so the missing row is the lesson. Each VM
// carries app, libraries AND a guest kernel above a hypervisor; each container carries app and
// libraries only, above one shared host kernel. The shared kernel is the whole difference, and also
// the reason a container boundary is weaker than a VM boundary.
export const vmVsContainer: Scene = {
  id: 'vm-vs-container',
  title: 'Two ways to isolate a workload',
  flow: 'LR',
  nodes: [
    {
      id: 'vm-stack',
      label: 'Virtual machines',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'guests',
          label: 'Each VM boots a full OS',
          pattern: 'group',
          cols: 2,
          children: [
            {
              id: 'vm-a',
              label: 'VM A',
              pattern: 'group',
              cols: 1,
              children: [
                { id: 'vm-app-a', label: 'App A', sub: 'catalogue API', pattern: 'service', icon: 'code' },
                { id: 'vm-libs-a', label: 'Libraries', sub: 'and guest OS', pattern: 'storage', icon: 'package' },
                { id: 'vm-kernel-a', label: 'Guest kernel', sub: 'own memory, boot', pattern: 'warn', icon: 'gears' },
              ],
            },
            {
              id: 'vm-b',
              label: 'VM B',
              pattern: 'group',
              cols: 1,
              children: [
                { id: 'vm-app-b', label: 'App B', sub: 'PostgreSQL', pattern: 'service', icon: 'database' },
                { id: 'vm-libs-b', label: 'Libraries', sub: 'and guest OS', pattern: 'storage', icon: 'package' },
                { id: 'vm-kernel-b', label: 'Guest kernel', sub: 'own memory, boot', pattern: 'warn', icon: 'gears' },
              ],
            },
          ],
        },
        { id: 'hypervisor', label: 'Hypervisor', sub: 'virtual hardware', pattern: 'network', icon: 'layers' },
        { id: 'vm-hw', label: 'Physical host', sub: 'CPU, RAM, disk', pattern: 'external', icon: 'server' },
        {
          id: 'vm-tradeoff',
          label: 'Trade-off',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'vm-start', label: 'Boots an OS', sub: 'seconds to minutes', pattern: 'warn', icon: 'clock' },
            { id: 'vm-boundary', label: 'Strong boundary', sub: 'separate kernels', pattern: 'service', icon: 'shieldcheck' },
          ],
        },
      ],
    },
    {
      id: 'ctr-stack',
      label: 'Containers',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'procs',
          label: 'Each container is a process',
          pattern: 'group',
          cols: 2,
          children: [
            {
              id: 'ctr-a',
              label: 'Container A',
              pattern: 'group',
              cols: 1,
              children: [
                { id: 'ctr-app-a', label: 'API process', sub: 'own view of PIDs', pattern: 'service', icon: 'code' },
                { id: 'ctr-libs-a', label: 'Libraries', sub: 'from its image', pattern: 'storage', icon: 'package' },
              ],
            },
            {
              id: 'ctr-b',
              label: 'Container B',
              pattern: 'group',
              cols: 1,
              children: [
                { id: 'ctr-app-b', label: 'DB process', sub: 'own filesystem', pattern: 'service', icon: 'database' },
                { id: 'ctr-libs-b', label: 'Libraries', sub: 'from its image', pattern: 'storage', icon: 'package' },
              ],
            },
          ],
        },
        { id: 'engine', label: 'Docker Engine', sub: 'sets up isolation', pattern: 'network', icon: 'boxes' },
        { id: 'shared-kernel', label: 'One host kernel', sub: 'shared by every container', pattern: 'user', icon: 'gears' },
        { id: 'ctr-hw', label: 'Physical host', sub: 'or a cloud VM', pattern: 'external', icon: 'server' },
        {
          id: 'ctr-tradeoff',
          label: 'Trade-off',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'ctr-start', label: 'Starts a process', sub: 'as fast as the app', pattern: 'service', icon: 'zap' },
            { id: 'ctr-boundary', label: 'Weaker boundary', sub: 'the kernel is shared', pattern: 'warn', icon: 'shieldcheck' },
          ],
        },
      ],
    },
  ],
  edges: [],
}
