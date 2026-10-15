import type { Section } from '../types'

export const productionReview: Section = {
  id: 'production-review',
  title: 'Production configuration review and application responsibilities',
  scene: 'config-review',
  focus: 'app',
  slide: `## The whole stack, reviewed

Every chapter added one decision. Here they are together, grouped by what they **protect**.

### Exposure
- One public entry; the API on **127.0.0.1**; the database **unpublished**

### Runtime
- Image by **digest**, non-root, \`cap_drop: ALL\`, read-only root
- **Limits**, health checks, a restart policy, rotated **logs**
- Secrets as **files**, never in the image or environment

### Data
- A named volume, a nightly **off-host** dump, a timed **restore drill**

### What the application owes
- Handle **SIGTERM** and finish in-flight work
- **Retry** its database connection with backoff
- Write only to its **known paths**`,
  narration:
    "This last chapter steps back and looks at the catalogue application as a whole, the way you would before calling it production-ready. Every chapter added one decision, and the board gathers them, grouped by what each one protects. Exposure: there is one public entry point, a reverse proxy; the API is published only on the loopback address behind it; and the database is not published at all, sitting on an internal network. Runtime: the API runs from an image pinned by digest, the same one staging tested. It runs as a non-root user, with every capability dropped and a read-only root filesystem. It has memory, CPU and process limits, a health check and a restart policy, and its logs go to standard output with rotation configured. Its secrets arrive as files, never in the image or the environment. Data: the database lives in a named volume, a dump is taken every night and stored off the host, and a restore is rehearsed and timed every month. The bottom row matters most, because Docker cannot provide it. The application itself must handle SIGTERM and finish its in-flight requests, retry its database connection with a backoff, and write only to the paths it was given. Containers make good behaviour possible; they do not supply it.",
}
