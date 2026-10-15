import type { Section } from '../types'

export const resourceLimits: Section = {
  id: 'resource-limits',
  title: 'CPU, memory and process limits and their application effects',
  scene: 'limits',
  focus: 'table',
  slide: `## CPU, memory and process limits

Limits protect the host and its neighbours. Each one **fails differently**.

### Memory: enforced by killing
- Above the limit, the kernel **kills** a process
- The container exits **137**, and \`OOMKilled\` is **true**
- A process **inside** may be killed instead: watch the logs

### CPU: enforced by slowing
- \`cpus: 1.0\` means one core's worth of time
- Above it, the process is **throttled**, never killed

### Processes: enforced by refusing
- \`pids_limit\` caps processes **and threads**
- The application sees errors creating work

### Setting them well
- **Measure** normal and peak use; add headroom
- Make the app **fit**: connection pools, caches, workers
- Revisit limits after **every** significant release`,
  narration:
    "Chapter one mentioned that cgroups can limit what a container uses. Now we set those limits, because without them one misbehaving container can starve every other service on the host. The important thing to understand is that each limit fails in its own way. A memory limit is enforced by killing. When the processes in the container try to use more memory than the limit allows, the kernel's out-of-memory killer ends one of them. If that is the main process, the container exits with code one three seven, and docker inspect reports OOM killed as true. A CPU limit is enforced by slowing. Cpus one point zero allows one core's worth of processor time. Ask for more and the process is throttled: it keeps running, but more slowly, which shows up as latency rather than as a crash. A process limit is enforced by refusing. Pids limit caps the number of processes and threads, and an application that tries to start one more gets an error. Setting limits well starts with measurement. Find normal and peak usage, then leave headroom above the peak. And make the application fit inside them: a connection pool, a cache or a worker count sized for a large machine will hit a small limit quickly.",
}
