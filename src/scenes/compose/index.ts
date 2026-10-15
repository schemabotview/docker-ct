import type { Scene } from '@graphlearning/flow'
import { projectModel } from './project-model'
import { interpolation } from './interpolation'
import { buildValidate } from './build-validate'
import { lifecycle } from './lifecycle'
import { readiness } from './readiness'
import { overrides } from './overrides'
import { secrets } from './secrets'

// Chapter 6 — Multi-Service Applications with Compose.
export const composeScenes: Scene[] = [projectModel, interpolation, buildValidate, lifecycle, readiness, overrides, secrets]
