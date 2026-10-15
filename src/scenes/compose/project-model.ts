import type { Scene } from '@graphlearning/flow'

// §1 — the Chapter 5 CLI workflow, written down once. The YAML declares services, a volume and a
// secret; Compose turns it into named objects prefixed with the project name. The bottom row is the
// CLI the file replaces. Compose names follow its documented defaults; values are illustrative.
export const projectModel: Scene = {
  id: 'project-model',
  title: 'One file, one project',
  flow: 'TB',
  nodes: [
    {
      id: 'yaml',
      kind: 'code',
      filename: 'compose.yaml',
      label: `name: catalog
services:
  api:
    build: .
    ports: ["127.0.0.1:8081:8080"]
    environment:
      CATALOG_DB_HOST: db
    depends_on: [db]
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`,
    },
    {
      id: 'project',
      label: 'Project catalog — what Compose creates',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-api', label: 'Service api', sub: 'container catalog-api-1', pattern: 'service', icon: 'code' },
        { id: 'p-db', label: 'Service db', sub: 'container catalog-db-1', pattern: 'service', icon: 'database' },
        { id: 'p-net', label: 'Network', sub: 'catalog_default', pattern: 'network', icon: 'network' },
        { id: 'p-vol', label: 'Volume', sub: 'catalog_pgdata', pattern: 'storage', icon: 'harddrive' },
        { id: 'p-dns', label: 'Name db', sub: 'resolves on the network', pattern: 'network', icon: 'search' },
        { id: 'p-labels', label: 'Labels', sub: 'mark every object as catalog', pattern: 'storage', icon: 'tag' },
      ],
    },
    {
      id: 'replaces',
      label: 'The commands it replaces',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'r-net', label: 'network create', sub: 'catalog-net', pattern: 'user', icon: 'terminal' },
        { id: 'r-vol', label: 'volume create', sub: 'catalog-pgdata', pattern: 'user', icon: 'terminal' },
        { id: 'r-db', label: 'run the DB', sub: 'with -v and --network', pattern: 'user', icon: 'terminal' },
        { id: 'r-api', label: 'run the API', sub: 'with -p and -e', pattern: 'user', icon: 'terminal' },
      ],
    },
  ],
  edges: [
    { source: 'yaml', target: 'project', label: 'docker compose up' },
    { source: 'project', target: 'replaces', label: 'instead of', dashed: true },
  ],
}
