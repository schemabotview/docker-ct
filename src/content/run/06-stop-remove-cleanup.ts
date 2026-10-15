import type { Section } from '../types'

export const stopRemoveCleanup: Section = {
  id: 'stop-remove-cleanup',
  title: 'Stop, remove, recreate and clean up what you own',
  scene: 'remove-ownership',
  focus: 'prune',
  slide: `## Cleaning up what you own

Removing a container deletes its **writable layer and logs**. Decide what you own, then preview.

### Preview, then remove
- Name containers so you can **find them**: \`catalog-*\`
- \`docker ps -a --filter name=catalog-\` lists exactly those
- \`docker rm\` the names you saw, nothing more
- List again afterwards to confirm what changed

### Why not a broad prune?
- \`docker container prune\` removes **every** stopped container
- On a shared daemon, that includes **other projects'** containers

### Changing a container
- Configuration is fixed at creation: **stop, remove, run again**
- \`--rm\` removes a short-lived container on exit`,
  narration:
    "Containers accumulate. Every docker run creates a new one, and exited containers stay until you remove them. Removing one deletes its writable layer and its logs, so the first question is always: which of these are mine? Naming helps. Every container in this chapter is named catalog dash something, so docker ps dash a with a name filter lists exactly the ones we created, running or stopped. Read that list, then remove those names and nothing else. Notice what the list does not show. This daemon also holds a stopped database from another project. docker container prune would remove it along with ours, because prune does not know or care who created what. It removes every stopped container on the daemon. On your own laptop that may be acceptable; on a shared host it is how someone else's data disappears. Removal also explains how you change a container. Its configuration, the ports, the environment and the command, is fixed when it is created. To change it, you stop it, remove it, and run it again with the new options. Anything written inside the old container's filesystem is gone. For short-lived containers, dash dash rm removes them automatically on exit. Keeping data across that replacement is what the storage chapter is about.",
}
