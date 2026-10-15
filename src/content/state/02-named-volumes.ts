import type { Section } from '../types'

export const namedVolumes: Section = {
  id: 'named-volumes',
  title: 'Named volumes and daemon-managed persistence',
  scene: 'named-volume',
  focus: 'volume',
  slide: `## Named volumes

A **named volume** is storage the daemon manages, with a lifetime **separate** from any container.

### Mount it where the data lives
- \`-v catalog-pgdata:/var/lib/postgresql/data\`
- That path is documented for **postgres:16**; check yours
- Replace the container, mount the same volume, keep the rows

### Where it is
- Under the daemon's storage, not a path you choose
- On Docker Desktop, **inside the Linux VM**
- \`docker volume inspect\` shows its driver and mountpoint

### Its own lifetime
- \`docker rm\` leaves a named volume **untouched**
- Only \`docker volume rm\` deletes it, and that **deletes the data**
- List with \`docker volume ls\` and name volumes clearly`,
  narration:
    "A named volume is the usual home for data a container must keep. The daemon creates and manages it, and its lifetime is separate from any container that uses it. Here we create a volume called catalog pg data and mount it at the directory where the PostgreSQL image keeps its data. Which directory that is depends on the image and its version. We are using postgres sixteen, whose documentation gives slash var slash lib slash postgresql slash data. Other major versions may document a different path, so check the image documentation for yours. Mount at the wrong path and the data still lands in the writable layer. Now replace the container. Stop it, remove it, and run a new one with the same dash v flag. The new container mounts the same volume, and the rows are still there. The container was disposable; the data was not. Where does the volume physically live? Under the daemon's own storage directory, not a path you choose. On Docker Desktop that is inside the Linux virtual machine, not on your Mac or Windows filesystem. And its lifetime is explicit. Removing containers never removes a named volume. Only docker volume rm does, and that deletes the data. So name volumes clearly, list them before deleting, and delete only disposable ones, like catalog scratch here, on purpose.",
}
