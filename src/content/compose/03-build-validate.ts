import type { Section } from '../types'

export const buildValidate: Section = {
  id: 'build-validate',
  title: 'Build definitions, image references and configuration validation',
  scene: 'build-validate',
  focus: 's-both',
  slide: `## Build or pull, then validate

Every service needs an image. Compose either **builds** it or **pulls** it.

### Building
- \`build:\` names the **context**, Dockerfile and build args
- Add \`image:\` to **name** the result, e.g. \`catalog-api:1.4.0\`
- Compose does **not** rebuild just because the code changed; an existing image is reused
- After a code change: \`docker compose up --build\`

### Pulling
- \`image:\` alone, like \`postgres:16\`, is **pulled**, never built
- Pin it the way Chapter 3 described: tags move

### Validating before \`up\`
- \`docker compose config -q\`: syntax and schema **errors only**
- \`docker compose config --services\`: what **will run**
- Validation is read-only; it creates **nothing**`,
  narration:
    "Every service needs an image, and Compose gets it one of two ways. A build key tells Compose to build the image itself, from a context directory and a Dockerfile, with any build arguments you list. If you also give an image key, Compose uses that as the name of the built image, so the API becomes catalog api, one point four point zero, which is a name you can later push and deploy. A service with only an image key, like the database, is pulled from a registry and never built. That makes the pinning advice from chapter three apply here too, because a tag can move between one pull and the next. One habit to build early: Compose does not rebuild just because the code changed. If the image already exists, up uses it. After changing code, run docker compose up with dash dash build, or docker compose build first. Before running anything, validate. docker compose config dash q checks syntax and the schema, and prints only errors. docker compose config dash dash services lists the services that will actually run, which is useful once overrides enter the picture. Both are read-only. They create nothing, so they are safe to run at any time, including in automated checks before a deployment.",
}
