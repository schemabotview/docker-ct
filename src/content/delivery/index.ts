import type { Course } from '../types'
import { registryAddresses } from './01-registry-addresses'
import { pushPullDigests } from './02-push-pull-digests'
import { publishWorkflow } from './03-publish-workflow'
import { environmentConfig } from './04-environment-config'
import { promotionSection } from './05-promotion'
import { rollbackSection } from './06-rollback'

// Chapter 9 — Registries and Repeatable Delivery (DOCKER-COURSE-PLAN.md).
export const delivery: Course = {
  id: 'delivery',
  title: 'Registries and Repeatable Delivery',
  sections: [registryAddresses, pushPullDigests, publishWorkflow, environmentConfig, promotionSection, rollbackSection],
}
