import type { Scene } from '@graphlearning/flow'

// §2 — one Dockerfile, two kinds of result. Instructions that change files (FROM, COPY, RUN) produce
// filesystem layers; the rest (ENV, EXPOSE, USER, CMD) only write the image's configuration. The
// image at the bottom is exactly those two things together. The base tag is illustrative.
export const layersMetadata: Scene = {
  id: 'layers-metadata',
  title: 'Layers and configuration',
  flow: 'TB',
  nodes: [
    {
      id: 'dockerfile',
      kind: 'code',
      filename: 'Dockerfile',
      label: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/
ENV PORT=8080
EXPOSE 8080
USER 10001
CMD ["python", "-m", "catalog", "serve"]`,
    },
    {
      id: 'layers',
      label: 'Change files → filesystem layers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-base', label: 'FROM', sub: 'the base image layers', pattern: 'storage', icon: 'layers' },
        { id: 'l-workdir', label: 'WORKDIR', sub: 'creates /app', pattern: 'storage', icon: 'folder' },
        { id: 'l-deps', label: 'RUN pip', sub: 'installed libraries', pattern: 'storage', icon: 'package' },
        { id: 'l-src', label: 'COPY src/', sub: 'application code', pattern: 'storage', icon: 'code' },
      ],
    },
    {
      id: 'config',
      label: 'Describe the image → configuration only',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm-env', label: 'ENV', sub: 'default variables', pattern: 'network', icon: 'key' },
        { id: 'm-expose', label: 'EXPOSE', sub: 'documents 8080, publishes nothing', pattern: 'network', icon: 'plug' },
        { id: 'm-user', label: 'USER', sub: 'who the process runs as', pattern: 'network', icon: 'usercheck' },
        { id: 'm-cmd', label: 'CMD', sub: 'the default command', pattern: 'network', icon: 'power' },
      ],
    },
    {
      id: 'image',
      label: 'Image catalog-api:1.0',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'i-fs', label: 'Layer stack', sub: 'read-only, shared', pattern: 'service', icon: 'layers' },
        { id: 'i-config', label: 'Config JSON', sub: 'read by docker run', pattern: 'service', icon: 'braces' },
        { id: 'i-history', label: 'docker history', sub: 'lists the layers', pattern: 'user', icon: 'history' },
        { id: 'i-inspect', label: 'docker inspect', sub: 'shows the config', pattern: 'user', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'dockerfile', target: 'layers' },
    { source: 'dockerfile', target: 'config' },
    { source: 'layers', target: 'image' },
    { source: 'config', target: 'image' },
  ],
}
