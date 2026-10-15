import type { Course } from '../types'
import { buildersOutputs } from './01-builders-outputs'
import { cacheInvalidation } from './02-cache-invalidation'
import { multiStage } from './03-multi-stage'
import { cacheMounts } from './04-cache-mounts'
import { buildSecrets } from './05-build-secrets'
import { multiPlatform } from './06-multi-platform'

// Chapter 7 — Efficient and Portable Builds (DOCKER-COURSE-PLAN.md).
export const builds: Course = {
  id: 'builds',
  title: 'Efficient and Portable Builds',
  sections: [buildersOutputs, cacheInvalidation, multiStage, cacheMounts, buildSecrets, multiPlatform],
}
