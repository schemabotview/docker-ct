import type { Scene } from '@graphlearning/flow'

// §2 — the default bridge versus a user-defined one. Same two containers, different network: on the
// default bridge they can reach each other only by IP; on catalog-net names resolve and only members
// are connected. The code card is the whole setup, including joining a running container.
export const bridgeNetworks: Scene = {
  id: 'bridge-networks',
  title: 'Default bridge and user-defined networks',
  flow: 'TB',
  nodes: [
    {
      id: 'setup',
      kind: 'code',
      filename: 'terminal — illustrative',
      label: `$ docker network create catalog-net

$ docker run -d --name catalog-db \\
    --network catalog-net \\
    -e POSTGRES_PASSWORD=example \\
    -v catalog-pgdata:/var/lib/postgresql/data \\
    postgres:16

$ docker run -d --name catalog-api \\
    --network catalog-net \\
    -p 127.0.0.1:8081:8080 \\
    catalog-api:1.0

# join a running container later
$ docker network connect catalog-net catalog-worker

$ docker network inspect catalog-net   # lists members`,
    },
    {
      id: 'default',
      label: 'Compare: the default bridge',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'df-all', label: 'Everyone joins', sub: 'unless told otherwise', pattern: 'warn', icon: 'users' },
        { id: 'df-names', label: 'No names', sub: 'peers reachable by IP only', pattern: 'warn', icon: 'ban' },
        { id: 'df-shared', label: 'Shared', sub: 'by unrelated projects', pattern: 'warn', icon: 'share' },
        { id: 'df-link', label: 'Legacy --link', sub: 'not a substitute', pattern: 'storage', icon: 'link' },
      ],
    },
    {
      id: 'custom',
      label: 'catalog-net — user-defined bridge',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'cn-members', label: 'Members only', sub: 'API, DB, worker', pattern: 'service', icon: 'users' },
        { id: 'cn-names', label: 'Names resolve', sub: 'catalog-db works', pattern: 'service', icon: 'search' },
        { id: 'cn-many', label: 'Many networks', sub: 'a container can join several', pattern: 'network', icon: 'share' },
        { id: 'cn-out', label: 'Outbound', sub: 'internet via the host', pattern: 'network', icon: 'cloud' },
      ],
    },
  ],
  edges: [
    { source: 'setup', target: 'custom', label: '--network catalog-net' },
    { source: 'custom', target: 'default', label: 'without --network', dashed: true },
  ],
}
