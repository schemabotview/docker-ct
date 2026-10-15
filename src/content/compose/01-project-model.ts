import type { Section } from '../types'

export const projectModel: Section = {
  id: 'project-model',
  title: 'Services, networks, volumes and the Compose project model',
  scene: 'project-model',
  focus: 'project',
  slide: `## One file, one project

**Compose** describes the whole application in \`compose.yaml\` and creates it as a **project**.

### What the file declares
- **Services**: each one becomes one or more containers
- **Volumes** and **networks** the services use
- The same choices you made with \`docker run\`, written down

### What Compose creates
- Objects named after the project: \`catalog_pgdata\`
- A default network where **service names resolve**
- The API reaches the database simply as \`db\`

### Why it helps
- The setup is **reviewable**, versioned and repeatable
- Everything is labelled, so the project can be **found and removed**
- Nothing new underneath: the same containers, networks, volumes`,
  narration:
    "In the last two chapters we built the catalogue application by hand: a network, a volume, a database container and an API container, each with a long command. Compose lets you write all of that down once, in a file called compose dot yaml, and manage it as a single project. The file declares services. Each service becomes one or more containers, here an API built from our Dockerfile and a database from postgres sixteen. It also declares the volumes and networks those services use. Nothing in it is new: every line corresponds to a choice you already made on the command line. When you run docker compose up, Compose creates real objects and names them after the project, which we have called catalog. The volume becomes catalog underscore pgdata; the containers become catalog api one and catalog db one. It also creates a default network for the project, and on that network each service name resolves, so the API reaches its database simply as db. That is why the file sets the database host to db. The gain is not new capability. It is that the whole setup is reviewable and versioned alongside the code, repeatable on any machine, and labelled, so the project's objects can be found, and removed, as a set.",
}
