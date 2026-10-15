import type { Course } from '../types'
import { projectModel } from './01-project-model'
import { interpolationEnvironment } from './02-interpolation-environment'
import { buildValidate } from './03-build-validate'
import { projectLifecycle } from './04-project-lifecycle'
import { healthReadiness } from './05-health-readiness'
import { overrides } from './06-overrides'
import { secrets } from './07-secrets'

// Chapter 6 — Multi-Service Applications with Compose (DOCKER-COURSE-PLAN.md).
export const compose: Course = {
  id: 'compose',
  title: 'Multi-Service Applications with Compose',
  sections: [projectModel, interpolationEnvironment, buildValidate, projectLifecycle, healthReadiness, overrides, secrets],
}
