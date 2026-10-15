import type { Section } from '../types'

export const writableLayer: Section = {
  id: 'writable-layer',
  title: 'The writable container layer and removal-related data loss',
  scene: 'writable-layer',
  focus: 'w-layer',
  slide: `## Where a container's writes go

With nothing mounted, every file a container writes lands in its own **writable layer**.

### How it works
- Image layers stay **read-only** and shared
- A changed file is **copied up** into the writable layer
- That layer belongs to **one container** and nothing else
- \`docker diff\` lists what the container has changed

### Its lifetime
- \`docker stop\` then \`docker start\`: the data is **kept**
- \`docker rm\`: the writable layer, and the data, are **deleted**
- A new container from the same image starts **empty**

### The consequence
- Databases, uploads and anything you must keep need **a mount**
- Treat the writable layer as **disposable**
- Heavy writes there are also **slower** than to a volume`,
  narration:
    "Every container gets a thin writable layer on top of its image's read-only layers. When nothing else is mounted, every file the container writes goes there. If the process changes a file that came from the image, the file is first copied up into the writable layer, so the image itself is never modified and other containers sharing it are unaffected. Now watch what that means for data. We run a PostgreSQL container called scratch db, create a table, and insert three rows. Those rows are files in the container's writable layer. Stopping and starting the same container is harmless: the layer is still there, and so are the rows. But docker rm deletes the container, and the writable layer goes with it. Run the same command again, from the same image, and you get a brand new container with a brand new, empty layer. The query fails because the table does not exist. Nothing went wrong in Docker; this is exactly how it is designed. The writable layer lives precisely as long as its container, which is why replacing containers is cheap. The consequence is simple. Anything you need to keep, such as database files or user uploads, must live somewhere with its own lifetime. That is what mounts are for.",
}
