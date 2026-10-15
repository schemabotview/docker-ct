import type { Section } from '../types'

export const runModes: Section = {
  id: 'run-modes',
  title: 'Foreground, detached, interactive and terminal-attached',
  scene: 'run-modes',
  focus: 'mode-detached',
  slide: `## How your terminal attaches

Every container has one **main process**. These options decide how your terminal connects to it.

### Foreground and detached
- **Foreground** — output streams to you; Ctrl-C signals the process
- **Detached** (\`-d\`) — prints an ID and returns; the service keeps running
- A long-running service is normally **detached**

### Interactive and terminal
- \`-i\` keeps **stdin** open, so you can pipe input in
- \`-t\` allocates a **terminal**, for prompts and line editing
- \`-it\` together gives you an interactive shell

### Choosing
- A one-off job: foreground, often with \`--rm\`
- A shell: \`-it\`; a long-running service: \`-d\`
- Pick by **what the process needs**, not by habit`,
  narration:
    "A container has one main process, and these options decide how your terminal is connected to it. The default is foreground. The process's output streams straight to your terminal, and pressing control C sends it a signal to stop. That suits a one-off task, like checking a configuration file, especially with dash dash rm so the container is removed when it exits. Detached mode, dash d, is the opposite. Docker prints the new container's ID and gives your prompt back, while the process keeps running in the background. A long-running service such as our catalogue API is normally detached, and you read its output later with docker logs. The other two flags are about input. Dash i keeps standard input open, so you can pipe data into the process, for example importing a file of items. Dash t allocates a pseudo-terminal, which programs need for prompts, colours and line editing. They are separate flags, but you will usually see them together, as dash i t, to get an interactive shell inside a container. The rule for choosing is simple: pick the mode the process actually needs. A shell needs a terminal; a web service needs neither, and attaching to it gains you nothing.",
}
