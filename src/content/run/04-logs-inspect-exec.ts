import type { Section } from '../types'

export const logsInspectExec: Section = {
  id: 'logs-inspect-exec',
  title: 'Logs, metadata, and exec versus the main process',
  scene: 'logs-inspect-exec',
  focus: 'exec-proc',
  slide: `## Looking inside a running container

Observe before you change anything. Three commands, three different sources.

### Ask the daemon
- \`docker logs\` — what PID 1 wrote to **stdout and stderr**
- \`docker inspect\` — recorded **state and configuration**
- \`docker ps\` — a summary: status, ports, names

### Start a process inside
- \`docker exec\` runs a **new process** in the container
- The main process stays **PID 1**, untouched
- When PID 1 exits, the container stops, exec'd processes too

### Watch for
- \`docker logs -f\` follows new output as it arrives
- Logs written to a file inside the container do not reach \`docker logs\``,
  narration:
    "Once a container is running, the next skill is looking at it without disturbing it. Three commands, and each reads from a different source. docker logs shows what the main process wrote to standard output and standard error. The daemon captured that stream, so you can read it even after the container has exited. docker inspect returns the daemon's record of the container: its state, the process ID on the host, its configuration, network addresses and mounts. The format option picks out the fields you care about. The third command works differently. docker exec does not read anything from the daemon. It starts a brand new process inside the running container's namespaces. Look at the process list in the card. The catalogue API is still process one; the shell we started is process twenty seven, sitting beside it. That matters, because exec never replaces the main process. If the API exits, the container stops, and the shell goes with it. Exec is for looking around, not for keeping a container alive. One more thing to watch for. docker logs only sees standard output and standard error. An application that writes its logs to a file inside the container hides them from this command.",
}
