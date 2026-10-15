import type { Section } from '../types'

export const imagesContainersRegistries: Section = {
  id: 'images-containers-registries',
  title: 'Images, containers, registries and the lifecycle',
  scene: 'lifecycle-objects',
  focus: 'image-pulled',
  slide: `## Images, containers and registries

Four objects, connected by four verbs: **build**, **push**, **pull** and **run**.

### The objects
- **Dockerfile** — instructions for building an image
- **Image** — a read-only template: files plus start-up settings
- **Registry** — a server that stores and distributes images
- **Container** — a running or stopped instance of an image

### How they relate
- One image can start **many containers**
- Each container has its own state, logs and exit status
- A tag such as \`1.0\` is a **movable name**; a digest identifies exact content

### Where they live
- Images and containers belong to **one Docker host**
- A registry is how an image moves between hosts`,
  narration:
    "Docker has a small vocabulary, and most confusion comes from mixing up its nouns. There are four objects and four verbs. A Dockerfile is a text file of build instructions. Building it produces an image, which is a read-only template: a set of files plus settings such as the command to start. An image does nothing on its own. When you run it, Docker creates a container, which is an instance of that image with its own writable state, its own logs, and eventually its own exit status. One image can start many containers. On the right of this board, the same image is behind two running API containers and one migration job that has already exited. To get an image from the build machine to the machine that runs it, you push it to a registry and pull it on the other side. In the registry, an image lives in a repository and is found by a tag such as one point zero. A tag is a name that can be moved to different content later; a digest identifies the exact content. Notice also that images and containers belong to one Docker host. A registry is how an image moves between hosts.",
}
