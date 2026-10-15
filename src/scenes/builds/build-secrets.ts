import type { Scene } from '@graphlearning/flow'

// §5 — a credential that the BUILD needs (a private package index token, a git deploy key) and the
// IMAGE must never contain. The secret mount exposes it to one RUN as a file; the SSH mount forwards
// an agent instead of copying a key. The bottom row is the plan's point: the mount protects the
// layer, not against a command that logs or copies the value. Names and URLs are placeholders.
export const buildSecrets: Scene = {
  id: 'build-secrets',
  title: 'Secrets and SSH during a build',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Dockerfile  +  build command',
      label: `RUN --mount=type=secret,id=pip_token \\
    PIP_INDEX_URL="https://__token__:$(cat /run/secrets/pip_token)@pypi.example/simple" \\
    pip install -r requirements.txt

RUN --mount=type=ssh git clone git@git.example:team/catalog-data.git

$ docker build --secret id=pip_token,src=./pip_token.txt \\
    --ssh default -t catalog-api:1.4.0 .`,
    },
    {
      id: 'works',
      label: 'What the mount guarantees',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-one', label: 'One RUN', sub: 'only that step sees it', pattern: 'service', icon: 'lock' },
        { id: 'w-file', label: '/run/secrets', sub: 'a file, then gone', pattern: 'service', icon: 'file' },
        { id: 'w-ssh', label: 'SSH agent', sub: 'key never copied in', pattern: 'service', icon: 'key' },
      ],
    },
    {
      id: 'leaks',
      label: 'Ways a command can still leak it',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-echo', label: 'Printed', sub: 'echo, set -x, verbose tools', pattern: 'warn', icon: 'scroll' },
        { id: 'l-copy', label: 'Copied', sub: 'written to a file in the layer', pattern: 'warn', icon: 'copy' },
        { id: 'l-config', label: 'Persisted', sub: 'saved in a tool’s config', pattern: 'warn', icon: 'wrench' },
        { id: 'l-arg', label: 'ARG / ENV', sub: 'recorded in the image', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'works' },
    { source: 'works', target: 'leaks', label: 'but not against' },
  ],
}
