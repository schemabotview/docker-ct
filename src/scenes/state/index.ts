import type { Scene } from '@graphlearning/flow'
import { writableLayer } from './writable-layer'
import { namedVolume } from './named-volume'
import { bindMount } from './bind-mount'
import { storageCompare } from './storage-compare'
import { mountPitfalls } from './mount-pitfalls'
import { backupRestore } from './backup-restore'

// Chapter 4 — State, Mounts, and Data Lifetime.
export const stateScenes: Scene[] = [writableLayer, namedVolume, bindMount, storageCompare, mountPitfalls, backupRestore]
