import type { Scene } from '@graphlearning/flow'

// §5 — the two mount failures that look like application bugs. Left: a mount placed over a directory
// the image already filled hides those files (an empty named volume is pre-filled from the image on
// first use; a bind mount never is). Right: the container's numeric UID does not own the host
// directory, so writes are denied. The terminal is the evidence for the second; output illustrative.
export const mountPitfalls: Scene = {
  id: 'mount-pitfalls',
  title: 'Hidden files and denied writes',
  flow: 'TB',
  nodes: [
    {
      id: 'hidden',
      label: 'Mounted over /app/src',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'h-cause', label: 'Cause', sub: 'empty host dir bound over image code', pattern: 'network', icon: 'folder' },
        { id: 'h-symptom', label: 'Symptom', sub: 'module not found at start', pattern: 'warn', icon: 'bug' },
        { id: 'h-note', label: 'Named volume', sub: 'empty one is pre-filled from image', pattern: 'storage', icon: 'harddrive' },
        { id: 'h-fix', label: 'Fix', sub: 'mount the right path, or none', pattern: 'service', icon: 'wrench' },
      ],
    },
    {
      id: 'denied',
      label: 'Writing to ./uploads',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'd-cause', label: 'Cause', sub: 'UID 10001 vs owner 1000', pattern: 'network', icon: 'fingerprint' },
        { id: 'd-symptom', label: 'Symptom', sub: 'Permission denied on write', pattern: 'warn', icon: 'ban' },
        { id: 'd-names', label: 'Names differ', sub: 'only numbers are compared', pattern: 'storage', icon: 'hash' },
        { id: 'd-fix', label: 'Fix', sub: 'chown to 10001, or a volume', pattern: 'service', icon: 'wrench' },
      ],
    },
    {
      id: 'evidence',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker exec catalog-dev id
uid=10001 gid=10001

$ ls -lnd ./uploads
drwxr-xr-x  2 1000 1000  4096  uploads

$ docker logs catalog-dev | tail -1
PermissionError: [Errno 13] Permission denied: '/app/uploads/1.png'`,
    },
  ],
  edges: [{ source: 'denied', target: 'evidence', label: 'check numbers, not names' }],
}
