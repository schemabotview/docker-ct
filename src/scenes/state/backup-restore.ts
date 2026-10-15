import type { Scene } from '@graphlearning/flow'

// §6 — a backup is something you have restored. The path: a logical dump taken by the database
// itself, stored OFF the volume, restored into a disposable database with its own volume, and checked
// by records AND by the application. The warn cards are the two false comforts. Commands are an
// outline (postgres:16, illustrative); exact backup syntax needs the PostgreSQL docs for your version.
export const backupRestore: Scene = {
  id: 'backup-restore',
  title: 'Backup, restore, verify',
  flow: 'TB',
  nodes: [
    {
      id: 'outline',
      kind: 'code',
      filename: 'outline — check your PostgreSQL version’s docs',
      label: `# 1 dump, using the database's own tool
$ docker exec catalog-db \\
    pg_dump -U postgres -Fc catalog > catalog.dump

# 2 restore into a disposable database
$ docker run -d --name catalog-restore \\
    -v catalog-restore-data:/var/lib/postgresql/data …
$ docker exec -i catalog-restore \\
    pg_restore -U postgres -d catalog < catalog.dump

# 3 verify
$ docker exec catalog-restore psql -U postgres \\
    -d catalog -c 'SELECT count(*) FROM items;'`,
    },
    {
      id: 'path',
      label: 'The verified path',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'p-dump', label: 'Logical dump', sub: 'consistent, by the DB', pattern: 'service', icon: 'database' },
        { id: 'p-off', label: 'Stored off-host', sub: 'not on the same disk', pattern: 'storage', icon: 'cloud' },
        { id: 'p-restore', label: 'Restore', sub: 'into a scratch DB', pattern: 'service', icon: 'repeat' },
        { id: 'p-check', label: 'Verify', sub: 'counts, samples, a real query', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'false',
      label: 'Not a backup',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-volume', label: 'The volume', sub: 'same disk, same delete', pattern: 'warn', icon: 'harddrive' },
        { id: 'f-copy', label: 'Copying files', sub: 'of a running DB: may be torn', pattern: 'warn', icon: 'copy' },
        { id: 'f-untested', label: 'Untested dump', sub: 'unknown until restored', pattern: 'warn', icon: 'search' },
      ],
    },
    { id: 'boundary', label: 'Then, and only then', sub: 'remove the old volume on purpose', pattern: 'user', icon: 'trash' },
  ],
  edges: [
    { source: 'outline', target: 'path' },
    { source: 'path', target: 'false', label: 'compare', dashed: true },
    { source: 'false', target: 'boundary' },
  ],
}
