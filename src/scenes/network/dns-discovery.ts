import type { Scene } from '@graphlearning/flow'

// §3 — how a name becomes an address. Inside a user-defined network every container's resolver points
// at Docker's embedded DNS, which answers container names (and aliases) with the CURRENT address and
// forwards everything else. The terminal is the evidence that the address changes on replacement while
// the name does not. Output is illustrative.
export const dnsDiscovery: Scene = {
  id: 'dns-discovery',
  title: 'Names, not addresses',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker exec catalog-api getent hosts catalog-db
172.18.0.2      catalog-db

$ docker rm -f catalog-db          # data stays in catalog-pgdata
$ docker run -d --name catalog-db --network catalog-net …

$ docker exec catalog-api getent hosts catalog-db
172.18.0.4      catalog-db         # new address, same name`,
    },
    {
      id: 'lookup',
      label: 'A lookup from inside catalog-api',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-app', label: 'The API asks', sub: 'catalog-db?', pattern: 'user', icon: 'code' },
        { id: 'l-dns', label: 'Embedded DNS', sub: '127.0.0.11 in the container', pattern: 'network', icon: 'search' },
        { id: 'l-answer', label: 'Current IP', sub: 'of that member', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'rules',
      label: 'What follows',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-names', label: 'Configure names', sub: 'never container IPs', pattern: 'service', icon: 'tag' },
        { id: 'r-alias', label: 'Aliases', sub: '--network-alias db', pattern: 'network', icon: 'link' },
        { id: 'r-scope', label: 'Per network', sub: 'members only can resolve', pattern: 'storage', icon: 'lock' },
        { id: 'r-external', label: 'Other names', sub: 'forwarded to host DNS', pattern: 'external', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'lookup' },
    { source: 'lookup', target: 'rules' },
  ],
}
