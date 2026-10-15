import type { Scene } from '@graphlearning/flow'

// §5 — what "isolated" is made of. A container is an ordinary process the kernel gives a set of
// namespaces (what it can SEE) and cgroups (what it can USE). On macOS and Windows the kernel those
// features belong to is inside a Linux VM that Docker Desktop runs, which is why host paths,
// networking and file performance differ from native Linux.
export const isolationNamespaces: Scene = {
  id: 'isolation-namespaces',
  title: 'Namespaces, cgroups and the Desktop VM',
  flow: 'TB',
  nodes: [
    {
      id: 'namespaces',
      label: 'Namespaces — what the process can see',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ns-pid', label: 'PID', sub: 'sees itself as PID 1', pattern: 'service', icon: 'hash' },
        { id: 'ns-net', label: 'Network', sub: 'own interfaces, ports', pattern: 'service', icon: 'network' },
        { id: 'ns-mnt', label: 'Mount', sub: 'own root filesystem', pattern: 'service', icon: 'folder' },
        { id: 'ns-uts', label: 'UTS', sub: 'own hostname', pattern: 'service', icon: 'tag' },
        { id: 'ns-ipc', label: 'IPC', sub: 'own shared memory', pattern: 'service', icon: 'memory' },
        { id: 'ns-user', label: 'User', sub: 'optional ID remap', pattern: 'service', icon: 'users' },
      ],
    },
    {
      id: 'cgroups',
      label: 'cgroups — what it can use',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'cg-cpu', label: 'CPU', sub: 'shares and quotas', pattern: 'network', icon: 'gauge' },
        { id: 'cg-mem', label: 'Memory', sub: 'hard limits', pattern: 'network', icon: 'memory' },
        { id: 'cg-pids', label: 'Processes', sub: 'max PID count', pattern: 'network', icon: 'ban' },
      ],
    },
    {
      id: 'desktop',
      label: 'Docker Desktop on macOS / Windows',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'host-os', label: 'Host OS', sub: 'macOS or Windows', pattern: 'external', icon: 'monitor' },
        { id: 'linux-vm', label: 'Linux VM', sub: 'supplies the kernel', pattern: 'user', icon: 'gears' },
        { id: 'vm-daemon', label: 'dockerd', sub: 'and containers', pattern: 'service', icon: 'boxes' },
      ],
    },
  ],
  edges: [
    { source: 'namespaces', target: 'cgroups', label: 'same kernel' },
    { source: 'cgroups', target: 'desktop', label: 'where that kernel lives' },
  ],
}
