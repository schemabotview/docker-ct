import type { Section } from '../types'

export const requestPaths: Section = {
  id: 'request-paths',
  title: 'Container interfaces, network namespaces and request paths',
  scene: 'request-path',
  focus: 'a-listen',
  slide: `## Following one request

Every container has its **own network namespace**: its own interfaces, ports and loopback.

### The path of GET /items
- The browser connects to **127.0.0.1:8081** on the host
- Docker forwards it to the API's **eth0, port 8080**
- The API connects to **catalog-db:5432** over catalog-net
- \`docker port catalog-api\` shows the host side

### Three separate "machines"
- The host, the API and the database each have a **loopback**
- Each loopback reaches **only its own** processes
- Ports never collide: two containers can both use 8080

### Exposure is a choice
- The API is published to **this host only**
- The database is **not published at all**
- Publish only what a client **outside** must reach`,
  narration:
    "Before configuring anything, let's follow one request from the browser to the database, because every networking problem in this chapter is a break somewhere on this path. Each container runs in its own network namespace. That means it has its own network interfaces, its own set of ports, and its own loopback address. In networking terms, the host, the API container and the database container behave like three separate machines. The request starts in the browser on the host, which connects to port eight zero eight one on the host's loopback address. That port was published, so Docker forwards the connection to the API container's own interface, on port eight thousand and eighty, where the API is listening. To answer, the API opens a second connection: to the name catalog db, on port five four three two, across a private network called catalog net. The database listens there and replies. Two consequences are worth stating now. Because each namespace has its own ports, two containers can both listen on eight thousand and eighty without colliding. And because each has its own loopback, localhost inside one container never reaches another. Exposure is deliberate too: the API is published to this host only, and the database is not published at all.",
}
