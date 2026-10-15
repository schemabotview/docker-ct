import type { Scene } from '@graphlearning/flow'

// §3 — one `docker run` read clause by clause. Each flag lands in a different place: `-e` in the
// process environment, `-p` on the HOST side of a port mapping, and the arguments after the image
// name replace the image's default command. The publish is bound to 127.0.0.1 on purpose, so the
// demo API is reachable from this machine only — the LAN card is the contrast. One spine, no edge
// from the command straight to the container: it would route through the Host group's cards.
export const commandEnvPorts: Scene = {
  id: 'command-env-ports',
  title: 'Command, environment and a published port',
  flow: 'TB',
  nodes: [
    {
      id: 'cmd',
      kind: 'code',
      filename: 'terminal',
      label: `$ docker run -d --name catalog-demo \\
    -e LOG_LEVEL=debug \\
    -e CATALOG_SOURCE=static \\
    -p 127.0.0.1:8081:8080 \\
    catalog-api:1.0 \\
    serve --port 8080

$ curl http://127.0.0.1:8081/items
[{"id":1,"name":"kettle"}, …]      # illustrative`,
    },
    {
      id: 'host',
      label: 'Host',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'browser', label: 'curl / browser', sub: 'on this machine', pattern: 'user', icon: 'globe' },
        { id: 'host-port', label: 'Host port 8081', sub: 'bound to 127.0.0.1', pattern: 'network', icon: 'plug' },
        { id: 'lan', label: 'Other machines', sub: 'cannot reach 8081', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'container',
      label: 'Container catalog-demo',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'proc', label: 'Main process', sub: 'serve --port 8080', pattern: 'service', icon: 'code' },
        { id: 'env', label: 'Environment', sub: 'LOG_LEVEL, CATALOG_SOURCE', pattern: 'storage', icon: 'key' },
        { id: 'listener', label: 'Listens on 8080', sub: 'all container interfaces', pattern: 'network', icon: 'network' },
      ],
    },
  ],
  edges: [
    { source: 'cmd', target: 'host', label: '-p sets the host side' },
    { source: 'host', target: 'container', label: '8081 → 8080' },
  ],
}
