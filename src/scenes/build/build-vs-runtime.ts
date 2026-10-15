import type { Scene } from '@graphlearning/flow'

// §6 — what is decided when the image is BUILT versus when a container RUNS, and the one thing that
// belongs in neither. The bottom row is the plan's failure case: a secret copied into a layer and
// deleted by a later RUN is still in the earlier layer. The build secret mount is introduced as the
// alternative; its full workflow is Chapter 7.
export const buildVsRuntime: Scene = {
  id: 'build-vs-runtime',
  title: 'Build-time and run-time configuration',
  flow: 'TB',
  nodes: [
    {
      id: 'build-time',
      label: 'Build time — baked into the image',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-arg', label: 'ARG', sub: 'build input, e.g. version', pattern: 'storage', icon: 'tag' },
        { id: 'b-env', label: 'ENV', sub: 'a default, can be overridden', pattern: 'storage', icon: 'key' },
        { id: 'b-files', label: 'Files', sub: 'code and libraries', pattern: 'storage', icon: 'folder' },
      ],
    },
    {
      id: 'run-time',
      label: 'Run time — per container',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-env', label: '-e', sub: 'database URL, log level', pattern: 'service', icon: 'key' },
        { id: 'r-port', label: '-p', sub: 'which host port', pattern: 'service', icon: 'plug' },
        { id: 'r-args', label: 'Arguments', sub: 'replace CMD', pattern: 'service', icon: 'terminal' },
      ],
    },
    {
      id: 'mistake',
      label: 'A secret copied by mistake',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'x-copy', label: 'Layer 4', sub: 'COPY . . includes .env', pattern: 'warn', icon: 'layers' },
        { id: 'x-rm', label: 'Layer 5', sub: 'RUN rm .env', pattern: 'warn', icon: 'trash' },
        { id: 'x-still', label: 'Still in layer 4', sub: 'anyone with the image can read it', pattern: 'warn', icon: 'skull' },
      ],
    },
    { id: 'secret-mount', label: 'Build secret mount', sub: 'one RUN sees it; no layer keeps it', pattern: 'user', icon: 'lock' },
  ],
  edges: [
    { source: 'build-time', target: 'run-time', label: 'docker run' },
    { source: 'run-time', target: 'mistake', label: 'secrets belong in neither', dashed: true },
    { source: 'mistake', target: 'secret-mount', label: 'instead' },
  ],
}
