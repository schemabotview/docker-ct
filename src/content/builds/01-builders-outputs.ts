import type { Section } from '../types'

export const buildersOutputs: Section = {
  id: 'builders-outputs',
  title: 'BuildKit, Buildx, builder selection and output destinations',
  scene: 'builders-outputs',
  focus: 'o-none',
  slide: `## Builders and outputs

**BuildKit** does the building. **Buildx** is the CLI that chooses a builder and an output.

### Builders
- The **default** builder runs inside the Docker daemon
- \`docker buildx create\` adds a builder in its **own container**
- \`docker buildx ls\` lists builders and their platforms
- Each builder keeps its **own cache**

### Outputs
- \`--load\` puts the image in the **local image store**
- \`--push\` sends it to a **registry**
- \`--output\` writes files or a tarball

### The trap
- A container builder with **no output** keeps the result only in its cache
- \`docker images\` will not show it`,
  narration:
    "Every image you have built so far went through BuildKit, the build engine behind docker build. The command you type is a client, and the work happens in a builder. Buildx is the part of the CLI that lets you choose which builder, and where the result goes. The default builder runs inside the Docker daemon, which is why your images have simply appeared in docker images. You can create others with docker buildx create. A builder using the docker container driver runs BuildKit in its own container, and supports features the default one may not, such as exporting caches or building for several platforms at once. docker buildx ls lists your builders and the platforms each can build for. Each builder keeps its own cache, so switching builders means starting cold. The result needs a destination. Dash dash load copies it into the local image store, where docker run can use it. Dash dash push sends it to a registry. Dash dash output can write the final filesystem as files or a tarball, useful for build artefacts that are not images. And here is the trap. Build with a container builder and give no output, and the build succeeds, but the image exists only in that builder's cache. docker images will not show it, and docker run will not find it.",
}
