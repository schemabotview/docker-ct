import type { Scene } from '@graphlearning/flow'
import { limits } from './limits'
import { stats } from './stats'
import { disk } from './disk'
import { layered } from './layered'
import { restart } from './restart'
import { recovery } from './recovery'

// Chapter 10 — Resources, Diagnosis, and Recovery.
export const diagnoseScenes: Scene[] = [limits, stats, disk, layered, restart, recovery]
