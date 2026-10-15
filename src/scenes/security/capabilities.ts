import type { Scene } from '@graphlearning/flow'

// §3 — root split into capabilities. Docker already grants a reduced default set; --privileged throws
// that away entirely; least authority drops everything and adds back only what a named requirement
// needs. The catalogue API listens on 8080 and needs none. The default list shown is a partial,
// illustrative subset.
export const capabilities: Scene = {
  id: 'capabilities',
  title: 'Capabilities and least authority',
  flow: 'TB',
  nodes: [
    {
      id: 'yaml',
      kind: 'code',
      filename: 'compose.yaml — least authority',
      label: `services:
  api:
    image: catalog-api:1.4.0
    user: "10001"
    cap_drop: [ALL]               # needs none: port 8080 > 1024
    security_opt:
      - no-new-privileges:true    # setuid binaries cannot escalate`,
    },
    {
      id: 'default',
      label: 'Docker default — a reduced set',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'd-chown', label: 'CHOWN', sub: 'change file owners', pattern: 'storage', icon: 'file' },
        { id: 'd-bind', label: 'Low ports', sub: 'NET_BIND_SERVICE', pattern: 'storage', icon: 'plug' },
        { id: 'd-setuid', label: 'SETUID', sub: 'switch user IDs', pattern: 'storage', icon: 'users' },
      ],
    },
    {
      id: 'privileged',
      label: '--privileged — none of the limits',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-all', label: 'Every cap', sub: 'including SYS_ADMIN', pattern: 'warn', icon: 'key' },
        { id: 'p-dev', label: 'Host devices', sub: 'disks and more', pattern: 'warn', icon: 'harddrive' },
        { id: 'p-conf', label: 'No confinement', sub: 'profiles relaxed', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'least',
      label: 'Least authority — start from none',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-drop', label: 'cap_drop: ALL', sub: 'then add by need', pattern: 'service', icon: 'lock' },
        { id: 'l-add', label: 'cap_add', sub: 'name the requirement', pattern: 'service', icon: 'pencil' },
        { id: 'l-nnp', label: 'no-new-privileges', sub: 'no setuid escalation', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'yaml', target: 'default', label: 'instead of' },
    { source: 'default', target: 'privileged', label: 'far worse', dashed: true },
    { source: 'privileged', target: 'least', label: 'the goal' },
  ],
}
