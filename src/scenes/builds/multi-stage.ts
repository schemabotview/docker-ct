import type { Scene } from '@graphlearning/flow'

// §3 — separating what BUILDS the application from what RUNS it. The build stage has compilers and
// headers to produce a virtual environment; the runtime stage starts clean and copies only that
// result. No size figure is promised — the bottom row says to measure. Tags are illustrative.
export const multiStage: Scene = {
  id: 'multi-stage',
  title: 'Build stage and runtime stage',
  flow: 'TB',
  nodes: [
    {
      id: 'dockerfile',
      kind: 'code',
      filename: 'Dockerfile — two stages',
      label: `FROM python:3.12-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev
RUN python -m venv /opt/venv
COPY requirements.txt .
RUN /opt/venv/bin/pip install -r requirements.txt

FROM python:3.12-slim AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends libpq5
COPY --from=build /opt/venv /opt/venv
COPY src/ /app/src/
USER 10001
CMD ["/opt/venv/bin/python", "-m", "catalog", "serve"]`,
    },
    {
      id: 'build',
      label: 'Stage build — discarded',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'bs-gcc', label: 'Compiler', sub: 'gcc, only to build', pattern: 'warn', icon: 'wrench' },
        { id: 'bs-headers', label: 'Headers', sub: 'libpq-dev', pattern: 'warn', icon: 'file' },
        { id: 'bs-cache', label: 'pip cache', sub: 'downloads, sources', pattern: 'warn', icon: 'package' },
        { id: 'bs-venv', label: '/opt/venv', sub: 'the useful result', pattern: 'service', icon: 'folder' },
      ],
    },
    {
      id: 'runtime',
      label: 'Stage runtime — the image you ship',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'rs-base', label: 'Clean base', sub: 'plus runtime libpq5', pattern: 'storage', icon: 'layers' },
        { id: 'rs-venv', label: '/opt/venv', sub: 'copied from build', pattern: 'service', icon: 'folder' },
        { id: 'rs-src', label: 'Source', sub: '/app/src', pattern: 'service', icon: 'code' },
        { id: 'rs-none', label: 'No compiler', sub: 'less to patch, less to abuse', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'notes',
      label: 'Working with stages',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-target', label: '--target build', sub: 'stop at a stage to debug', pattern: 'user', icon: 'search' },
        { id: 'n-measure', label: 'Measure size', sub: 'docker image ls, history', pattern: 'user', icon: 'ruler' },
        { id: 'n-parallel', label: 'Independent', sub: 'stages can build in parallel', pattern: 'user', icon: 'workflow' },
      ],
    },
  ],
  edges: [
    { source: 'dockerfile', target: 'build' },
    { source: 'dockerfile', target: 'runtime' },
    { source: 'build', target: 'notes', dashed: true },
    { source: 'runtime', target: 'notes', dashed: true },
  ],
}
