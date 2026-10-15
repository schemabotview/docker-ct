import type { Scene } from '@graphlearning/flow'

// §6 — an ARM laptop building for an x86 server. One tag points at an image INDEX listing one image
// per platform; the puller picks its own. The failure is an arm64-only image on an amd64 host. The
// three strategies are compared by cost, not ranked. Registry and digests are placeholders.
export const multiPlatform: Scene = {
  id: 'multi-platform',
  title: 'One tag, several platforms',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'terminal — illustrative',
      label: `$ docker buildx build --platform linux/amd64,linux/arm64 \\
    -t registry.example/catalog-api:1.4.0 --push .

$ docker buildx imagetools inspect registry.example/catalog-api:1.4.0
MediaType: application/vnd.oci.image.index.v1+json
Manifests:
  Platform: linux/amd64     Digest: sha256:3c1e…
  Platform: linux/arm64     Digest: sha256:a72b…`,
    },
    {
      id: 'index',
      label: 'Tag 1.4.0 → image index',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'i-amd', label: 'linux/amd64', sub: 'pulled by the server', pattern: 'service', icon: 'server' },
        { id: 'i-arm', label: 'linux/arm64', sub: 'pulled by the laptop', pattern: 'service', icon: 'monitor' },
        { id: 'i-fail', label: 'arm64 only?', sub: 'exec format error on amd64', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'strategies',
      label: 'Three ways to produce the other platform',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's-emu', label: 'Emulation', sub: 'QEMU; simple, slow', pattern: 'network', icon: 'cpu' },
        { id: 's-native', label: 'Native nodes', sub: 'a builder per arch; fast', pattern: 'network', icon: 'server' },
        { id: 's-cross', label: 'Cross-compile', sub: 'BUILDPLATFORM, TARGETARCH', pattern: 'network', icon: 'swap' },
        { id: 's-wheels', label: 'Native wheels', sub: 'needed for each arch', pattern: 'warn', icon: 'package' },
        { id: 's-base', label: 'Base variants', sub: 'check both are published', pattern: 'storage', icon: 'layers' },
        { id: 's-test', label: 'Test each', sub: 'run it on that platform', pattern: 'user', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'index' },
    { source: 'index', target: 'strategies', label: 'building it' },
  ],
}
