import type { Scene } from '@graphlearning/flow'

// §5 — promotion moves a DECISION, not bytes. Tag drift is the failure (a `prod` tag repointed by an
// unrelated push); deploying by recorded digest is the fix. The replacement itself is controlled:
// pull the pinned digest, recreate, check health and a real request, and write down what happened.
export const promotion: Scene = {
  id: 'promotion',
  title: 'Promotion and controlled replacement',
  flow: 'TB',
  nodes: [
    {
      id: 'drift',
      kind: 'table',
      label: 'Tag drift — the same line, two meanings',
      headers: ['When', 'catalog/api:prod points to', 'Tested?'],
      values: [
        ['Monday, after release', 'sha256:9f2c…', 'yes'],
        ['Wednesday, someone pushed', 'sha256:e41d…', 'no'],
      ],
    },
    {
      id: 'deploy',
      kind: 'code',
      filename: 'compose.prod.yaml — deploy by digest',
      label: `services:
  api:
    image: registry.example:5000/catalog/api@sha256:9f2c…

$ docker compose -f compose.yaml -f compose.prod.yaml pull api
$ docker compose -f compose.yaml -f compose.prod.yaml up -d api`,
    },
    {
      id: 'evidence',
      label: 'Release evidence — written down',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'e-what', label: 'What', sub: 'the digest deployed', pattern: 'storage', icon: 'fingerprint' },
        { id: 'e-prev', label: 'Previous', sub: 'the digest it replaced', pattern: 'storage', icon: 'history' },
        { id: 'e-check', label: 'Checks', sub: 'health and a request', pattern: 'service', icon: 'circlecheck' },
        { id: 'e-who', label: 'Who, when', sub: 'and from which commit', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'drift', target: 'deploy', label: 'instead' },
    { source: 'deploy', target: 'evidence', label: 'then record' },
  ],
}
