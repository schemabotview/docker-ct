import type { Scene } from '@graphlearning/flow'

// §4 — one tested artifact, two environments. The image is identified by digest and never rebuilt;
// everything that differs between environments is runtime configuration or a runtime secret. The
// warn card is the anti-pattern: rebuilding per environment ships something nobody tested.
export const envConfig: Scene = {
  id: 'env-config',
  title: 'One artifact, many environments',
  flow: 'TB',
  nodes: [
    { id: 'artifact', label: 'One artifact', sub: 'one digest, tested once', pattern: 'service', icon: 'fingerprint' },
    {
      id: 'staging',
      label: 'Staging',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'st-db', label: 'Database URL', sub: 'staging-db', pattern: 'storage', icon: 'database' },
        { id: 'st-log', label: 'LOG_LEVEL', sub: 'debug', pattern: 'storage', icon: 'scroll' },
        { id: 'st-secret', label: 'Secret file', sub: 'staging password', pattern: 'network', icon: 'key' },
        { id: 'st-port', label: 'Published on', sub: 'internal host only', pattern: 'storage', icon: 'plug' },
      ],
    },
    {
      id: 'production',
      label: 'Production',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'pr-db', label: 'Database URL', sub: 'prod-db', pattern: 'storage', icon: 'database' },
        { id: 'pr-log', label: 'LOG_LEVEL', sub: 'info', pattern: 'storage', icon: 'scroll' },
        { id: 'pr-secret', label: 'Secret file', sub: 'production password', pattern: 'network', icon: 'key' },
        { id: 'pr-port', label: 'Published on', sub: 'behind the proxy', pattern: 'storage', icon: 'plug' },
      ],
    },
    {
      id: 'rules',
      label: 'Keeping them separate',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-same', label: 'Same digest', sub: 'in every environment', pattern: 'service', icon: 'circlecheck' },
        { id: 'r-secrets', label: 'Own secrets', sub: 'never shared across', pattern: 'service', icon: 'lock' },
        { id: 'r-rebuild', label: 'Rebuild per env', sub: 'ships untested code', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'artifact', target: 'staging', label: 'run with' },
    { source: 'artifact', target: 'production', label: 'run with' },
    { source: 'staging', target: 'rules', dashed: true },
    { source: 'production', target: 'rules', dashed: true },
  ],
}
