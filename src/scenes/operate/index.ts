import type { Scene } from '@graphlearning/flow'
import { configReview } from './config-review'
import { versionRecord } from './version-record'
import { runbook } from './runbook'
import { hostLoss } from './host-loss'
import { boundary } from './boundary'

// Chapter 11 — Operating the Whole Application and Knowing the Boundary.
export const operateScenes: Scene[] = [configReview, versionRecord, runbook, hostLoss, boundary]
