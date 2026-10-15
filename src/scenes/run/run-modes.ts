import type { Scene } from '@graphlearning/flow'

// §2 — four ways to attach to a container's main process. The code card lists the four commands;
// the 2×2 grid says what each one connects and when to reach for it. `-i` and `-t` are separate
// flags that are usually combined, which is why they get separate cards.
export const runModes: Scene = {
  id: 'run-modes',
  title: 'Foreground, detached, interactive, terminal',
  flow: 'TB',
  nodes: [
    {
      id: 'commands',
      kind: 'code',
      filename: 'terminal',
      label: `# foreground: output here, Ctrl-C stops it
$ docker run --rm catalog-api:1.0 check-config

# detached: prints an ID, keeps running
$ docker run -d --name catalog-demo catalog-api:1.0

# stdin open: pipe a file in
$ docker run --rm -i catalog-api:1.0 import < items.csv

# stdin + terminal: an interactive shell
$ docker run --rm -it catalog-api:1.0 sh`,
    },
    {
      id: 'modes',
      label: 'What each mode connects',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'mode-fg',
          label: 'Foreground (default)',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'fg-attached', label: 'Output', sub: 'streams to your terminal', pattern: 'service', icon: 'terminal' },
            { id: 'fg-ctrlc', label: 'Ctrl-C', sub: 'signals the process', pattern: 'warn', icon: 'power' },
            { id: 'fg-use', label: 'Use for', sub: 'one-off tasks', pattern: 'user', icon: 'clock' },
            { id: 'fg-watch', label: 'Watch for', sub: 'your prompt is blocked', pattern: 'warn', icon: 'ban' },
          ],
        },
        {
          id: 'mode-detached',
          label: 'Detached  -d',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'd-id', label: 'Returns', sub: 'the container ID', pattern: 'service', icon: 'hash' },
            { id: 'd-logs', label: 'Output', sub: 'read it with docker logs', pattern: 'storage', icon: 'scroll' },
            { id: 'd-use', label: 'Use for', sub: 'long-running services', pattern: 'user', icon: 'server' },
            { id: 'd-watch', label: 'Watch for', sub: 'failures stay quiet until you look', pattern: 'warn', icon: 'search' },
          ],
        },
        {
          id: 'mode-i',
          label: 'Interactive  -i',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'i-stdin', label: 'Stdin', sub: 'kept open', pattern: 'service', icon: 'link' },
            { id: 'i-pipe', label: 'Use for', sub: 'piping a file in', pattern: 'user', icon: 'file' },
            { id: 'i-alone', label: 'Alone', sub: 'no prompt, no line editing', pattern: 'storage', icon: 'scroll' },
            { id: 'i-watch', label: 'Without it', sub: 'stdin is closed', pattern: 'warn', icon: 'circleslash' },
          ],
        },
        {
          id: 'mode-t',
          label: 'Terminal  -t',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 't-tty', label: 'TTY', sub: 'a pseudo-terminal', pattern: 'service', icon: 'monitor' },
            { id: 't-shell', label: 'Use for', sub: 'shells, with -i', pattern: 'user', icon: 'terminal' },
            { id: 't-merge', label: 'Output', sub: 'stdout and stderr merged', pattern: 'storage', icon: 'merge' },
            { id: 't-watch', label: 'Watch for', sub: 'avoid when piping output', pattern: 'warn', icon: 'ban' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'commands', target: 'modes' }],
}
