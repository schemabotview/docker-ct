import type { Section } from '../types'

export const cleanupRecovery: Section = {
  id: 'cleanup-recovery',
  title: 'Evidence-led cleanup, backup verification and recovery decisions',
  scene: 'recovery',
  focus: 'p-behaviour',
  slide: `## Cleanup and recovery, by evidence

Under pressure, the costly mistakes are deleting the **wrong thing** and assuming a backup **works**.

### Freeing space
- **Inventory** first, with \`docker system df -v\`
- Reclaim **build cache**, then **your** old images, by name
- Keep failed containers until their logs are **read**
- Never free space by deleting a volume with **no backup**

### Proving recovery
- Restore into an **isolated** stack: its own volume and network
- Check **records**: counts and known samples
- Check **behaviour**: the API answers real requests
- Note how **long** it took, and the **data gap** since the dump

### Then decide
- Restart, roll back, or restore: let the evidence choose`,
  narration:
    "Recovery decisions are made under pressure, and the two costly mistakes are deleting the wrong thing and assuming a backup works. Evidence protects against both. If the problem is space, take an inventory first, with docker system df dash v, so you know what is using the disk and whose it is. Reclaim in order of how cheaply each thing comes back: the build cache first, which costs only rebuild time, then your own old images, by name rather than with a broad prune. Keep failed containers until someone has read their logs, because they are the evidence. And never free space by deleting a volume that has no verified backup. If the problem is data, prove the recovery before relying on it. Restore the latest dump into an isolated stack, with its own volume and its own network, so nothing can touch production by accident. Then check two different things. Records: row counts and a few known samples. And behaviour: point the API at the restored database and make real requests, because data that loads but breaks the application is not a recovery. Write down how long it took, and how much data was written after the dump and is therefore missing. With that evidence, the decision between restarting, rolling back and restoring becomes a choice, not a guess.",
}
