import type { Scene } from '@graphlearning/flow'

// §2 — the database's data outlives the container because it lives in a named volume. The old and
// the new container both mount the same volume at the image's documented data directory, so
// replacing the container keeps the rows. The volume's own lifetime is separate and explicit; the
// disposable scratch volume is the one deliberately deleted. postgres:16 and its path are the
// recorded illustrative choice.
export const namedVolume: Scene = {
  id: 'named-volume',
  title: 'A named volume outlives its container',
  flow: 'TB',
  nodes: [
    {
      id: 'cmd',
      kind: 'code',
      filename: 'terminal — postgres:16, illustrative',
      label: `$ docker volume create catalog-pgdata
$ docker run -d --name catalog-db \\
    -e POSTGRES_PASSWORD=example \\
    -v catalog-pgdata:/var/lib/postgresql/data \\
    postgres:16`,
    },
    {
      id: 'old',
      label: 'catalog-db (removed)',
      pattern: 'group',
      cols: 1,
      children: [{ id: 'old-proc', label: 'Old container', sub: 'stopped, then removed', pattern: 'warn', icon: 'trash' }],
    },
    {
      id: 'new',
      label: 'catalog-db (replacement)',
      pattern: 'group',
      cols: 1,
      children: [{ id: 'new-proc', label: 'New container', sub: 'same -v flag', pattern: 'service', icon: 'database' }],
    },
    {
      id: 'volume',
      label: 'Volume catalog-pgdata',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'v-rows', label: 'The rows', sub: 'still here', pattern: 'storage', icon: 'table' },
        { id: 'v-managed', label: 'Daemon-managed', sub: 'under the Docker root', pattern: 'storage', icon: 'harddrive' },
        { id: 'v-desktop', label: 'On Desktop', sub: 'inside the Linux VM', pattern: 'storage', icon: 'monitor' },
      ],
    },
    {
      id: 'lifetimes',
      label: 'Separate lifetimes',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-rm', label: 'docker rm', sub: 'volume untouched', pattern: 'service', icon: 'circlecheck' },
        { id: 'l-vrm', label: 'volume rm', sub: 'catalog-scratch only, on purpose', pattern: 'warn', icon: 'trash' },
        { id: 'l-ls', label: 'volume ls', sub: 'list before deleting', pattern: 'user', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'cmd', target: 'old' },
    { source: 'cmd', target: 'new' },
    { source: 'old', target: 'volume', label: 'wrote', dashed: true },
    { source: 'new', target: 'volume', label: 'mounts again' },
    { source: 'volume', target: 'lifetimes' },
  ],
}
