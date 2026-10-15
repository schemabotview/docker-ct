import type { Scene } from '@graphlearning/flow'

// §1 — the build context is a file set, chosen before any instruction runs. The project folder holds
// more than the image needs (and one file it must never contain); `.dockerignore` filters it, and only
// what survives is sent to the builder. COPY can only reach files in that filtered set.
export const buildContext: Scene = {
  id: 'build-context',
  title: 'What the builder receives',
  flow: 'TB',
  nodes: [
    {
      id: 'project',
      label: 'Project folder — docker build .',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-dockerfile', label: 'Dockerfile', sub: 'build instructions', pattern: 'storage', icon: 'filecode' },
        { id: 'p-src', label: 'src/', sub: 'application code', pattern: 'storage', icon: 'code' },
        { id: 'p-reqs', label: 'requirements', sub: 'requirements.txt', pattern: 'storage', icon: 'file' },
        { id: 'p-git', label: '.git/', sub: 'history, large', pattern: 'external', icon: 'gitbranch' },
        { id: 'p-tests', label: 'tests/', sub: 'not needed to run', pattern: 'external', icon: 'search' },
        { id: 'p-env', label: '.env', sub: 'database password', pattern: 'warn', icon: 'key' },
      ],
    },
    {
      id: 'ignore',
      kind: 'code',
      filename: '.dockerignore',
      label: `.git
tests/
.env
*.env
__pycache__/`,
    },
    {
      id: 'context',
      label: 'Build context — sent to the builder',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-dockerfile', label: 'Dockerfile', sub: 'read by the builder', pattern: 'service', icon: 'filecode' },
        { id: 'c-src', label: 'src/', sub: 'available to COPY', pattern: 'service', icon: 'code' },
        { id: 'c-reqs', label: 'requirements', sub: 'available to COPY', pattern: 'service', icon: 'file' },
      ],
    },
  ],
  edges: [
    { source: 'project', target: 'ignore', label: 'filtered by' },
    { source: 'ignore', target: 'context', label: 'what remains' },
  ],
}
