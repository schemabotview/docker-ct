import type { Scene } from '@graphlearning/flow'
import { buildContext } from './build-context'
import { layersMetadata } from './layers-metadata'
import { baseImages } from './base-images'
import { copyRunWorkdir } from './copy-run-workdir'
import { startupUser } from './startup-user'
import { buildVsRuntime } from './build-vs-runtime'
import { tagsDigests } from './tags-digests'

// Chapter 3 — Building an Application Image.
export const buildScenes: Scene[] = [
  buildContext,
  layersMetadata,
  baseImages,
  copyRunWorkdir,
  startupUser,
  buildVsRuntime,
  tagsDigests,
]
