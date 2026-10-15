import type { Section } from '../types'

export const capabilities: Section = {
  id: 'capabilities',
  title: 'Capabilities, privileged execution and least authority',
  scene: 'capabilities',
  focus: 'least',
  slide: `## Capabilities and least authority

Linux splits root's power into **capabilities**. A container gets only some of them.

### The default set
- Docker grants a **reduced** set by default
- Examples: changing file owners, binding ports below 1024
- Powerful ones, such as \`SYS_ADMIN\`, are **left out**

### \`--privileged\`
- Grants **every** capability and access to host **devices**
- Relaxes the security profiles that confine the process
- Almost never what an application needs
- Reserve it for tools that **manage the host** itself

### Least authority
- Start from \`cap_drop: [ALL]\`
- Add back only what a **named requirement** needs
- \`no-new-privileges\` stops setuid programs escalating`,
  narration:
    "On Linux, root is not one power but a collection of them, called capabilities: changing file ownership, binding low-numbered ports, configuring the network, mounting filesystems, and many more. A container does not receive all of them. Docker grants a reduced default set, enough for typical software to work, and leaves out the most powerful ones, such as the broad administrative capability called SYS ADMIN. The privileged flag throws that reduction away. It grants every capability, gives the container access to the host's devices, and relaxes the security profiles that normally confine the process. A privileged container is close to running directly on the host as root. It is occasionally necessary for tools that manage the host itself, and almost never for an application. Least authority goes the other way: start from nothing and add back only what a named requirement needs. Our API listens on port eight thousand and eighty, above the low-port range, and does nothing else that needs a capability, so it drops them all. If a service genuinely must bind port eighty, it adds back exactly that one, and the reason is written down beside it. Finally, no new privileges stops a process from gaining rights through setuid programs, closing a common escalation path.",
}
