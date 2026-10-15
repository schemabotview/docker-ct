import type { Section } from '../types'

export const namespacesAndDesktopVm: Section = {
  id: 'namespaces-and-desktop-vm',
  title: 'Namespaces, resource isolation and the Desktop VM',
  scene: 'isolation-namespaces',
  focus: 'linux-vm',
  slide: `## What isolation is made of

A container is an ordinary Linux process that the kernel treats specially, using two features Docker configures for you.

### Namespaces limit what it can see
- Its own **process list**, network interfaces and hostname
- Its own **root filesystem**, assembled from the image

### cgroups limit what it can use
- **CPU**, **memory** and process counts can be capped
- Limits apply **only when you set them**
- Without limits, a container competes for the whole host

### On macOS and Windows
- Docker Desktop runs a **Linux VM** that supplies the kernel
- Containers run **inside that VM**, not directly on your OS
- Host paths, networking and file speed **differ** from native Linux`,
  narration:
    "So far we have said a container is an isolated process. Here is what the isolation is made of. The Linux kernel provides two features. Namespaces control what a process can see. In its own PID namespace, the container's main process sees itself as process one, and cannot see the host's other processes. In its own network namespace it has its own interfaces and ports. In its own mount namespace it has a root filesystem assembled from the image. There are a few more, for the hostname, shared memory, and optionally user IDs. The second feature, control groups, or cgroups, limits what a process can use: CPU time, memory, and the number of processes it may start. Docker sets up both for you, but resource limits are only applied if you ask for them, which is a later chapter. Now the platform question. All of this is Linux kernel machinery. On macOS and Windows there is no Linux kernel, so Docker Desktop runs a small Linux virtual machine, and the daemon and every container run inside it. That is why file paths, networking from the host, and file sharing performance on Desktop do not behave exactly like native Linux. When an example depends on that, this course will say so.",
}
