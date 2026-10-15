import type { Section } from '../types'

export const multiStage: Section = {
  id: 'multi-stage',
  title: 'Multi-stage builds and separating build tools from runtime artifacts',
  scene: 'multi-stage',
  focus: 'rs-none',
  slide: `## Build stage, runtime stage

Building needs tools that running does not. A **multi-stage** build keeps them apart.

### How it works
- Each \`FROM … AS name\` starts a **new stage**
- The **build** stage has the compiler and headers
- The **runtime** stage starts clean, from the slim base
- Only the **last** stage, or \`--target\`, becomes the image
- \`COPY --from=build\` takes only the **result**

### What you gain
- No compiler or headers in the shipped image
- **Fewer packages** to patch and to exploit
- The size change depends on the app: **measure it**
- Copy **artefacts**, not whole directories of build state

### Working with stages
- \`--target build\` stops at a stage, for debugging
- Independent stages can build **in parallel**`,
  narration:
    "Some Python libraries, including the PostgreSQL driver when built from source, need a C compiler and development headers to install. The application never needs them to run. In a single-stage build, those tools end up in the image you ship. A multi-stage build separates the two jobs. Each FROM line with an AS name starts a new stage. The build stage starts from the slim base, installs the compiler and headers, creates a virtual environment, and installs the dependencies into it. The runtime stage starts again from a clean base, adds only the small runtime library the driver needs, and then copies just one thing from the build stage: the finished virtual environment. COPY dash dash from equals build is the bridge. Everything else in the build stage, the compiler, the headers, the download cache, is simply left behind. What do you gain? The shipped image no longer contains a compiler, which means fewer packages to patch and fewer tools for an attacker to use. It is usually smaller too, but by how much depends entirely on the application, so measure it with docker image ls and docker history rather than trusting a number from a blog. Two working tips: dash dash target build stops at the build stage so you can debug it, and independent stages can build in parallel.",
}
