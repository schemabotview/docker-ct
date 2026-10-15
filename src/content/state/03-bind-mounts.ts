import type { Section } from '../types'

export const bindMounts: Section = {
  id: 'bind-mounts',
  title: 'Bind mounts for development files and host integration',
  scene: 'bind-mount',
  focus: 'c-src',
  slide: `## Bind mounts

A **bind mount** makes a host directory appear inside the container. **No copy** is made.

### Why developers use them
- Edit \`./src\` on the host; the container sees it **immediately**
- Code changes need **no rebuild**
- Add \`readonly\` when the container only needs to read

### What to know
- The host path must exist on **every machine** that runs it
- On Desktop, files are shared into the VM and can be **slower**
- \`-v\` silently **creates** a missing host path; \`--mount\` errors
- A writable mount lets the container **change host files**

### Choosing
- Source code in development: **bind mount**
- Data the application owns: **named volume**`,
  narration:
    "A bind mount takes a directory on the host and makes it appear at a path inside the container. Nothing is copied: the container reads the same files the host has. That is what makes them so useful during development. Here the project's source folder is mounted over slash app slash src, and the API runs in reload mode. Change a file in your editor, and the running container sees the change at once and reloads, with no rebuild. Because this container only needs to read the code, the mount is read-only. Bind mounts trade portability for that convenience. The host path has to exist, with the right contents, on every machine that runs the command. On Docker Desktop, host files are shared into the Linux virtual machine, which can make large source trees noticeably slower. Two traps are worth knowing. With the short dash v syntax, a host path that does not exist is silently created as an empty directory, which leads to confusing failures; the longer mount syntax reports an error instead. And a writable bind mount lets the container change, or delete, files on your host. So the usual split is simple: bind mounts for source code you are editing, and named volumes for data the application itself owns.",
}
