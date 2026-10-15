import type { Scene } from '@graphlearning/flow'

// §2 — the version record the plan asks every detailed lesson to keep, applied to the running system.
// The values are placeholders on purpose: this course asserts no versions, so the record shows what to
// capture and where to read it, not what the answers are.
export const versionRecord: Scene = {
  id: 'version-record',
  title: 'Reproducibility and the version record',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'table',
      label: 'Version record — capture, never assume',
      headers: ['Component', 'Recorded as', 'Read it with'],
      values: [
        ['Docker Engine', '<engine version>', 'docker version'],
        ['Docker Desktop', '<desktop version>', 'Desktop: About'],
        ['Compose plugin', '<compose version>', 'docker compose version'],
        ['Buildx', '<buildx version>', 'docker buildx version'],
        ['Dockerfile frontend', '# syntax= line', 'the Dockerfile'],
        ['API image', 'sha256:9f2c…', 'release record'],
        ['Database image', 'postgres:16 @ digest', 'compose.prod.yaml'],
        ['App dependencies', 'lock file hash', 'requirements lock'],
      ],
    },
    {
      id: 'why',
      label: 'What the record is for',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-rebuild', label: 'Rebuild', sub: 'the same thing later', pattern: 'service', icon: 'repeat' },
        { id: 'w-compare', label: 'Compare', sub: 'what changed between two', pattern: 'service', icon: 'search' },
        { id: 'w-docs', label: 'Read docs', sub: 'for these versions', pattern: 'service', icon: 'file' },
        { id: 'w-when', label: 'When', sub: 'at every release', pattern: 'user', icon: 'calendar' },
        { id: 'w-where', label: 'Where', sub: 'beside the release record', pattern: 'user', icon: 'folder' },
        { id: 'w-who', label: 'How', sub: 'captured by the pipeline', pattern: 'user', icon: 'workflow' },
      ],
    },
  ],
  edges: [{ source: 'record', target: 'why' }],
}
