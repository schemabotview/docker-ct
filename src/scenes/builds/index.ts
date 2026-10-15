import type { Scene } from '@graphlearning/flow'
import { buildersOutputs } from './builders-outputs'
import { cacheTrace } from './cache-trace'
import { multiStage } from './multi-stage'
import { cacheMounts } from './cache-mounts'
import { buildSecrets } from './build-secrets'
import { multiPlatform } from './multi-platform'

// Chapter 7 — Efficient and Portable Builds.
export const buildsScenes: Scene[] = [buildersOutputs, cacheTrace, multiStage, cacheMounts, buildSecrets, multiPlatform]
