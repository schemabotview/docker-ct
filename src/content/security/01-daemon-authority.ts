import type { Section } from '../types'

export const daemonAuthority: Section = {
  id: 'daemon-authority',
  title: 'Isolation boundaries, daemon authority and Docker socket access',
  scene: 'daemon-authority',
  focus: 'review',
  slide: `## What is this container allowed to do?

Isolation is only as strong as the **authority you hand back** to the container.

### The daemon is the key
- The daemon runs as **root** and can start any container
- Access to its **socket** is effectively **root on the host**
- So is membership of the \`docker\` group
- A remote API needs **TLS or SSH**, never plain TCP

### Reviewing the API's grants
- \`privileged: true\` gives all capabilities and devices
- The \`docker.sock\` mount gives control of the **daemon**
- \`/:/host\` gives read and write on **the whole host**
- None is needed by a catalogue API

### Replacing them
- Remove each grant; justify any that remain
- One **application** change: write only to \`/app/uploads\``,
  narration:
    "Isolation is the starting point, not the result. A container is only as contained as the authority you hand back to it, so this chapter begins with a review. Start with the daemon. It runs as root, and it can start any container with any options, including one that mounts the host's entire filesystem. That means anyone who can talk to the daemon's socket is, in practice, root on the host. Membership of the docker group grants exactly that, and so does a remote API without proper authentication. Now the configuration on the left, which is the kind of thing that gets copied from a forum post. The API runs privileged, which gives it every capability and access to host devices. It mounts the Docker socket, which hands it control of the daemon. It bind-mounts the host's root filesystem, read and write. And it runs as root. Ask of each line: what does the catalogue API actually need? It needs none of them. It needs to listen on a port, read its own files, connect to the database, and write uploaded images somewhere. So the review removes each grant. One of these needs an application change, not just a configuration change: the API must write only to one directory it owns, which then becomes its only writable mount.",
}
