import type { Course } from '../types'
import { buildContext } from './01-build-context'
import { layersMetadata } from './02-layers-metadata'
import { baseImages } from './03-base-images'
import { copyRunWorkdir } from './04-copy-run-workdir'
import { startupUser } from './05-startup-user'
import { buildVsRuntime } from './06-build-vs-runtime'
import { tagsDigests } from './07-tags-digests'

// Chapter 3 — Building an Application Image (DOCKER-COURSE-PLAN.md).
export const build: Course = {
  id: 'build',
  title: 'Building an Application Image',
  sections: [buildContext, layersMetadata, baseImages, copyRunWorkdir, startupUser, buildVsRuntime, tagsDigests],
}
