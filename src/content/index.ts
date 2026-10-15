import { system } from './system'
import { run } from './run'
import { build } from './build'
import { state } from './state'
import { network } from './network'
import { compose } from './compose'
import { builds } from './builds'
import { security } from './security'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [system.id]: system,
  [run.id]: run,
  [build.id]: build,
  [state.id]: state,
  [network.id]: network,
  [compose.id]: compose,
  [builds.id]: builds,
  [security.id]: security,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
