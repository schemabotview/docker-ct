import type { Scene } from '@graphlearning/flow'

// §3 — choosing what to build FROM. Three variants of one official image, then the questions that
// decide between them (compatibility and trust, not size alone), then how dependencies go on top.
// Tags are illustrative; the plan records no versions.
export const baseImages: Scene = {
  id: 'base-images',
  title: 'Choosing a base image',
  flow: 'TB',
  nodes: [
    {
      id: 'candidates',
      label: 'Variants of one official image',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-full', label: 'Full', sub: 'python:3.12 — compilers, large', pattern: 'storage', icon: 'box' },
        { id: 'b-slim', label: 'Slim', sub: 'python:3.12-slim — glibc, small', pattern: 'service', icon: 'box' },
        { id: 'b-alpine', label: 'Alpine', sub: 'musl libc — wheels may not fit', pattern: 'warn', icon: 'box' },
      ],
    },
    {
      id: 'questions',
      label: 'Questions before choosing',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'q-libc', label: 'Compatible?', sub: 'libc and native wheels', pattern: 'user', icon: 'link' },
        { id: 'q-arch', label: 'Platforms?', sub: 'amd64 and arm64 built', pattern: 'user', icon: 'cpu' },
        { id: 'q-trust', label: 'Who publishes?', sub: 'official or verified', pattern: 'user', icon: 'shieldcheck' },
        { id: 'q-maint', label: 'Maintained?', sub: 'rebuilt for security fixes', pattern: 'user', icon: 'wrench' },
      ],
    },
    {
      id: 'install',
      label: 'Then install dependencies on top',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'd-pin', label: 'Pin versions', sub: 'a locked requirements file', pattern: 'service', icon: 'lock' },
        { id: 'd-nocache', label: 'No caches', sub: 'pip --no-cache-dir', pattern: 'service', icon: 'trash' },
        { id: 'd-onerun', label: 'One RUN', sub: 'apt update with install', pattern: 'service', icon: 'merge' },
      ],
    },
  ],
  edges: [
    { source: 'candidates', target: 'questions', label: 'decide by' },
    { source: 'questions', target: 'install', label: 'FROM the chosen base' },
  ],
}
