import type { Section } from '../types'

export const copyRunWorkdir: Section = {
  id: 'copy-run-workdir',
  title: 'Constructing the filesystem with COPY, RUN and WORKDIR',
  scene: 'copy-run-workdir',
  focus: 'result',
  slide: `## COPY, RUN and WORKDIR

Three instructions build the application's filesystem. **Order** decides how often work repeats.

### What each one does
- \`WORKDIR\` sets, and creates, the working directory
- \`COPY\` brings files in from the **build context**
- \`RUN\` executes a command and keeps the files it changed
- Prefer \`COPY\`; \`ADD\` also fetches URLs and unpacks archives

### An order that holds up
- Copy the **dependency list** alone, then install
- Copy the **source** last, because it changes most
- A source edit then reuses the installed libraries
- A code change should touch **only the last layer**

### Two classic mistakes
- \`COPY . .\` first: every edit reinstalls everything
- \`RUN cd /app\` does not persist; use \`WORKDIR\``,
  narration:
    "Three instructions do most of the work of building the application's filesystem. WORKDIR sets the working directory for every instruction after it, and creates it if needed, so later paths can be relative. COPY brings files in from the build context. RUN executes a command in a temporary container and keeps whatever files it changed as a new layer. The order matters more than it first appears. In this Dockerfile, the dependency list is copied on its own, the libraries are installed, and only then is the source copied. The source is what you edit most, so it goes last. When you change a line of code and rebuild, everything before that final COPY is unchanged and can be reused, and the slow install step does not run again. Chapter seven explains exactly how that reuse works. Now compare two common mistakes. Copying the whole project first, with copy dot dot, means any edit to any file invalidates the install step, and every build reinstalls every library. And writing RUN cd slash app does nothing useful: each RUN starts a fresh shell, so the directory change is lost the moment the instruction ends. WORKDIR is the instruction that persists. The result is a small, predictable tree, owned by root and readable by the process that will run it.",
}
