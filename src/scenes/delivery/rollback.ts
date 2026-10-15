import type { Scene } from '@graphlearning/flow'

// §6 — why "roll back the image" is only sometimes a complete answer. Two releases compared: one
// changes only code (rollback is safe); one runs a destructive schema migration that the older image
// cannot read (rollback breaks, and data recovery means restoring a backup). The prerequisites row is
// what must exist BEFORE the release for either path to be available.
export const rollback: Scene = {
  id: 'rollback',
  title: 'Rollback and the database',
  flow: 'TB',
  nodes: [
    {
      id: 'safe',
      label: '1.4.1 — code only',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'sa-change', label: 'Change', sub: 'new sort order', pattern: 'storage', icon: 'code' },
        { id: 'sa-schema', label: 'Schema', sub: 'unchanged', pattern: 'service', icon: 'table' },
        { id: 'sa-back', label: 'Roll back', sub: 'redeploy 1.4.0 digest', pattern: 'service', icon: 'repeat' },
      ],
    },
    {
      id: 'risky',
      label: '1.5.0 — renames a column',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'ri-change', label: 'Migration', sub: 'renames price column', pattern: 'warn', icon: 'database' },
        { id: 'ri-old', label: 'Old image', sub: 'queries a missing column', pattern: 'warn', icon: 'bug' },
        { id: 'ri-restore', label: 'Recovery', sub: 'restore; newer writes lost', pattern: 'warn', icon: 'history' },
      ],
    },
    {
      id: 'before',
      label: 'Prerequisites — before releasing',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-digest', label: 'Previous digest', sub: 'recorded, still pullable', pattern: 'service', icon: 'fingerprint' },
        { id: 'b-backup', label: 'Verified backup', sub: 'taken before migrating', pattern: 'service', icon: 'harddrive' },
        { id: 'b-expand', label: 'Expand first', sub: 'add, then remove later', pattern: 'service', icon: 'merge' },
        { id: 'b-check', label: 'Compatibility', sub: 'old image on new schema?', pattern: 'user', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'safe', target: 'before', dashed: true },
    { source: 'risky', target: 'before', label: 'needs all of these' },
  ],
}
