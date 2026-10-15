import type { Section } from '../types'

export const pullCreateStart: Section = {
  id: 'pull-create-start',
  title: 'Pull, create, start and run',
  scene: 'pull-create-start',
  focus: 'created',
  slide: `## From image to running container

Getting an image and running a container are **separate steps**. \`docker run\` just does them together.

### The explicit path
- \`docker pull\` — copy the image into this daemon; no process yet
- \`docker create\` — a container with its config, but **not running**
- \`docker start\` — launch the container's main process

### What \`docker run\` adds
- Pulls only if the image is **missing locally**
- Creates a **new container every time** you run it
- Starts it, and attaches your terminal unless you pass \`-d\`

### States to recognise
- **Created**, **Running**, **Exited** — an exited container still exists
- \`docker ps\` lists running containers; \`docker ps -a\` lists all`,
  narration:
    "Most people meet Docker through one command, docker run, and that hides the fact that it does three separate things. Let's pull them apart, because each one fails differently. docker pull copies an image from a registry into this daemon's local image store. Nothing runs yet; you now simply have a template. docker create makes a container from that image. The container has its configuration and its own writable filesystem, but it is in the created state, with no process at all. docker start launches the container's main process, and the container is now running. When that process ends, for any reason, the container moves to exited. It is not deleted. It keeps its exit code, its logs and its filesystem until you remove it, and you can start it again. docker run folds all of this into one command. It pulls only if the image is missing locally, which means it will not fetch a newer version of a tag you already have. It creates a brand new container every time, so running the same command twice gives you two containers. And it starts the container, attaching your terminal unless you ask for detached mode. Next, we look at those attachment choices.",
}
