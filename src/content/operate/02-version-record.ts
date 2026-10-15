import type { Section } from '../types'

export const versionRecord: Section = {
  id: 'version-record',
  title: 'Reproducibility, version records and compatibility inventory',
  scene: 'version-record',
  focus: 'record',
  slide: `## Reproducibility and the version record

You cannot reproduce what you did not **write down**.

### What to record
- **Engine**, **Desktop** where used, **Compose**, **Buildx**
- The **Dockerfile frontend**, from its \`# syntax=\` line
- The **API image** and **database image**, by digest
- The application's **dependency lock**

### Where it comes from
- Read each value from the **system**, not from memory
- \`docker version\`, \`docker compose version\`, the release record

### What it is for
- **Rebuild** the same thing months later
- **Compare** two environments when one misbehaves
- Read the **documentation for those versions**
- This course records **none**: its outputs are illustrative`,
  narration:
    "Reproducibility is a simple idea with a demanding requirement: you cannot reproduce what you did not write down. The table is the version record this course has asked for since chapter one, applied to the running system. It lists the Docker Engine, Docker Desktop where it is used, the Compose plugin and Buildx. It includes the Dockerfile frontend, which the syntax line at the top of a Dockerfile selects, because it decides which build features are available. It names the API image and the database image by digest, and the application's dependency lock by its hash. Each value comes from the system itself, not from memory: docker version, docker compose version, docker buildx version, and the release record kept by the pipeline. The record has three jobs. It lets you rebuild the same thing months later. It lets you compare two environments when one behaves differently, which is usually the fastest route to a cause. And it tells you which version of the documentation to read, because behaviour and options change between releases. One honest note. The values here are placeholders, because this course asserts no specific versions; its output has been illustrative throughout. Your record should contain real values, captured from your own systems.",
}
