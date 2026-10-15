import type { Scene } from '@graphlearning/flow'
import { requestPath } from './request-path'
import { bridgeNetworks } from './bridge-networks'
import { dnsDiscovery } from './dns-discovery'
import { ports } from './ports'
import { localhostHost } from './localhost-host'
import { diagnosis } from './diagnosis'

// Chapter 5 — Networking and Request Paths.
export const networkScenes: Scene[] = [requestPath, bridgeNetworks, dnsDiscovery, ports, localhostHost, diagnosis]
