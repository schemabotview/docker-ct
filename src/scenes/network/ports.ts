import type { Scene } from '@graphlearning/flow'

// §4 — three different "ports" that people call by one name. The table lays them out for both
// services: what the process listens on, what the image's EXPOSE records, what -p publishes, and who
// can therefore connect. The warn card is the misconception the database row disproves: unpublished
// is not the same as unreachable — every peer on catalog-net can still connect to 5432.
export const ports: Scene = {
  id: 'ports',
  title: 'Listening, EXPOSE and publishing',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Three meanings of “port”',
      headers: ['', 'catalog-api', 'catalog-db'],
      values: [
        ['Listens in container', '0.0.0.0:8080', '0.0.0.0:5432'],
        ['EXPOSE in image', '8080', '5432'],
        ['Published with -p', '127.0.0.1:8081', 'none'],
        ['Reachable from host', 'yes, 8081', 'no'],
        ['Reachable from catalog-net', 'yes, 8080', 'yes, 5432'],
      ],
    },
    {
      id: 'facts',
      label: 'What each one controls',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'f-listen', label: 'Listening', sub: 'the app’s own bind', pattern: 'service', icon: 'zap' },
        { id: 'f-expose', label: 'EXPOSE', sub: 'documentation only', pattern: 'storage', icon: 'file' },
        { id: 'f-publish', label: '-p', sub: 'a host port forwarded in', pattern: 'network', icon: 'plug' },
        { id: 'f-all', label: '-P', sub: 'random host ports for EXPOSE', pattern: 'network', icon: 'hash' },
      ],
    },
    {
      id: 'misread',
      label: 'Not private',
      sub: 'catalog-net peers still reach 5432',
      pattern: 'warn',
      icon: 'shieldcheck',
    },
  ],
  edges: [
    { source: 'table', target: 'facts' },
    { source: 'facts', target: 'misread', dashed: true },
  ],
}
