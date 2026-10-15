import type { Scene } from '@graphlearning/flow'

// §1 — one request, end to end. Each container is its own network namespace with its own loopback,
// its own interface and its own ports, so the path crosses three distinct "machines": the host's
// published port, the API's listener, and the database's listener reached by service name. The
// database port is deliberately unpublished. Addresses are illustrative.
export const requestPath: Scene = {
  id: 'request-path',
  title: 'Following one request',
  flow: 'TB',
  nodes: [
    {
      id: 'host',
      label: 'Host',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-browser', label: 'Browser', sub: 'GET /items', pattern: 'user', icon: 'globe' },
        { id: 'h-port', label: 'Host port 8081', sub: 'bound to 127.0.0.1', pattern: 'network', icon: 'plug' },
        { id: 'h-lo', label: 'Host loopback', sub: 'the host’s own', pattern: 'external', icon: 'repeat' },
      ],
    },
    {
      id: 'api',
      label: 'catalog-api — its own namespace',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-eth', label: 'eth0', sub: '172.18.0.3 on catalog-net', pattern: 'network', icon: 'network' },
        { id: 'a-listen', label: 'Listens :8080', sub: 'on all its interfaces', pattern: 'service', icon: 'zap' },
        { id: 'a-lo', label: 'Its loopback', sub: 'not the host’s', pattern: 'external', icon: 'repeat' },
      ],
    },
    {
      id: 'db',
      label: 'catalog-db — its own namespace',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'd-eth', label: 'eth0', sub: '172.18.0.2 on catalog-net', pattern: 'network', icon: 'network' },
        { id: 'd-listen', label: 'Listens :5432', sub: 'PostgreSQL', pattern: 'service', icon: 'database' },
        { id: 'd-unpub', label: 'Not published', sub: 'no host port at all', pattern: 'storage', icon: 'lock' },
      ],
    },
    {
      id: 'net',
      label: 'catalog-net — what both are attached to',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-subnet', label: 'A private subnet', sub: '172.18.0.0/16', pattern: 'storage', icon: 'network' },
        { id: 'n-dns', label: 'Embedded DNS', sub: 'names to current IPs', pattern: 'storage', icon: 'search' },
        { id: 'n-gw', label: 'Gateway', sub: 'outbound via the host', pattern: 'storage', icon: 'router' },
      ],
    },
  ],
  edges: [
    { source: 'host', target: 'api', label: '127.0.0.1:8081 → :8080' },
    { source: 'api', target: 'db', label: 'catalog-db:5432' },
    { source: 'db', target: 'net', label: 'both members of', dashed: true },
  ],
}
