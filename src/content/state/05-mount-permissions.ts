import type { Section } from '../types'

export const mountPermissions: Section = {
  id: 'mount-permissions',
  title: 'Ownership, permissions and files hidden by mounts',
  scene: 'mount-pitfalls',
  focus: 'd-cause',
  slide: `## Hidden files and denied writes

Two mount failures look like application bugs. Both have **mechanical** causes.

### A mount hides what was there
- Mounting over \`/app/src\` **hides** the image's files at that path
- An empty host directory there means **missing code**
- An **empty named volume** is first filled from the image
- A bind mount is **never** pre-filled

### Permissions are numbers
- The process runs as **UID 10001**
- The host directory is owned by **UID 1000**
- The kernel compares **numbers**; user names do not matter

### Fixing a denied write
- Give the directory to the container's UID, or use a volume
- Check with \`id\` inside and \`ls -ln\` outside`,
  narration:
    "Two mount problems regularly masquerade as application bugs, and both have simple mechanical causes. The first is hiding. When you mount something at a path, it replaces whatever the image had there, for as long as the mount exists. Mount an empty host directory over slash app slash src and the application's code vanishes from the container's view, and the API fails at start-up because it cannot find its own module. Named volumes behave slightly differently: when an empty named volume is first mounted, Docker copies the image's files at that path into it. A bind mount is never pre-filled. The second problem is permission. Inside the container the API runs as user ten thousand and one, as we set in the Dockerfile. It tries to save an upload into a bind-mounted directory on the host, and is refused. The evidence is in the numbers. The id command inside the container reports ten thousand and one. ls with the numeric flag on the host shows the directory belongs to one thousand. The kernel compares numeric IDs, never names, so the container simply does not own that directory. Fix it by giving the directory to the container's user ID, or by using a named volume the container can own.",
}
