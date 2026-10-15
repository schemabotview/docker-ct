import type { Section } from '../types'

export const multiPlatform: Section = {
  id: 'multi-platform',
  title: 'Architecture, image indexes and emulation, native and cross-compilation strategies',
  scene: 'multi-platform',
  focus: 'i-fail',
  slide: `## One tag, several platforms

Images are built for a **CPU architecture**. An ARM laptop and an x86 server need different ones.

### How one tag serves both
- The tag points at an **image index**
- The index lists one image **per platform**, each with its own digest
- Each host pulls the variant that **matches** it
- \`--platform\` on \`docker run\` forces a variant

### The failure
- Built on an ARM laptop, pushed as **arm64 only**
- On the amd64 server: **exec format error**

### Producing the other platform
- **Emulation**: simple, but much slower
- **Native nodes**: a builder per architecture, fast
- **Cross-compilation**: fast, if the toolchain supports it
- Python **native wheels** must exist for each architecture`,
  narration:
    "Containers share the host's kernel, and they also share its CPU. An image built for one architecture will not run on another. That used to be rare. Now it is common: a developer on an ARM laptop, deploying to x86 servers. Build there without thinking, push, and the image is arm64 only. On the amd64 server, the container fails at once with exec format error, a message that does not mention architecture at all. The fix is to build for both, and publish them under one tag. docker buildx build with dash dash platform linux amd64 comma linux arm64 builds two images, and pushes an image index: a small list that maps each platform to its own image digest. Inspect it, and you see both entries. When a host pulls the tag, it reads the index and takes the variant that matches. That also means the digest of the tag and the digest of the image a server actually runs are different things, which matters in the delivery chapter. Producing the second platform has three strategies with different costs. Emulation runs the other architecture in software: simple, but much slower. Native nodes give the builder a real machine per architecture. Cross-compilation builds on one machine for another, which is fast where the toolchain supports it. For Python, check that native wheels, and the base image, exist for both.",
}
