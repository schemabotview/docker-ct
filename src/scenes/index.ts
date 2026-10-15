import type { Scene } from '@graphlearning/flow'
import { systemScenes } from './system'
import { runScenes } from './run'
import { buildScenes } from './build'
import { stateScenes } from './state'
import { networkScenes } from './network'
import { composeScenes } from './compose'
import { buildsScenes } from './builds'
import { securityScenes } from './security'
import { deliveryScenes } from './delivery'
import { diagnoseScenes } from './diagnose'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...systemScenes, ...runScenes, ...buildScenes, ...stateScenes, ...networkScenes, ...composeScenes, ...buildsScenes, ...securityScenes, ...deliveryScenes, ...diagnoseScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
