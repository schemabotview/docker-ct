import type { Scene } from '@graphlearning/flow'

// §2 — the build log is the evidence for cache decisions. Same Dockerfile, two edits: a source-only
// change reruns only the last COPY; a dependency change invalidates the install step and everything
// after it. Step numbers and timings are illustrative and trimmed.
export const cacheTrace: Scene = {
  id: 'cache-trace',
  title: 'Reading a rebuild trace',
  flow: 'TB',
  nodes: [
    {
      id: 'traces',
      label: 'Same Dockerfile, two different edits',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'src-edit',
          kind: 'code',
          filename: 'edit src/catalog/api.py',
          label: `[1/5] FROM python:3.12-slim
[2/5] WORKDIR /app                  CACHED
[3/5] COPY requirements.txt .       CACHED
[4/5] RUN pip install -r …          CACHED
[5/5] COPY src/ ./src/              0.1s

# one small layer rebuilt`,
        },
        {
          id: 'dep-edit',
          kind: 'code',
          filename: 'edit requirements.txt',
          label: `[1/5] FROM python:3.12-slim
[2/5] WORKDIR /app                  CACHED
[3/5] COPY requirements.txt .       0.1s
[4/5] RUN pip install -r …          38.2s
[5/5] COPY src/ ./src/              0.1s

# install and everything after it`,
        },
      ],
    },
    {
      id: 'rules',
      label: 'How the cache decides',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-key', label: 'A step is reused', sub: 'if it and its inputs match', pattern: 'service', icon: 'circlecheck' },
        { id: 'r-chain', label: 'One miss', sub: 'reruns every later step', pattern: 'warn', icon: 'repeat' },
        { id: 'r-order', label: 'Order', sub: 'stable first, volatile last', pattern: 'service', icon: 'sortarrows' },
        { id: 'r-blind', label: 'Blind spot', sub: 'RUN apt update is reused', pattern: 'warn', icon: 'search' },
      ],
    },
    {
      id: 'fresh',
      label: 'Deliberate freshness',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'f-pull', label: '--pull', sub: 'check for a newer base', pattern: 'user', icon: 'cloud' },
        { id: 'f-nocache', label: '--no-cache', sub: 'rerun every step', pattern: 'user', icon: 'zap' },
        { id: 'f-schedule', label: 'On a schedule', sub: 'e.g. weekly, with --pull', pattern: 'user', icon: 'calendar' },
        { id: 'f-compare', label: 'Compare digests', sub: 'did anything change?', pattern: 'user', icon: 'fingerprint' },
      ],
    },
  ],
  edges: [
    { source: 'traces', target: 'rules' },
    { source: 'rules', target: 'fresh', label: 'when cached is wrong' },
  ],
}
