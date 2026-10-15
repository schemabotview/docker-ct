import type { Scene } from '@graphlearning/flow'

// §4 — building the filesystem, and the order that keeps it maintainable. The good order copies the
// dependency list alone, installs, then copies source, so a source edit does not reinstall. The
// contrast card is the one-line `COPY . .` first. `RUN cd` is the other classic: each RUN is a fresh
// shell, so only WORKDIR persists.
export const copyRunWorkdir: Scene = {
  id: 'copy-run-workdir',
  title: 'COPY, RUN and WORKDIR',
  flow: 'TB',
  nodes: [
    {
      id: 'good',
      kind: 'code',
      filename: 'Dockerfile — dependency list first',
      label: `WORKDIR /app                     # every later path is relative to /app
COPY requirements.txt .          # only the dependency list
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/                 # source last: it changes most`,
    },
    {
      id: 'result',
      label: 'What the image now contains',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-app', label: '/app', sub: 'created by WORKDIR', pattern: 'storage', icon: 'folder' },
        { id: 'f-reqs', label: 'requirements', sub: 'requirements.txt', pattern: 'storage', icon: 'file' },
        { id: 'f-src', label: 'src/', sub: '/app/src, from context', pattern: 'storage', icon: 'code' },
        { id: 'f-libs', label: 'Libraries', sub: 'site-packages, by RUN', pattern: 'storage', icon: 'package' },
        { id: 'f-owner', label: 'Owned by root', sub: 'readable by all users', pattern: 'network', icon: 'lock' },
        { id: 'f-noenv', label: 'No .env', sub: 'excluded from context', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'mistakes',
      label: 'Two common mistakes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm-copyall', label: 'COPY . . first', sub: 'any edit reinstalls every library', pattern: 'warn', icon: 'repeat' },
        { id: 'm-cd', label: 'RUN cd /app', sub: 'lost: each RUN is a new shell', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'good', target: 'result' },
    { source: 'result', target: 'mistakes', label: 'compare', dashed: true },
  ],
}
