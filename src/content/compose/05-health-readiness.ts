import type { Section } from '../types'

export const healthReadiness: Section = {
  id: 'health-readiness',
  title: 'Health checks, dependency conditions, application retry and shutdown order',
  scene: 'readiness',
  focus: 'l-retry',
  slide: `## Health, dependencies and retry

"The database is up" can mean three different things. Only one matters to the API.

### Three meanings
- **Started**: the process exists
- **Healthy**: the health check, \`pg_isready\`, passes
- **Working**: the API's queries actually succeed
- A health check is a command run **inside** the container

### What depends_on gives you
- A plain list waits only for the dependency to **start**
- \`condition: service_healthy\` waits for **healthy**
- \`down\` stops dependents **first**: api, then db
- \`docker compose ps\` shows **(healthy)** once checks pass

### What it does not
- It is checked **once, at start-up**
- If the database restarts later, the API must **retry**
- Health status alone **restarts nothing**`,
  narration:
    "Start-up order is one of the most misunderstood parts of Compose, because the phrase the database is up hides three different states. The process can have started while the database is still initialising and refusing connections. A health check, here pg is ready, can pass, meaning the server accepts connections. And the API's real queries can succeed, which is the only thing a user cares about. Depends on, written as a plain list, makes Compose start the database before the API, but waits only for the process to start. Adding condition service healthy makes Compose wait until the health check passes before starting the API. On shutdown the order reverses: down stops the API first, then the database. That solves start-up. It does not solve what happens afterwards. Depends on is checked once, when the project comes up. If the database restarts an hour later, for an upgrade or a crash, Compose does not pause the API or restart it in step. The API's connections fail, and the only real fix lives in the application: it must retry, reconnecting with a backoff instead of giving up. And note that health status on its own restarts nothing. It reports. What acts on failure, restart policies, comes in the diagnosis chapter.",
}
