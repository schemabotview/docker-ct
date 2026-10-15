import type { Section } from '../types'

export const firstObservations: Section = {
  id: 'first-observations',
  title: 'Version inventory, help and first observations',
  scene: 'first-observations',
  focus: 'ans-versions',
  slide: `## First observations

Start by **observing**: three read-only commands map the system before you change anything.

### What to run
- \`docker context show\` — which daemon you are addressing
- \`docker version\` — client and server versions, **separately**
- \`docker info\` — what exists, the storage root, the platform

### Telling failures apart
- **Daemon not running** — the Server section is missing
- **Wrong context** — a different host answers, or none does
- \`docker <command> --help\` describes any command's options

### Keep a version record
- Note Engine, Desktop, Compose and Buildx versions
- Output in this course is **illustrative** unless stated`,
  narration:
    "Before changing anything, observe. Three read-only commands draw the map we have been building. docker context show prints which daemon your commands are addressed to. docker version reports two things that are easy to conflate: the client version, which is the command-line tool, and the server version, which is the engine that will do the work, along with its operating system and architecture. docker info describes the daemon's world: how many containers and images it holds, where it keeps its data, and what platform it runs on. On Docker Desktop, that platform is the Linux virtual machine, not your laptop. The output on the left is illustrative and trimmed; your versions will differ, and that is the point of recording them. These commands also separate two failures that share one error message. If the daemon is not running, docker version prints its client section and then fails to reach the server. If the context points at the wrong host, you may get an answer from a daemon you did not intend, or no answer at all. Check the context first, then the daemon. And whenever you meet an unfamiliar option, docker, the command name, then dash dash help, is the first reference. Next, we put this map to work by running a container.",
}
