import type { Scene } from '@graphlearning/flow'
import { referenceAnatomy } from './reference-anatomy'
import { digests } from './digests'
import { publishPipeline } from './publish-pipeline'
import { envConfig } from './env-config'
import { promotion } from './promotion'
import { rollback } from './rollback'

// Chapter 9 — Registries and Repeatable Delivery.
export const deliveryScenes: Scene[] = [referenceAnatomy, digests, publishPipeline, envConfig, promotion, rollback]
