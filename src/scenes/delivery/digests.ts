import type { Scene } from '@graphlearning/flow'

// §2 — three references to "the same release", only one of which can move. A multi-platform tag points
// at an index; the index digest names the whole set; each platform image has its own digest, which is
// what a given host actually runs. Digests are shortened placeholders; output illustrative.
export const digests: Scene = {
  id: 'digests',
  title: 'Tags, index digests and platform digests',
  flow: 'TB',
  nodes: [
    {
      id: 'terminal',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker push registry.example:5000/catalog/api:1.4.0
1.4.0: digest: sha256:9f2c… size: 1784

$ docker buildx imagetools inspect registry.example:5000/catalog/api:1.4.0
Digest:    sha256:9f2c…            # the index
Manifests:
  linux/amd64   sha256:3c1e…       # what the server runs
  linux/arm64   sha256:a72b…

$ docker pull registry.example:5000/catalog/api@sha256:9f2c…`,
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Three references, one release',
      headers: ['Reference', 'Names', 'Can it change?'],
      values: [
        [':1.4.0', 'whatever was pushed last', 'yes'],
        ['@sha256:9f2c…', 'the index: all platforms', 'no'],
        ['@sha256:3c1e…', 'the amd64 image only', 'no'],
      ],
    },
    {
      id: 'record',
      label: 'What to record',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-deploy', label: 'Deploy', sub: 'by the index digest', pattern: 'service', icon: 'fingerprint' },
        { id: 'r-ran', label: 'What ran', sub: 'the platform digest', pattern: 'storage', icon: 'server' },
      ],
    },
  ],
  edges: [
    { source: 'terminal', target: 'table' },
    { source: 'table', target: 'record' },
  ],
}
