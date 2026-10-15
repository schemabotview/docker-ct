import type { Course } from '../types'
import { productionReview } from './01-production-review'
import { versionRecord } from './02-version-record'
import { runbookSection } from './03-runbook'
import { hostLoss } from './04-host-loss'
import { orchestrationBoundary } from './05-orchestration-boundary'

// Chapter 11 — Operating the Whole Application and Knowing the Boundary (DOCKER-COURSE-PLAN.md).
export const operate: Course = {
  id: 'operate',
  title: 'Operating the Whole Application',
  sections: [productionReview, versionRecord, runbookSection, hostLoss, orchestrationBoundary],
}
