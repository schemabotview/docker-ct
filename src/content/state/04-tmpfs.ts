import type { Section } from '../types'

export const tmpfs: Section = {
  id: 'tmpfs',
  title: 'Temporary storage and non-persistent data',
  scene: 'storage-compare',
  focus: 'uses',
  slide: `## Temporary storage

Some data should **not** outlive the process. A **tmpfs** mount keeps it in memory.

### What tmpfs is
- A filesystem in **host memory**, never written to disk
- Mounted at a path: \`--tmpfs /app/cache\`
- Removed when the container **stops**, not just when removed

### Good uses
- Caches and scratch files the app can rebuild
- Files that should **never touch disk**

### Costs and limits
- It uses **memory**, and counts against memory limits
- Not shared between containers
- Linux only; on Desktop it is the **VM's** memory

### Comparing all four
- Match the storage to **how long the data must live**`,
  narration:
    "Not everything a container writes deserves to be kept. Caches, scratch files and intermediate results can be rebuilt, and some data should never touch a disk at all. For that there is tmpfs, a filesystem that lives in memory. You mount it at a path, here slash app slash cache, and anything written there stays in the host's memory. It is never written to disk, and it disappears when the container stops, not only when it is removed. That makes it the shortest-lived of the four places a container can write, and the table puts them side by side. The writable layer survives a stop but not removal. Named volumes and bind mounts survive both. tmpfs survives neither. tmpfs has costs. It uses memory, so a cache that grows will compete with the application, and it counts against any memory limit you set. It cannot be shared between containers. And it is a Linux feature: on Docker Desktop the memory belongs to the Linux virtual machine. The decision across this whole chapter comes down to one question about each piece of data: how long must it live? Answer that first, and the choice of storage follows.",
}
