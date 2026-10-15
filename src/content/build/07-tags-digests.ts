import type { Section } from '../types'

export const tagsDigests: Section = {
  id: 'tags-digests',
  title: 'Tags, digests, rebuilds and controlled dependency updates',
  scene: 'tags-digests',
  focus: 'p-rebuild',
  slide: `## Tags, digests and updates

A **tag** is a name that can be moved. A **digest** is a hash of the exact content.

### Tags move
- \`python:3.12-slim\` is repointed when the publisher rebuilds
- The same \`FROM\` line can mean **different images** a month apart
- \`latest\` is only a name; it is not guaranteed to be newest
- \`docker pull\` again to see whether a tag has moved

### Digests do not
- Pinning \`@sha256:…\` makes the build **repeatable**
- It also **freezes out** security fixes

### A controlled update
- Rebuild on purpose: bump the pin, rebuild, **test**
- Tag the result and **record its digest**
- Deploy by the **recorded digest**, not by the tag`,
  narration:
    "Images are referred to by name, and the name you usually use, a tag, is less fixed than it looks. A tag such as three point twelve dash slim is a pointer. When the publisher rebuilds the image, for example to include a security fix in the base operating system, they move the tag to the new content. So the same FROM line, built in week one and again in week five, can produce two different images. The tag called latest is nothing special either. It is just a name that someone chose to push to, not a promise of the newest version. A digest is different. It is a hash of the image's exact content, and it cannot be moved. Pinning the base by digest makes the build repeatable: it gives the same result next month as today. But that has a cost. A pinned base never receives fixes on its own, so a pinned image quietly ages. Neither choice is a policy by itself. A controlled update combines them: pin for repeatability, then rebuild on purpose, by moving the pin forward, rebuilding, and testing the result. Give it a new tag, and record the digest of what you tested. That digest is what later chapters will deploy, compare and roll back.",
}
