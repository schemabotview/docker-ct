import type { Scene } from '@graphlearning/flow'
import { packagingLimits } from './packaging-limits'
import { vmVsContainer } from './vm-vs-container'
import { lifecycleObjects } from './lifecycle-objects'
import { dockerArchitecture } from './docker-architecture'
import { isolationNamespaces } from './isolation-namespaces'
import { firstObservations } from './first-observations'

// Chapter 1 — Containers and the Docker System. One bundle per course folder, spread into
// src/scenes/index.ts.
export const systemScenes: Scene[] = [
  packagingLimits,
  vmVsContainer,
  lifecycleObjects,
  dockerArchitecture,
  isolationNamespaces,
  firstObservations,
]
