import type { Scene } from '@graphlearning/flow'

// §3 — a release runbook as written steps with explicit decision points, followed through once. The
// rollback branch is chosen by evidence (the post-release check), and is only safe because the
// prerequisites from Chapter 9 were checked BEFORE step 1.
export const runbook: Scene = {
  id: 'runbook',
  title: 'A release runbook',
  flow: 'TB',
  nodes: [
    {
      id: 'before',
      label: 'Before — prerequisites',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-staging', label: 'Staging passed', sub: 'same digest', pattern: 'user', icon: 'circlecheck' },
        { id: 'b-backup', label: 'Backup verified', sub: 'restored this week', pattern: 'user', icon: 'harddrive' },
        { id: 'b-prev', label: 'Previous digest', sub: 'written down', pattern: 'user', icon: 'history' },
      ],
    },
    {
      id: 'release',
      label: 'Release',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-pin', label: '1 Pin digest', sub: 'in compose.prod.yaml', pattern: 'service', icon: 'fingerprint' },
        { id: 'r-up', label: '2 pull, up -d api', sub: 'only the API', pattern: 'service', icon: 'repeat' },
        { id: 'r-check', label: '3 Check', sub: 'health and a real request', pattern: 'service', icon: 'search' },
      ],
    },
    {
      id: 'decide',
      label: 'Decision point',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'd-pass', label: 'Checks pass', sub: 'record, watch an hour', pattern: 'service', icon: 'circlecheck' },
        { id: 'd-fail', label: 'Checks fail', sub: 'roll back to previous', pattern: 'warn', icon: 'repeat' },
      ],
    },
    {
      id: 'maintain',
      label: 'Regular maintenance',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-rebuild', label: 'Weekly rebuild', sub: 'patched base, --pull', pattern: 'storage', icon: 'calendar' },
        { id: 'm-findings', label: 'Review findings', sub: 'decide and record', pattern: 'storage', icon: 'scroll' },
        { id: 'm-drill', label: 'Restore drill', sub: 'monthly', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'before', target: 'release' },
    { source: 'release', target: 'decide' },
    { source: 'decide', target: 'maintain', dashed: true },
  ],
}
