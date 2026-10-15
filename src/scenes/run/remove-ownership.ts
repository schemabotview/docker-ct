import type { Scene } from '@graphlearning/flow'

// §6 — cleanup scoped by ownership. The preview command lists only what this exercise created (by
// name prefix); the daemon also holds another project's stopped database, which a broad prune would
// remove along with ours. Recreate is shown as remove + run, because a container's configuration is
// fixed at creation. Output is illustrative.
export const removeOwnership: Scene = {
  id: 'remove-ownership',
  title: 'Preview, then remove what you own',
  flow: 'TB',
  nodes: [
    {
      id: 'preview',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker ps -a --filter name=catalog-
NAMES            STATUS
catalog-demo     Exited (143) 2 minutes ago
catalog-batch    Exited (0) 5 minutes ago

$ docker rm catalog-demo catalog-batch
catalog-demo
catalog-batch`,
    },
    {
      id: 'daemon-holds',
      label: 'On this daemon',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ours', label: 'Ours', sub: 'named catalog-*', pattern: 'service', icon: 'box' },
        { id: 'theirs', label: 'billing-db', sub: 'another project, stopped', pattern: 'warn', icon: 'database' },
        { id: 'prune', label: 'container prune', sub: 'removes every stopped container', pattern: 'warn', icon: 'trash' },
        { id: 'rm-flag', label: 'run --rm', sub: 'removed on exit', pattern: 'user', icon: 'scissors' },
      ],
    },
    {
      id: 'recreate',
      label: 'Changing configuration = recreate',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 're-stop', label: 'Stop', sub: 'graceful shutdown', pattern: 'service', icon: 'power' },
        { id: 're-rm', label: 'Remove', sub: 'writable layer is lost', pattern: 'warn', icon: 'trash' },
        { id: 're-run', label: 'Run again', sub: 'with the new flags', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'preview', target: 'daemon-holds', label: 'scope it' },
    { source: 'daemon-holds', target: 'recreate', dashed: true },
  ],
}
