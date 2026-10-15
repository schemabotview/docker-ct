import type { Scene } from '@graphlearning/flow'

// §5 — how the container starts, and as whom. Exec form makes the application PID 1, so `docker stop`
// reaches it; a shell-form wrapper makes `sh` PID 1 and the application its child, and SIGTERM stops at
// the shell (Chapter 2's "ignores it" branch). ENTRYPOINT/CMD and USER complete the start-up config.
export const startupUser: Scene = {
  id: 'startup-user',
  title: 'Start-up command and runtime identity',
  flow: 'TB',
  nodes: [
    {
      id: 'forms',
      label: 'Two ways to write the start command',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'exec-form',
          kind: 'code',
          filename: 'exec form',
          label: `# Dockerfile
CMD ["python", "-m", "catalog", "serve"]

# no shell in between

# inside the running container
PID 1  python -m catalog serve`,
        },
        {
          id: 'shell-form',
          kind: 'code',
          filename: 'shell wrapper',
          label: `# Dockerfile
CMD ["./start.sh"]

# start.sh — note: no exec
python -m catalog serve

# inside the running container
PID 1  /bin/sh ./start.sh
PID 7  python -m catalog serve`,
        },
      ],
    },
    {
      id: 'signals',
      label: 'When docker stop sends SIGTERM',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-exec', label: 'App receives it', sub: 'shuts down cleanly', pattern: 'service', icon: 'circlecheck' },
        { id: 's-shell', label: 'Shell receives it', sub: 'app never hears it', pattern: 'warn', icon: 'circleslash' },
        { id: 's-exec-out', label: 'Stops at once', sub: 'exit 0 or 143', pattern: 'service', icon: 'zap' },
        { id: 's-shell-out', label: 'Waits it out', sub: 'SIGKILL, exit 137', pattern: 'warn', icon: 'skull' },
      ],
    },
    {
      id: 'config',
      label: 'The rest of the start-up configuration',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-entry', label: 'ENTRYPOINT', sub: 'the fixed program', pattern: 'network', icon: 'power' },
        { id: 'c-cmd', label: 'CMD', sub: 'defaults; run args replace it', pattern: 'network', icon: 'pencil' },
        { id: 'c-user', label: 'USER 10001', sub: 'not root at run time', pattern: 'user', icon: 'usercheck' },
      ],
    },
  ],
  edges: [
    { source: 'forms', target: 'signals' },
    { source: 'signals', target: 'config', dashed: true },
  ],
}
