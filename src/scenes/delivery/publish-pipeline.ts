import type { Scene } from '@graphlearning/flow'

// §3 — an illustrative pipeline: build, prove the image starts and answers a representative request,
// and only then publish and record the digest. Any failed check stops before push, so nothing
// untested reaches the registry. Script is illustrative shell, not a specific CI product.
export const publishPipeline: Scene = {
  id: 'publish-pipeline',
  title: 'Build, verify, publish, record',
  flow: 'TB',
  nodes: [
    {
      id: 'script',
      kind: 'code',
      filename: 'ci.sh — illustrative',
      label: `set -euo pipefail                 # any failure stops the job
IMAGE=registry.example:5000/catalog/api:$GIT_SHA

docker build -t "$IMAGE" .
docker run -d --name ci-api -p 127.0.0.1:18080:8080 "$IMAGE"
curl -fsS --retry 10 --retry-connrefused http://127.0.0.1:18080/health
curl -fsS http://127.0.0.1:18080/items | grep -q '"name"'
docker rm -f ci-api

docker push "$IMAGE"
docker buildx imagetools inspect "$IMAGE" --format '{{.Manifest.Digest}}' > digest.txt`,
    },
    {
      id: 'steps',
      label: 'The order is the safety',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's-build', label: '1 Build', sub: 'tagged with the commit', pattern: 'service', icon: 'wrench' },
        { id: 's-start', label: '2 Starts?', sub: 'health endpoint answers', pattern: 'user', icon: 'power' },
        { id: 's-request', label: '3 Works?', sub: 'a real request, real data', pattern: 'user', icon: 'search' },
        { id: 's-push', label: '4 Push', sub: 'only after 2 and 3', pattern: 'network', icon: 'cloud' },
        { id: 's-record', label: '5 Record', sub: 'the digest, as evidence', pattern: 'storage', icon: 'fingerprint' },
        { id: 's-fail', label: 'Any failure', sub: 'stops before push', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'script', target: 'steps' }],
}
