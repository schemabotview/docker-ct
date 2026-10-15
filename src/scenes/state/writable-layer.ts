import type { Scene } from '@graphlearning/flow'

// §1 — where a container's writes go when nothing is mounted: its own writable layer, which lives
// exactly as long as the container. The terminal is the failure case (records inserted, container
// removed, a fresh container from the same image has nothing); the bottom row separates the three
// operations people conflate. Image and credentials are illustrative placeholders.
export const writableLayer: Scene = {
  id: 'writable-layer',
  title: 'The writable container layer',
  flow: 'TB',
  nodes: [
    {
      id: 'demo',
      kind: 'code',
      filename: 'terminal — illustrative',
      label: `$ docker run -d --name scratch-db \\
    -e POSTGRES_PASSWORD=example postgres:16
# … create the items table, insert 3 rows …

$ docker rm -f scratch-db        # removes its writable layer
$ docker run -d --name scratch-db \\
    -e POSTGRES_PASSWORD=example postgres:16
# … SELECT * FROM items;
ERROR:  relation "items" does not exist`,
    },
    {
      id: 'container',
      label: 'Container scratch-db',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-layer', label: 'Writable layer', sub: 'every file the DB wrote', pattern: 'warn', icon: 'pencil' },
        { id: 'w-life', label: 'Its lifetime', sub: 'same as the container', pattern: 'warn', icon: 'clock' },
        { id: 'i-layers', label: 'Image layers', sub: 'read-only, shared', pattern: 'storage', icon: 'layers' },
        { id: 'i-cow', label: 'Copy on write', sub: 'changed files copied up', pattern: 'storage', icon: 'copy' },
      ],
    },
    {
      id: 'operations',
      label: 'Three operations, three outcomes',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'op-restart', label: 'stop, start', sub: 'same container: data kept', pattern: 'service', icon: 'repeat' },
        { id: 'op-rm', label: 'docker rm', sub: 'writable layer deleted', pattern: 'warn', icon: 'trash' },
        { id: 'op-new', label: 'run again', sub: 'new container, empty', pattern: 'storage', icon: 'box' },
      ],
    },
  ],
  edges: [
    { source: 'demo', target: 'container' },
    { source: 'container', target: 'operations' },
  ],
}
