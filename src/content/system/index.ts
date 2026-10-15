import type { Course } from '../types'
import { packagingProblem } from './01-packaging-problem'
import { containersVsVms } from './02-containers-vs-vms'
import { imagesContainersRegistries } from './03-images-containers-registries'
import { clientDaemonContexts } from './04-client-daemon-contexts'
import { namespacesAndDesktopVm } from './05-namespaces-and-desktop-vm'
import { firstObservations } from './06-first-observations'

// Chapter 1 — Containers and the Docker System (DOCKER-COURSE-PLAN.md).
export const system: Course = {
  id: 'system',
  title: 'Containers and the Docker System',
  sections: [
    packagingProblem,
    containersVsVms,
    imagesContainersRegistries,
    clientDaemonContexts,
    namespacesAndDesktopVm,
    firstObservations,
  ],
}
