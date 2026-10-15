import type { Section } from '../types'

export const orchestrationBoundary: Section = {
  id: 'orchestration-boundary',
  title: 'Orchestration responsibilities and orientation to Kubernetes and Swarm',
  scene: 'boundary',
  focus: 'note',
  slide: `## Where single-host Compose ends

Compose on one host covers a lot. Some responsibilities need a **scheduler** that works across several machines.

### A cluster scheduler adds
- Replacing **unhealthy** containers, not only crashed ones
- **Rescheduling** when a host fails
- **Replicas** to spread load, and rolling releases

### What it does not change
- **Database backup and restore** are still your job
- **Replicas are not backups**: a bad write is copied too
- Everything in this course still applies **inside** it
- A cluster adds its **own** operating work

### Where to go next
- **Linux operations**, for the host underneath
- **CI/CD**, for pipelines in depth
- **Cloud services**, or **Kubernetes** and **Swarm**
- Check **current docs** before extending the design`,
  narration:
    "Compose on a single host covers a great deal: building, configuring, securing, releasing and recovering a real application. It also has a boundary, and knowing where it lies is part of operating well. The table compares responsibilities. On one host, a restart policy restarts a crashed container, but replacing a running, unhealthy one is your job. Losing the host means rebuilding, as the previous section showed. Spreading load over several machines, and rolling releases without downtime, are limited or manual. A cluster scheduler, such as Kubernetes or Swarm, takes these on: it replaces unhealthy containers, reschedules them onto another machine when a host fails, and runs replicas behind a rolling release. Look at the last row, though. Database backup and restore remain your responsibility, with or without a cluster. Replication keeps copies in step, which means a bad write or a dropped table is copied faithfully to every replica. Replicas are not backups. And everything in this course still applies inside a cluster: images by digest, least authority, secrets at run time, evidence before action. Where next? Linux operations for the host underneath, CI and CD for pipelines in depth, cloud container services, or a Kubernetes or Swarm course. Whichever you choose, check the current documentation, and keep the recovery evidence.",
}
