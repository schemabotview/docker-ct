import type { Scene } from '@graphlearning/flow'

// §3 — where each service's image comes from, and checking the file before running it. `build:` makes
// the image from a context (and `image:` beside it names the result); `image:` alone is pulled. The
// validation row is read-only and catches most mistakes before anything is created.
export const buildValidate: Scene = {
  id: 'build-validate',
  title: 'Build or pull, then validate',
  flow: 'TB',
  nodes: [
    {
      id: 'yaml',
      kind: 'code',
      filename: 'compose.yaml — image sources',
      label: `services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        APP_VERSION: "1.4.0"
    image: catalog-api:1.4.0     # names the built image
  db:
    image: postgres:16           # pulled, never built`,
    },
    {
      id: 'sources',
      label: 'Two ways a service gets its image',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-build', label: 'build:', sub: 'context, Dockerfile, args', pattern: 'service', icon: 'wrench' },
        { id: 's-image', label: 'image:', sub: 'pulled from a registry', pattern: 'network', icon: 'cloud' },
        { id: 's-both', label: 'Both', sub: 'build, then tag with image:', pattern: 'service', icon: 'tag' },
        { id: 's-rebuild', label: 'Code changed', sub: 'up --build, or build', pattern: 'user', icon: 'repeat' },
      ],
    },
    {
      id: 'validate',
      label: 'Validate before up — read-only',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'v-quiet', label: 'config -q', sub: 'errors only', pattern: 'service', icon: 'circlecheck' },
        { id: 'v-services', label: 'config --services', sub: 'what will run', pattern: 'service', icon: 'search' },
        { id: 'v-full', label: 'config', sub: 'full resolved file', pattern: 'warn', icon: 'file' },
      ],
    },
  ],
  edges: [
    { source: 'yaml', target: 'sources' },
    { source: 'sources', target: 'validate', label: 'docker compose config' },
  ],
}
