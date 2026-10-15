import type { Course } from '../types'
import { resourceLimits } from './01-resource-limits'
import { statsCapacity } from './02-stats-capacity'
import { logsDisk } from './03-logs-disk'
import { layeredDiagnosis } from './04-layered-diagnosis'
import { restartHealth } from './05-restart-health'
import { cleanupRecovery } from './06-cleanup-recovery'

// Chapter 10 — Resources, Diagnosis, and Recovery (DOCKER-COURSE-PLAN.md).
export const diagnose: Course = {
  id: 'diagnose',
  title: 'Resources, Diagnosis and Recovery',
  sections: [resourceLimits, statsCapacity, logsDisk, layeredDiagnosis, restartHealth, cleanupRecovery],
}
