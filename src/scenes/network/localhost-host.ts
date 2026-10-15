import type { Scene } from '@graphlearning/flow'

// §5 — what "localhost" means depends on whose namespace you are in. The failing config uses localhost
// for the database and reaches the API container itself. Reaching the HOST from a container is
// platform-dependent: Desktop provides host.docker.internal, Linux Engine needs it mapped to the
// host-gateway explicitly, and host networking (Linux) removes the isolation altogether.
export const localhostHost: Scene = {
  id: 'localhost-host',
  title: 'localhost, other containers and the host',
  flow: 'TB',
  nodes: [
    {
      id: 'mistake',
      kind: 'code',
      filename: 'catalog-api — environment',
      label: `CATALOG_DB_URL=postgresql://catalog:example@localhost:5432/catalog
# → connection refused: nothing listens on 5432 in THIS container

CATALOG_DB_URL=postgresql://catalog:example@catalog-db:5432/catalog
# → works: the other container, by name`,
    },
    {
      id: 'meanings',
      label: 'From inside catalog-api',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-local', label: 'localhost', sub: 'catalog-api itself', pattern: 'warn', icon: 'repeat' },
        { id: 'm-peer', label: 'catalog-db', sub: 'another container', pattern: 'service', icon: 'database' },
        { id: 'm-host', label: 'The host', sub: 'depends on platform', pattern: 'network', icon: 'server' },
      ],
    },
    {
      id: 'host-access',
      label: 'Reaching a service on the host',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-desktop', label: 'Docker Desktop', sub: 'host.docker.internal', pattern: 'service', icon: 'monitor' },
        { id: 'h-linux', label: 'Linux Engine', sub: '--add-host … host-gateway', pattern: 'network', icon: 'wrench' },
        { id: 'h-hostnet', label: '--network host', sub: 'Linux; no isolation', pattern: 'warn', icon: 'ban' },
        { id: 'h-listen', label: 'Host service', sub: 'must not bind loopback only', pattern: 'warn', icon: 'plug' },
        { id: 'h-name', label: 'Use the name', sub: 'gateway IPs differ', pattern: 'service', icon: 'tag' },
        { id: 'h-vm', label: 'On Desktop', sub: 'the host is outside the VM', pattern: 'storage', icon: 'monitor' },
      ],
    },
  ],
  edges: [
    { source: 'mistake', target: 'meanings' },
    { source: 'meanings', target: 'host-access', label: 'for the host' },
  ],
}
