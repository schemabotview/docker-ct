import type { Scene } from '@graphlearning/flow'

// §1 — who builds, and where the result goes. The CLI sends the build to a BuildKit builder (the
// default one inside the daemon, or a separate container builder); the builder keeps a cache, and the
// result goes to one of three destinations. "No output" is the trap: the result exists only in the
// builder's cache. Builder names and registry are placeholders.
export const buildersOutputs: Scene = {
  id: 'builders-outputs',
  title: 'Builders and output destinations',
  flow: 'TB',
  nodes: [
    {
      id: 'cmds',
      kind: 'code',
      filename: 'terminal — illustrative',
      label: `$ docker buildx ls                     # builders and their platforms
$ docker buildx create --name ci --driver docker-container
$ docker buildx build --builder ci \\
    -t registry.example/catalog-api:1.4.0 --push .`,
    },
    {
      id: 'builders',
      label: 'Builders — where BuildKit runs',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-default', label: 'default', sub: 'inside the daemon', pattern: 'service', icon: 'server' },
        { id: 'b-ci', label: 'ci', sub: 'its own container', pattern: 'service', icon: 'box' },
        { id: 'b-cache', label: 'Build cache', sub: 'kept by each builder', pattern: 'storage', icon: 'layers' },
      ],
    },
    {
      id: 'outputs',
      label: 'Where the result goes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-load', label: '--load', sub: 'into the local image store', pattern: 'storage', icon: 'harddrive' },
        { id: 'o-push', label: '--push', sub: 'to a registry', pattern: 'network', icon: 'cloud' },
        { id: 'o-local', label: '--output', sub: 'files or a tarball', pattern: 'storage', icon: 'folder' },
        { id: 'o-none', label: 'No output', sub: 'result stays in builder cache', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'cmds', target: 'builders', label: 'the CLI sends the build' },
    { source: 'builders', target: 'outputs', label: 'one destination' },
  ],
}
