import type { Section } from '../types'

export const baseImages: Section = {
  id: 'base-images',
  title: 'Base-image compatibility, trust and dependency installation',
  scene: 'base-images',
  focus: 'q-libc',
  slide: `## Choosing a base image

\`FROM\` decides everything under your code: its OS libraries, its tools and **who maintains them**.

### Decide by compatibility and trust
- **libc**: native wheels built for glibc may not run on musl
- **Platforms**: is your target architecture published?
- **Publisher**: an official or verified source you trust
- **Maintenance**: rebuilt promptly when fixes appear

### Smaller is not automatically better
- A base that breaks a dependency costs more than it saves
- Start from **slim** unless a dependency needs the full toolchain

### Installing on top
- Pin versions in a **locked** requirements file
- Leave package caches out of the layer
- Install only what the application **runs** with`,
  narration:
    "The FROM line chooses everything underneath your code: the operating system libraries, the language runtime, the tools, and, easy to forget, the people who maintain them. Most official language images come in variants. The full image includes compilers and build tools and is large. The slim variant drops most of that and suits most applications. The Alpine variant is smaller still, but it uses a different C library, musl instead of glibc, and Python packages that ship precompiled native code for glibc may not install, or may need compiling from source. Size is a poor way to decide. Ask four questions instead. Is it compatible with your dependencies? Is it published for the architecture you will run on, for example both amd64 and arm64? Who publishes it, and do you trust them; an official or verified publisher is a different proposition from an unknown account. And is it maintained, rebuilt promptly when security fixes appear? Then install your dependencies on top deliberately. Pin exact versions in a locked requirements file so a rebuild does not silently pick up new ones. Leave package caches out of the layer. And where system packages are needed, update and install in a single RUN, so the package index is never stale.",
}
