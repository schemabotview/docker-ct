import type { Section } from '../types'

export const projectLifecycle: Section = {
  id: 'project-lifecycle',
  title: 'Project creation, observation, recreation, shutdown and volume lifetime',
  scene: 'lifecycle',
  focus: 'rule',
  slide: `## Up, observe, recreate, down

Compose commands act on the **whole project** unless you name a service.

### Running and observing
- \`docker compose up -d\` creates and starts everything
- \`docker compose ps\` shows state and **health**
- \`docker compose logs -f api\` follows one service
- Name a service to act on **one** only: \`restart api\`

### Changing the file
- \`up -d\` again **recreates only** the services that changed
- Unchanged services keep running, untouched

### Shutting down
- \`stop\` stops containers; nothing is removed
- \`down\` removes containers and the network, **keeps volumes**
- \`down -v\` also deletes \`catalog_pgdata\`: **every row is lost**
- Use \`-v\` only on purpose, after a verified backup`,
  narration:
    "Day to day, a handful of Compose commands cover nearly everything, and they act on the whole project unless you name a service. docker compose up dash d creates whatever is missing and starts it all in the background. docker compose ps shows each service's container, its state and, where a health check exists, its health. docker compose logs with dash f follows the output of one service, here the API. Now change something in the file, say the API's log level, and run up dash d again. Compose compares what is running with what the file now describes, and recreates only the services that differ. The API is replaced; the database is not touched. Shutting down needs more care, so the table spells it out. Stop stops the containers and removes nothing. Down removes the containers and the project's network, but keeps named volumes, so the catalogue's data survives. Down dash v also removes the named volumes. For this project that means catalog underscore pgdata, and with it every row in the database. It is a useful command for a disposable test environment and a destructive one anywhere else. So read the last row of that table again: use dash v only on purpose, and only when a verified backup exists, as the storage chapter described.",
}
