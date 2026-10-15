import type { Course } from '../types'
import { writableLayer } from './01-writable-layer'
import { namedVolumes } from './02-named-volumes'
import { bindMounts } from './03-bind-mounts'
import { tmpfs } from './04-tmpfs'
import { mountPermissions } from './05-mount-permissions'
import { backupRestore } from './06-backup-restore'

// Chapter 4 — State, Mounts, and Data Lifetime (DOCKER-COURSE-PLAN.md).
export const state: Course = {
  id: 'state',
  title: 'State, Mounts and Data Lifetime',
  sections: [writableLayer, namedVolumes, bindMounts, tmpfs, mountPermissions, backupRestore],
}
