import type { Section } from '../types'

export const layersMetadata: Section = {
  id: 'layers-metadata',
  title: 'Dockerfile instructions, filesystem layers and image configuration',
  scene: 'layers-metadata',
  focus: 'config',
  slide: `## Layers and configuration

A Dockerfile is read top to bottom. Each instruction does **one of two things**.

### Instructions that change files
- \`FROM\` starts from the base image's layers
- \`COPY\`, \`RUN\` and \`WORKDIR\` add a **filesystem layer**
- Layers are read-only and **shared** between images
- \`docker history\` lists an image's layers

### Instructions that describe the image
- \`ENV\`, \`EXPOSE\`, \`USER\` and \`CMD\` write **configuration**
- No files change; the settings are read by \`docker run\`
- \`EXPOSE\` **documents** a port; only \`-p\` publishes it
- \`docker inspect\` shows the recorded configuration

### The result
- An image is a **layer stack** plus a **config** record
- Both are fixed once built; any change makes a **new image**`,
  narration:
    "Here is the whole Dockerfile for the catalogue API, and the useful way to read it is to sort its instructions into two kinds. The first kind changes files. FROM starts from the base image's existing layers. WORKDIR creates the application directory. COPY brings in the dependency list and later the source code, and RUN executes a command, here installing libraries, and keeps whatever files it changed. Each of these adds a filesystem layer. Layers are read-only, and identical layers are stored once and shared between images, which is why pulling a second image built on the same base is quick. The second kind changes no files at all. ENV sets default environment variables. EXPOSE records which port the application listens on. USER says which identity the process runs as, and CMD says what to run. These are written into the image's configuration, a small record that docker run reads when it creates a container. EXPOSE deserves a warning, because its name misleads. It documents the port; it does not publish anything. Only dash p at run time makes a port reachable from the host. So an image is exactly two things: a stack of layers, and a configuration record that says how to start it.",
}
