import type { Scene } from '@graphlearning/flow'

// §4 — what each Compose command does to each kind of object. The table is the whole point: `down`
// removes containers and the network but KEEPS named volumes; only `down -v` deletes catalog_pgdata,
// and with it every row in the database. The terminal shows the observation commands; output
// illustrative.
export const lifecycle: Scene = {
  id: 'lifecycle',
  title: 'Up, observe, recreate, down',
  flow: 'TB',
  nodes: [
    {
      id: 'observe',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker compose up -d
$ docker compose ps
NAME            SERVICE  STATUS                   PORTS
catalog-api-1   api      Up 2 minutes             127.0.0.1:8081->8080/tcp
catalog-db-1    db       Up 2 minutes (healthy)   5432/tcp

$ docker compose logs -f api
# edit compose.yaml: LOG_LEVEL changed for api only
$ docker compose up -d          # recreates api; db untouched`,
    },
    {
      id: 'table',
      kind: 'table',
      label: 'What each command does',
      headers: ['Command', 'Containers', 'Network', 'catalog_pgdata'],
      values: [
        ['up -d', 'created, started', 'created', 'created if new'],
        ['up -d (changed)', 'changed ones recreated', 'kept', 'kept'],
        ['stop', 'stopped', 'kept', 'kept'],
        ['down', 'removed', 'removed', 'kept'],
        ['down -v', 'removed', 'removed', 'DELETED: all rows'],
      ],
    },
    {
      id: 'rule',
      label: 'down -v',
      sub: 'deletes data; back up first',
      pattern: 'warn',
      icon: 'trash',
    },
  ],
  edges: [
    { source: 'observe', target: 'table' },
    { source: 'table', target: 'rule', label: 'the last row', dashed: true },
  ],
}
