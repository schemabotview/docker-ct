import type { Section } from '../types'

export const buildVsRuntime: Section = {
  id: 'build-vs-runtime',
  title: 'Build arguments and environment versus runtime configuration',
  scene: 'build-vs-runtime',
  focus: 'x-still',
  slide: `## Build-time or run-time?

Decide where each value belongs. The answer changes what you must **rebuild** or **recreate**.

### Build time
- \`ARG\` is an input to the build, such as a version label
- \`ENV\` sets a **default**; containers can override it
- Changing code means **rebuilding** the image

### Run time
- \`-e\`, \`-p\` and arguments configure **one container**
- Changing them means **recreating** the container, not rebuilding
- One image, **many configurations**: test, staging, production

### Secrets belong in neither
- \`ARG\` and \`ENV\` values are visible in the image
- Deleting a copied secret in a later layer **does not remove it**
- A **build secret mount** exposes it to one \`RUN\` only`,
  narration:
    "Every setting has to live somewhere, and choosing where decides what you must redo when it changes. Build-time values are baked into the image. ARG is an input to the build itself, such as a version label. ENV sets a default variable that every container starts with, and any container can override it. The code and libraries are build-time too, so changing the code means rebuilding the image. Run-time values belong to one container: environment variables passed with dash e, the published port, the command arguments. Changing those means recreating the container from the same image. No rebuild is needed, and that is the point: one tested image, configured differently in each place it runs. Some values belong in neither. Build arguments and environment defaults are recorded in the image, where anyone with it can read them. And here is the mistake to recognise. A project copied wholesale brings its dot env file into layer four. A later instruction deletes it in layer five. The file is hidden from the final filesystem, but layer four still contains it, and anyone with the image can extract it. Deleting it does not undo the copy. The right tool is a build secret mount, which makes a secret available to one RUN instruction without storing it in any layer. Chapter seven puts it to work.",
}
