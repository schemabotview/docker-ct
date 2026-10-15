import type { Section } from '../types'

export const nonrootRootless: Section = {
  id: 'nonroot-rootless',
  title: 'Non-root application identities versus a rootless daemon',
  scene: 'nonroot-rootless',
  focus: 'table',
  slide: `## Non-root process, rootless daemon

Two controls with similar names work at **different layers**.

### A non-root USER
- The **process** runs as UID 10001 inside the container
- Set in the image, or overridden with \`--user\`
- The **daemon** still runs as root
- A breakout lands as that UID, not as **root**

### Rootless mode
- The **daemon** and its containers run as **your user**
- Container root maps to an **unprivileged** UID range
- Trade-offs: low ports and some drivers need extra setup

### Neither settles trust alone
- Non-root limits a compromised **process**
- Rootless limits a compromised **daemon or escape**
- Use both where you can, and still grant **least authority**`,
  narration:
    "Two security controls sound alike and are often confused, so it helps to place them precisely. A non-root user, set with USER in the image as we did in chapter three, controls the process inside the container. The catalogue API runs as user ten thousand and one instead of root. If an attacker takes over that process, they have that user's limited rights inside the container. But the daemon that started it still runs as root on the host. Rootless mode changes the daemon itself. The daemon, and every container it starts, runs as an ordinary unprivileged user on the host, using user namespaces. Root inside a container is mapped to an unprivileged range of user IDs outside it. That has costs: binding ports below one thousand and twenty four needs extra configuration, and some network and storage features behave differently, so check the documentation for your platform. The table shows why neither control is enough alone. With a rootful daemon and a root process, a container escape lands as host root. A non-root user improves that. Rootless mode improves it differently, and the two together leave an escape with almost nothing. And still, neither removes the need to grant only the authority a service needs.",
}
