import type { Scene } from '@graphlearning/flow'

// §1 — image acquisition versus container execution. The states read left to right as a timeline
// inside one group, each card naming the command that reaches it, so no edge has to run between two
// leaves of one container (those route out and back in). `docker run` sits beside the timeline as
// the shortcut, and the bottom row says what an exited container still holds — it is not removed.
export const pullCreateStart: Scene = {
  id: 'pull-create-start',
  title: 'From image to running container',
  flow: 'TB',
  nodes: [
    {
      id: 'acquire',
      label: 'Image acquisition — no process yet',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'registry', label: 'Registry', sub: 'catalog-api:1.0', pattern: 'network', icon: 'cloud' },
        { id: 'image-store', label: 'Local image', sub: 'docker pull puts it here', pattern: 'storage', icon: 'layers' },
      ],
    },
    {
      id: 'states',
      label: 'Container states',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'created', label: 'Created', sub: 'docker create: config, no process', pattern: 'storage', icon: 'box' },
        { id: 'running', label: 'Running', sub: 'docker start: main process alive', pattern: 'service', icon: 'zap' },
        { id: 'exited', label: 'Exited', sub: 'the process ended', pattern: 'warn', icon: 'power' },
      ],
    },
    {
      id: 'run-does',
      label: 'docker run does all three',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'run-pull', label: 'Pull', sub: 'only if missing locally', pattern: 'user', icon: 'cloud' },
        { id: 'run-create', label: 'Create', sub: 'a new container each time', pattern: 'user', icon: 'box' },
        { id: 'run-start', label: 'Start', sub: 'and attach, unless -d', pattern: 'user', icon: 'zap' },
      ],
    },
    {
      id: 'keeps',
      label: 'An exited container still has',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'keep-code', label: 'Exit code', sub: 'why it ended', pattern: 'storage', icon: 'hash' },
        { id: 'keep-logs', label: 'Logs', sub: 'everything it printed', pattern: 'storage', icon: 'scroll' },
        { id: 'keep-fs', label: 'Its filesystem', sub: 'the writable layer', pattern: 'storage', icon: 'folder' },
        { id: 'keep-start', label: 'docker start', sub: 'runs it again', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'acquire', target: 'states', label: 'create, then start' },
    { source: 'acquire', target: 'run-does', label: 'docker run', dashed: true },
    { source: 'states', target: 'keeps', label: 'until docker rm' },
  ],
}
