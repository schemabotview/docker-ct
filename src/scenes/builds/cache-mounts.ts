import type { Scene } from '@graphlearning/flow'

// §4 — three caches with three lifetimes. The layer cache skips unchanged steps; a cache mount keeps
// a tool's own download cache across runs of a step that DOES rerun, and never enters the image; an
// exported cache lets a fresh CI runner start warm. Registry refs are placeholders.
export const cacheMounts: Scene = {
  id: 'cache-mounts',
  title: 'Cache mounts and CI caches',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Dockerfile line  +  CI build command',
      label: `RUN --mount=type=cache,target=/root/.cache/pip \\
    pip install -r requirements.txt

$ docker buildx build \\
    --cache-from type=registry,ref=registry.example/catalog-api:buildcache \\
    --cache-to   type=registry,ref=registry.example/catalog-api:buildcache,mode=max \\
    -t registry.example/catalog-api:1.4.0 --push .`,
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Three caches, three lifetimes',
      headers: ['Cache', 'Saves', 'Lives in', 'In the image?'],
      values: [
        ['Layer cache', 'whole unchanged steps', 'the builder', 'no'],
        ['Cache mount', 'downloads when a step reruns', 'the builder', 'never'],
        ['Exported cache', 'a cold CI runner’s work', 'registry or CI cache', 'no'],
      ],
    },
    {
      id: 'ci',
      label: 'Why CI needs the third one',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-fresh', label: 'Fresh runner', sub: 'empty builder each job', pattern: 'warn', icon: 'box' },
        { id: 'c-import', label: '--cache-from', sub: 'start warm', pattern: 'service', icon: 'cloud' },
        { id: 'c-export', label: '--cache-to', sub: 'save for next job', pattern: 'service', icon: 'share' },
        { id: 'c-max', label: 'mode=max', sub: 'include build stages', pattern: 'storage', icon: 'layers' },
        { id: 'c-correct', label: 'Never required', sub: 'a cold build must still work', pattern: 'user', icon: 'circlecheck' },
        { id: 'c-trust', label: 'Trust it', sub: 'only from your own registry', pattern: 'warn', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'table' },
    { source: 'table', target: 'ci', label: 'the last row' },
  ],
}
