import type { Section } from '../types'

export const containersVsVms: Section = {
  id: 'containers-vs-vms',
  title: 'Containers versus virtual machines',
  scene: 'vm-vs-container',
  focus: 'shared-kernel',
  slide: `## Containers versus virtual machines

Both isolate workloads. They draw the boundary in **different places**.

### A virtual machine
- A hypervisor presents **virtual hardware**
- Each VM boots its **own guest kernel** and operating system
- Strong isolation, at the cost of memory and start-up time

### A container
- An **ordinary process** on the host, given a restricted view
- Every container shares **one host kernel**
- Starts as fast as its process; overhead is small

### What follows from the shared kernel
- A Linux container needs a **Linux kernel** underneath
- A kernel flaw can affect **every container** on the host
- A container is a packaging and isolation tool, not a VM replacement`,
  narration:
    "Containers are often described as lightweight virtual machines. That phrase hides the one difference that matters, so let's put the two side by side. On the left, a hypervisor presents virtual hardware, and each virtual machine boots its own guest kernel and operating system on top of it. The isolation is strong, but every workload pays for a whole operating system in memory and start-up time. On the right, there is no guest kernel at all. Each container is an ordinary process running on the host, and the kernel gives it a restricted view of the system: its own process list, its own filesystem, its own network stack. Every container shares the same host kernel. That is why a container can start in about the time its process takes to start. It also explains three things worth remembering. A Linux container needs a Linux kernel beneath it, which matters on a Mac or Windows laptop. A flaw in that shared kernel can affect every container on the host, so a container boundary is not as strong as a VM boundary. And containers and virtual machines are often used together: plenty of containers run inside cloud virtual machines.",
}
