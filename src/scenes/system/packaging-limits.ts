import type { Scene } from '@graphlearning/flow'

// §1 — environment drift and what an image does and does not carry. The laptop/server pair shows
// drift when only the code travels; the image/host pair shows the boundary that remains when the
// whole user space travels: the kernel, the CPU architecture, and the data are still the host's.
export const packagingLimits: Scene = {
  id: 'packaging-limits',
  title: 'What travels with the application',
  flow: 'TB',
  nodes: [
    {
      id: 'laptop',
      label: 'Developer laptop',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'lap-code', label: 'App code', sub: 'catalogue API', pattern: 'service', icon: 'code' },
        { id: 'lap-runtime', label: 'Runtime', sub: 'Python 3.12', pattern: 'service', icon: 'cpu' },
        { id: 'lap-libs', label: 'Libraries', sub: 'pinned versions', pattern: 'service', icon: 'package' },
        { id: 'lap-os', label: 'OS packages', sub: 'libpq, CA certs', pattern: 'service', icon: 'layers' },
      ],
    },
    {
      id: 'server',
      label: 'Server, months later',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'srv-code', label: 'App code', sub: 'same commit', pattern: 'service', icon: 'code' },
        { id: 'srv-runtime', label: 'Runtime', sub: 'Python 3.9', pattern: 'warn', icon: 'cpu' },
        { id: 'srv-libs', label: 'Libraries', sub: 'whatever resolved', pattern: 'warn', icon: 'package' },
        { id: 'srv-os', label: 'OS packages', sub: 'libpq missing', pattern: 'warn', icon: 'layers' },
      ],
    },
    {
      id: 'image',
      label: 'Image — packaged once',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'img-code', label: 'App code', sub: 'copied in at build', pattern: 'storage', icon: 'code' },
        { id: 'img-runtime', label: 'Runtime', sub: 'from a base image', pattern: 'storage', icon: 'cpu' },
        { id: 'img-libs', label: 'Libraries', sub: 'installed at build', pattern: 'storage', icon: 'package' },
        { id: 'img-start', label: 'Start command', sub: 'and default settings', pattern: 'storage', icon: 'power' },
      ],
    },
    {
      id: 'host',
      label: 'Still supplied by the host',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'host-kernel', label: 'Linux kernel', sub: 'shared, not packaged', pattern: 'external', icon: 'gears' },
        { id: 'host-arch', label: 'CPU arch', sub: 'amd64 or arm64', pattern: 'external', icon: 'cpu' },
        { id: 'host-data', label: 'Data', sub: 'databases, uploads', pattern: 'external', icon: 'database' },
        { id: 'host-secrets', label: 'Secrets', sub: 'given at run time', pattern: 'external', icon: 'key' },
      ],
    },
  ],
  edges: [
    { source: 'laptop', target: 'server', label: 'copy code only', dashed: true },
    { source: 'laptop', target: 'image', label: 'docker build' },
    { source: 'image', target: 'host', label: 'runs on' },
  ],
}
