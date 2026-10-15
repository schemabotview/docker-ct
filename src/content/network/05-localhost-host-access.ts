import type { Section } from '../types'

export const localhostHostAccess: Section = {
  id: 'localhost-host-access',
  title: 'Container localhost, host access and Desktop differences',
  scene: 'localhost-host',
  focus: 'm-local',
  slide: `## Whose localhost?

\`localhost\` always means **the namespace you are in**.

### Inside catalog-api
- \`localhost\` is **catalog-api itself**, and so is \`127.0.0.1\`
- \`localhost:5432\` is refused: no database there
- Use the other container's **name**: \`catalog-db:5432\`
- Test from **inside** the caller, not from the host

### Reaching the host from a container
- **Docker Desktop** provides \`host.docker.internal\`
- **Linux Engine** needs it mapped: \`--add-host\` with \`host-gateway\`
- The host service must not listen on **loopback only**
- On Desktop the host is **outside** the Linux VM

### Host networking
- \`--network host\` shares the host's namespace, on **Linux**
- No isolation, no port mapping: use it **sparingly**
- Published ports are **ignored** in host mode`,
  narration:
    "Here is the single most common networking mistake, and it comes straight from the idea of separate namespaces. The API is configured to reach its database at localhost, port five four three two. On a laptop without containers, that worked. Inside a container, it fails with connection refused. Localhost always means the namespace you are in, and inside catalog api, localhost is catalog api itself. Nothing listens on five four three two there. The fix is to use the other container's name, catalog db, which resolves on the shared network. Sometimes a container genuinely needs a service running on the host itself, perhaps a mock API you started on your laptop. How to reach it depends on the platform, so do not assume one answer. Docker Desktop provides a special name, host dot docker dot internal. On Linux Engine that name does not exist by default; you add it at run time with dash dash add host, mapping it to the special value host gateway. In both cases, the host service must listen on an address the container network can reach, not only on the host's own loopback. Finally, host networking, available on Linux, puts the container in the host's namespace entirely. Its localhost is the host's localhost, but there is no isolation and no port mapping, so use it sparingly.",
}
