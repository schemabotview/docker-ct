import type { Section } from '../types'

export const readonlyNetwork: Section = {
  id: 'readonly-network',
  title: 'Read-only filesystems, writable mounts and network restrictions',
  scene: 'readonly-network',
  focus: 'n-out',
  slide: `## Where it can write, whom it can reach

Limit what a **compromised** process could change, and where it could connect.

### A read-only root filesystem
- \`read_only: true\` blocks writes to the image's files
- \`/tmp\` becomes a **tmpfs**; uploads get **one volume**
- The application must know its **writable paths**
- Writes elsewhere now **fail loudly**, which is the point

### Separate networks
- \`frontend\`: the API, published to this host only
- \`backend\`: the API and the database, nothing else
- \`internal: true\`: the backend has **no route out**

### What this buys
- A tampered process cannot rewrite its own code
- The database cannot be used to **send data out**
- Each restriction narrows what an attacker can do **next**`,
  narration:
    "The previous sections limited what a container may do with the kernel. This one limits two things an attacker would do next: change files, and reach other systems. First, the filesystem. Setting read only to true mounts the container's root filesystem read-only, so a compromised process cannot modify the application's code or drop tools into system directories. Applications still need somewhere to write, so we give exactly two places: slash tmp as a memory-backed tmpfs, and slash app slash uploads as one named volume. This is the application change from the first section paying off: because the API was told where its writable directory is, the rest can be locked. Second, the network. Instead of one network for everything, there are two. Frontend carries the API, which is published to this host only. Backend carries the API and the database. The database is on backend alone, so nothing else can reach it, and backend is marked internal, which means it has no route to the outside world. A compromised database cannot fetch tools or send stolen data out over that network. None of these restrictions is a wall on its own. Each one narrows what an attacker can do after a first foothold, and together they turn one mistake into a contained incident.",
}
