import type { Section } from '../types'

export const connectivityDiagnosis: Section = {
  id: 'connectivity-diagnosis',
  title: 'Network separation and systematic connectivity diagnosis',
  scene: 'diagnosis',
  focus: 's-listen',
  slide: `## Diagnosing a connection

Work along the request path. Each question has **evidence** you can collect.

### Ask in order
- **Member?** Is the caller on the same network as the target?
- **Resolves?** Does the name return an address?
- **Listening?** On which **address** and port?
- **Connects?** From the caller, not from your laptop

### Collecting evidence without extra tools
- A throwaway container can **share** another's namespace
- \`--network container:catalog-api\` with \`busybox netstat\`

### The loopback-only trap
- An app bound to **127.0.0.1** inside its container
- Publishing reaches eth0, so the host gets a **reset**
- Fix: listen on **0.0.0.0** inside the container
- Change **one thing** at a time, then re-check`,
  narration:
    "When a connection fails, resist changing settings at random. Walk the request path and ask four questions in order, each with evidence you can collect. Is the caller a member of the same network as the target? docker network inspect answers that. Does the name resolve, from inside the caller? getent hosts answers that. Is something listening, and on which address and port? And finally, can the caller actually connect? Always test from the caller, not from your laptop, because they sit in different namespaces. The table maps four classic failures to the question that exposes them. A container not on catalog net fails at the name. A wrong port, or localhost used for another container, fails with connection refused. And one failure is subtle enough to show in detail. The application images often lack network tools, so start a throwaway busybox container that shares the API's network namespace, and run netstat. It shows the API listening on one two seven dot zero dot zero dot one, its own loopback only. Publishing forwards connections to the container's interface, where nothing listens, so curl on the host gets a connection reset. The fix belongs in the application's configuration: listen on all interfaces, zero dot zero dot zero dot zero, inside the container, and let publishing decide the exposure.",
}
