import type { Section } from '../types'

export const hostLoss: Section = {
  id: 'host-loss',
  title: 'Single-host availability, durable data and host-failure boundaries',
  scene: 'host-loss',
  focus: 'l-volume',
  slide: `## When the host is lost

A single host is a **single point of failure**. Plan for losing it.

### What survives
- **Images**, in the registry, by digest
- **Compose files** and configuration, in version control
- **Secrets**, in a secret store
- Last night's **dump**, stored off the host

### What is lost
- The volume, and every write **since the dump**
- Logs that were never shipped off the host
- Any change made **by hand** and not committed
- The **build cache**: it only costs time

### Three meanings of "recovered"
- **Process up**: the containers are running
- **Data restored**: with the gap **known**
- **Users served**: a real request works`,
  narration:
    "Everything in this course has run on one host, and a single host is a single point of failure. So walk through the worst case: the machine is gone, disk and all. What survives is whatever was stored somewhere else. The images are in the registry, identified by digest. The Compose files and configuration are in version control. The secrets are in a secret store. And last night's database dump is stored off the host. From those four, a new host can be built and the application brought back. What is lost is whatever lived only on that host. The database volume is gone, and with it every write made since the dump; that gap is the price of the backup schedule, so it should be a known, accepted number. Logs that were never shipped elsewhere are gone. The build cache is gone too, which only costs time. And any change somebody made by hand on the server, and never committed, is gone for good. Finally, be precise about what recovered means. The processes running is one thing. The data restored, with the gap known, is another. And users being served, proven by a real request, is the only one that counts. Report all three separately, because a running container in front of an empty database is not a recovery.",
}
