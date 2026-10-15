import type { Course } from '../types'
import { daemonAuthority } from './01-daemon-authority'
import { nonrootRootless } from './02-nonroot-rootless'
import { capabilities } from './03-capabilities'
import { readonlyNetwork } from './04-readonly-network'
import { vulnerabilityDecisions } from './05-vulnerability-decisions'
import { sbomProvenanceRotation } from './06-sbom-provenance-rotation'

// Chapter 8 — Container and Supply-Chain Security (DOCKER-COURSE-PLAN.md).
export const security: Course = {
  id: 'security',
  title: 'Container and Supply-Chain Security',
  sections: [daemonAuthority, nonrootRootless, capabilities, readonlyNetwork, vulnerabilityDecisions, sbomProvenanceRotation],
}
