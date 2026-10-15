import type { Section } from '../types'

export const startupUser: Section = {
  id: 'startup-user',
  title: 'CMD, ENTRYPOINT, exec form and a non-root identity',
  scene: 'startup-user',
  focus: 'shell-form',
  slide: `## Starting the application

The image's start-up configuration decides **what becomes PID 1** and **as which user**.

### Exec form versus a shell wrapper
- Exec form, \`["python", …]\`: the app **is** PID 1
- A shell wrapper makes \`sh\` PID 1 and the app its child
- SIGTERM then stops at the shell; the app is killed later
- A wrapper script should end with \`exec\` to hand over PID 1

### ENTRYPOINT and CMD
- \`ENTRYPOINT\` is the fixed program
- \`CMD\` supplies defaults that run arguments **replace**

### Run as a non-root user
- \`USER 10001\` drops root for the running process
- Application files stay owned by root, so it cannot alter them
- \`docker inspect\` shows the user and command an image declares`,
  narration:
    "The last few lines of a Dockerfile decide two things about every container made from it: which process becomes process one, and which user it runs as. Start with the process. Written in exec form, as a JSON list, the command runs directly, and the Python application itself is process one. When docker stop sends SIGTERM, the application receives it and shuts down cleanly. Now compare a shell wrapper: a start script run without exec. The shell becomes process one, and the application is its child. SIGTERM goes to the shell, which by default does not pass it on. The application never hears it, and after the grace period the container is killed. That is the ignored-signal branch from the last chapter, and here is its cause. If you need a script, end it with exec, so the application replaces the shell as process one. ENTRYPOINT and CMD work together. ENTRYPOINT is the fixed program. CMD supplies default arguments, which the arguments you pass to docker run replace. Finally, identity. Without a USER instruction the process runs as root. USER ten thousand and one drops that for the running process. The application files remain owned by root and readable, so the running API can use them but cannot modify its own code.",
}
