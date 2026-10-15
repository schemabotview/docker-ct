import type { Scene } from '@graphlearning/flow'

// §7 — names versus identity, and why neither alone is a maintenance policy. A tag is a pointer that can
// move; a digest is the content's hash and cannot. Pinning a digest makes builds repeatable but freezes
// out security fixes, so the update path is a deliberate rebuild that produces a NEW digest to record.
// Digests are shortened placeholders.
export const tagsDigests: Scene = {
  id: 'tags-digests',
  title: 'Tags, digests and controlled updates',
  flow: 'TB',
  nodes: [
    {
      id: 'names',
      label: 'One repository, two kinds of reference',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-tag', label: 'Tag 3.12-slim', sub: 'a pointer that moves', pattern: 'network', icon: 'tag' },
        { id: 'n-digest', label: 'Digest', sub: 'sha256:9f2c… fixed', pattern: 'storage', icon: 'fingerprint' },
        { id: 'n-latest', label: 'Tag latest', sub: 'just a name, not newest', pattern: 'warn', icon: 'tag' },
      ],
    },
    {
      id: 'timeline',
      label: 'The same FROM line, a month apart',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-monday', label: 'Week 1', sub: 'tag → sha256:9f2c…', pattern: 'storage', icon: 'calendar' },
        { id: 't-patch', label: 'Base patched', sub: 'publisher rebuilds', pattern: 'network', icon: 'wrench' },
        { id: 't-later', label: 'Week 5', sub: 'tag → sha256:4b71…', pattern: 'storage', icon: 'calendar' },
      ],
    },
    {
      id: 'policy',
      label: 'A controlled update',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-pin', label: 'Pin by digest', sub: 'repeatable builds', pattern: 'service', icon: 'lock' },
        { id: 'p-frozen', label: 'But frozen', sub: 'no fixes arrive alone', pattern: 'warn', icon: 'snowflake' },
        { id: 'p-rebuild', label: 'Rebuild and test', sub: 'bump the pin on purpose', pattern: 'service', icon: 'repeat' },
        { id: 'p-record', label: 'Record result', sub: 'new tag and its digest', pattern: 'service', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'names', target: 'timeline', label: 'tags move' },
    { source: 'timeline', target: 'policy', label: 'so decide when' },
  ],
}
