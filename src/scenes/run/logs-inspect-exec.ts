import type { Scene } from '@graphlearning/flow'

// §4 — three ways to look at a running container and what each one reads. `logs` and `inspect` ask
// the DAEMON (captured output, recorded metadata); `exec` starts a NEW process inside the
// container's namespaces. The `ps` listing in the card is the evidence: the API is still PID 1 and
// the shell sits beside it — exec never replaces the main process. Output is illustrative.
export const logsInspectExec: Scene = {
  id: 'logs-inspect-exec',
  title: 'Logs, inspect and exec',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker logs --tail 2 catalog-demo
INFO listening on 0.0.0.0:8080
INFO GET /items 200 3ms

$ docker inspect --format '{{.State.Status}} {{.State.Pid}}' catalog-demo
running 4123

$ docker exec -it catalog-demo sh
/app $ ps
PID   USER  COMMAND
  1   app   catalog-api serve --port 8080
 27   app   sh
 33   app   ps`,
    },
    {
      id: 'daemon',
      label: 'Asked of the daemon',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'log-store', label: 'Captured output', sub: 'stdout and stderr of PID 1', pattern: 'storage', icon: 'scroll' },
        { id: 'metadata', label: 'Metadata', sub: 'state, config, IP, mounts', pattern: 'storage', icon: 'search' },
      ],
    },
    {
      id: 'inside',
      label: 'Inside the container',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'pid1', label: 'PID 1', sub: 'the main process', pattern: 'service', icon: 'zap' },
        { id: 'exec-proc', label: 'exec process', sub: 'added beside it', pattern: 'user', icon: 'terminal' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'daemon', label: 'logs · inspect' },
    { source: 'evidence', target: 'inside', label: 'exec' },
  ],
}
