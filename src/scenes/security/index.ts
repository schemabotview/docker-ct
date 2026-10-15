import type { Scene } from '@graphlearning/flow'
import { daemonAuthority } from './daemon-authority'
import { nonrootRootless } from './nonroot-rootless'
import { capabilities } from './capabilities'
import { readonlyNetwork } from './readonly-network'
import { vulnerability } from './vulnerability'
import { supplyChain } from './supply-chain'

// Chapter 8 — Container and Supply-Chain Security.
export const securityScenes: Scene[] = [daemonAuthority, nonrootRootless, capabilities, readonlyNetwork, vulnerability, supplyChain]
