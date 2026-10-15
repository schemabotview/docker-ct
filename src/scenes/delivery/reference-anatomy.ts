import type { Scene } from '@graphlearning/flow'

// §1 — what every part of an image reference means, what the short forms expand to, and how a
// client proves it may push or pull. Registry host, namespace and credentials are placeholders; no
// publishing is required to follow the section.
export const referenceAnatomy: Scene = {
  id: 'reference-anatomy',
  title: 'Anatomy of an image reference',
  flow: 'TB',
  nodes: [
    {
      id: 'examples',
      kind: 'code',
      filename: 'references — placeholders',
      label: `registry.example:5000/catalog/api:1.4.0
registry.example:5000/catalog/api@sha256:9f2c…

postgres:16   →   docker.io/library/postgres:16

$ docker login registry.example:5000      # stores a credential
$ docker push registry.example:5000/catalog/api:1.4.0`,
    },
    {
      id: 'parts',
      label: 'The parts, left to right',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-host', label: 'Registry host', sub: 'registry.example', pattern: 'network', icon: 'cloud' },
        { id: 'p-ns', label: 'Namespace', sub: 'catalog — a team or org', pattern: 'storage', icon: 'folder' },
        { id: 'p-repo', label: 'Repository', sub: 'api — one image line', pattern: 'storage', icon: 'warehouse' },
        { id: 'p-tag', label: 'Tag', sub: ':1.4.0 — movable', pattern: 'network', icon: 'tag' },
        { id: 'p-digest', label: 'Digest', sub: '@sha256:… — fixed', pattern: 'service', icon: 'fingerprint' },
        { id: 'p-default', label: 'Defaults', sub: 'docker.io, library/, latest', pattern: 'warn', icon: 'search' },
      ],
    },
    {
      id: 'auth',
      label: 'Proving who you are',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-login', label: 'docker login', sub: 'saves a credential', pattern: 'user', icon: 'key' },
        { id: 'a-helper', label: 'Credential helper', sub: 'OS keychain, not plain file', pattern: 'service', icon: 'lock' },
        { id: 'a-ci', label: 'CI token', sub: 'short-lived, push only', pattern: 'service', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'examples', target: 'parts' },
    { source: 'parts', target: 'auth', label: 'to push or pull' },
  ],
}
