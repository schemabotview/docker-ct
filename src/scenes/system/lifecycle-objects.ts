import type { Scene } from '@graphlearning/flow'

// §3 — the four objects and the verbs between them. A Dockerfile builds an image; an image is pushed
// to and pulled from a registry; a container is created FROM an image and has a life of its own.
// The build and run verbs are named on their groups: an edge between two leaves of the same
// container routes out and back in, and its label lands on a card.
// Three containers off one image make the image/container distinction visible: same template,
// different states.
export const lifecycleObjects: Scene = {
  id: 'lifecycle-objects',
  title: 'Images, containers and registries',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'dev',
      label: 'Build machine — docker build',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'dockerfile', label: 'Dockerfile', sub: 'build instructions', pattern: 'storage', icon: 'filecode' },
        { id: 'image-local', label: 'Image', sub: 'catalog-api:1.0', pattern: 'storage', icon: 'layers' },
      ],
    },
    {
      id: 'registry',
      label: 'Registry',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'repo', label: 'Repository', sub: 'catalog-api', pattern: 'network', icon: 'warehouse' },
        { id: 'tag', label: 'Tag → digest', sub: '1.0 → sha256:…', pattern: 'network', icon: 'tag' },
      ],
    },
    {
      id: 'server',
      label: 'Run machine — docker run',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'image-pulled', label: 'Image', sub: 'read-only template', pattern: 'storage', icon: 'layers' },
        { id: 'ctr-running', label: 'Container', sub: 'running · api-1', pattern: 'service', icon: 'box' },
        { id: 'ctr-second', label: 'Container', sub: 'running · api-2', pattern: 'service', icon: 'box' },
        { id: 'ctr-exited', label: 'Container', sub: 'exited · migrate', pattern: 'warn', icon: 'box' },
      ],
    },
  ],
  edges: [
    { source: 'dev', target: 'registry', label: 'push' },
    { source: 'registry', target: 'server', label: 'pull' },
  ],
}
