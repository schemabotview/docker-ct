import type { Scene } from '@graphlearning/flow'

// §6 — diagnosis as a sequence of questions, each answered by evidence rather than guesswork. The
// table maps the plan's four failures to the first check that exposes them; the terminal shows the
// loopback-only case through a throwaway busybox container sharing the API's network namespace
// (so no tools need to be in the API image). Output is illustrative.
export const diagnosis: Scene = {
  id: 'diagnosis',
  title: 'Diagnosing a connection',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'Ask in order',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 's-member', label: '1 Member?', sub: 'network inspect', pattern: 'user', icon: 'users' },
        { id: 's-name', label: '2 Resolves?', sub: 'getent hosts', pattern: 'user', icon: 'search' },
        { id: 's-listen', label: '3 Listening?', sub: 'which address, port', pattern: 'user', icon: 'zap' },
        { id: 's-connect', label: '4 Connects?', sub: 'from the caller', pattern: 'user', icon: 'link' },
        { id: 'c-member', label: 'Catches', sub: 'missing membership', pattern: 'storage', icon: 'search' },
        { id: 'c-name', label: 'Catches', sub: 'typos, wrong network', pattern: 'storage', icon: 'search' },
        { id: 'c-listen', label: 'Catches', sub: 'loopback-only binds', pattern: 'storage', icon: 'search' },
        { id: 'c-connect', label: 'Catches', sub: 'wrong port, firewalls', pattern: 'storage', icon: 'search' },
      ],
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Four failures, first evidence',
      headers: ['Failure', 'First evidence', 'Fix'],
      values: [
        ['API bound to 127.0.0.1', 'netstat: 127.0.0.1:8080', 'listen on 0.0.0.0'],
        ['Wrong destination port', 'connection refused', 'use the listening port'],
        ['Not on catalog-net', 'name does not resolve', 'network connect'],
        ['localhost for the DB', 'refused, in its own ns', 'use catalog-db'],
      ],
    },
    {
      id: 'evidence',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker run --rm --network container:catalog-api \\
    busybox netstat -tln
Proto  Local Address      State
tcp    127.0.0.1:8080     LISTEN    # loopback only

$ curl http://127.0.0.1:8081/items
curl: (56) Recv failure: Connection reset by peer

$ docker exec catalog-worker getent hosts catalog-db
$ echo $?
2                                   # no answer: not a member`,
    },
  ],
  edges: [
    { source: 'steps', target: 'table' },
    { source: 'table', target: 'evidence', label: 'row 1, in detail' },
  ],
}
