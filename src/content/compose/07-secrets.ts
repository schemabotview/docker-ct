import type { Section } from '../types'

export const secrets: Section = {
  id: 'secrets',
  title: 'Runtime secret files, application consumption and protection limits',
  scene: 'secrets',
  focus: 'p-app',
  slide: `## Secret files at run time

A secret should reach the process **at run time**, never through the image or the Compose file.

### How Compose delivers it
- The value lives in a **host file**, listed in \`.gitignore\`
- Services that list it see \`/run/secrets/db_password\`, **read-only**
- Postgres reads \`POSTGRES_PASSWORD_FILE\`; so does the API

### Why a file, not a variable
- Environment variables show in \`inspect\` and logs
- Child processes inherit them; files must be **opened**

### What it does not give you
- The file on the host is **plain text**
- Anyone with Docker access can read it through \`exec\`
- Rotation is manual; nothing is **audited**
- It is a delivery mechanism, **not** a secret manager`,
  narration:
    "The database password has been sitting in plain sight in our examples, so this section puts it where it belongs. A secret should reach the running process at run time, never through the image and never written into the Compose file. Compose's secrets feature does that with a file. The password lives in a file on the host, and that file is listed in dot gitignore, so it never reaches the repository. The secrets section names it, and each service that lists the secret sees it at slash run slash secrets slash db password, mounted read-only. The official Postgres image already understands this: give it POSTGRES PASSWORD FILE, and it reads the password from that path. Our API accepts the same convention. Why a file rather than an environment variable? Environment variables appear in docker inspect, are easy to log by accident, and are inherited by every child process. A file has to be deliberately opened. Now the limits, because this is easy to overestimate. On the host, the secret is a plain text file. Anyone who can run docker commands can read it through exec. Changing it means editing the file and recreating the containers, and nothing records who read it. This is a delivery mechanism, not a secret-management system, and production may need a real one.",
}
