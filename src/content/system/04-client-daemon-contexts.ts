import type { Section } from '../types'

export const clientDaemonContexts: Section = {
  id: 'client-daemon-contexts',
  title: 'Client, daemon, API and contexts',
  scene: 'docker-architecture',
  focus: 'context',
  slide: `## Where does a command act?

The \`docker\` command is **only a client**. It sends API requests to a daemon, and the daemon does the work.

### The parts
- **CLI** — turns your command into an API request
- **Daemon** (\`dockerd\`) — builds, pulls, runs; owns the objects
- **Context** — which daemon the CLI talks to, and how
- \`docker context use\` changes it; \`--context\` overrides it once

### Why it matters
- Each daemon has **its own** images, containers and volumes
- \`docker ps\` on another context lists **another host's** containers
- A remove or a cleanup acts on whichever host the context names

### A habit worth forming
- Check the context **before** anything that changes state`,
  narration:
    "When you type a docker command, where does it actually run? Not in your terminal. The docker command is only a client. It turns what you typed into a request to the Docker API, and sends it to a daemon, called dockerd, which does the real work: it pulls images, builds them, and starts and stops containers. The daemon owns those objects. Which daemon receives the request is decided by the current context. The default context usually points at a daemon on this machine, through a local socket. Another context might point at a build server over SSH. Here is why that matters. Each daemon has its own images, its own containers and its own volumes. Run docker ps against the build box and you see its containers, not yours, and nothing in the output says it came from somewhere else. That is harmless for listing. It is not harmless for removing a container or reclaiming disk space, because the operation lands on whichever host the context names. So form one habit early: before anything that changes state, check which context you are in. The registry, at the bottom, is a third party again. The daemon talks to it, not your terminal.",
}
