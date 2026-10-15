import type { Scene } from '@graphlearning/flow'

// §3 — a bind mount maps a HOST path into the container, which is what makes edit-and-reload
// development work, and also what makes it host-dependent. Read-only is shown because the dev
// container has no business writing the source; the warn cards are the two traps (-v silently
// creating a missing path, and a writable mount letting the container change host files).
export const bindMount: Scene = {
  id: 'bind-mount',
  title: 'Bind mounts for development',
  flow: 'TB',
  nodes: [
    {
      id: 'cmd',
      kind: 'code',
      filename: 'terminal — illustrative',
      label: `$ docker run -d --name catalog-dev \\
    -p 127.0.0.1:8081:8080 \\
    --mount type=bind,src="$PWD/src",dst=/app/src,readonly \\
    catalog-api:1.0 serve --reload`,
    },
    {
      id: 'host',
      label: 'Host — your project',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h-editor', label: 'Editor', sub: 'you change a file', pattern: 'user', icon: 'pencil' },
        { id: 'h-src', label: './src', sub: 'the real files', pattern: 'storage', icon: 'folder' },
        { id: 'h-owner', label: 'Owner UID 1000', sub: 'applies inside too', pattern: 'network', icon: 'fingerprint' },
        { id: 'h-git', label: 'Your tools', sub: 'git, tests, editor', pattern: 'user', icon: 'wrench' },
      ],
    },
    {
      id: 'container',
      label: 'Container catalog-dev',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-src', label: '/app/src', sub: 'same files, read-only', pattern: 'storage', icon: 'folder' },
        { id: 'c-reload', label: 'API reloads', sub: 'no rebuild needed', pattern: 'service', icon: 'repeat' },
        { id: 'c-hidden', label: 'Image code', sub: 'hidden under the mount', pattern: 'storage', icon: 'layers' },
        { id: 'c-user', label: 'Runs as 10001', sub: 'reads, cannot write here', pattern: 'service', icon: 'usercheck' },
      ],
    },
    {
      id: 'traits',
      label: 'What to know',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 't-host', label: 'Host-specific', sub: 'paths differ per machine', pattern: 'network', icon: 'globe' },
        { id: 't-desktop', label: 'On Desktop', sub: 'shared into the VM, slower', pattern: 'network', icon: 'monitor' },
        { id: 't-create', label: '-v missing path', sub: 'silently creates a dir', pattern: 'warn', icon: 'folder' },
        { id: 't-write', label: 'Writable mount', sub: 'container edits host files', pattern: 'warn', icon: 'pencil' },
      ],
    },
  ],
  edges: [
    { source: 'cmd', target: 'host' },
    { source: 'host', target: 'container', label: 'bind: same inode, no copy' },
    { source: 'container', target: 'traits', dashed: true },
  ],
}
