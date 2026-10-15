import type { Course } from '../types'
import { requestPaths } from './01-request-paths'
import { bridgeNetworks } from './02-bridge-networks'
import { dnsDiscovery } from './03-dns-discovery'
import { portsPublishing } from './04-ports-publishing'
import { localhostHostAccess } from './05-localhost-host-access'
import { connectivityDiagnosis } from './06-connectivity-diagnosis'

// Chapter 5 — Networking and Request Paths (DOCKER-COURSE-PLAN.md).
export const network: Course = {
  id: 'network',
  title: 'Networking and Request Paths',
  sections: [requestPaths, bridgeNetworks, dnsDiscovery, portsPublishing, localhostHostAccess, connectivityDiagnosis],
}
