import type { Section } from '../types'

export const pushPullDigests: Section = {
  id: 'push-pull-digests',
  title: 'Push, pull, image digests and platform-specific identity',
  scene: 'digests',
  focus: 'record',
  slide: `## Three references, one release

A multi-platform release has **more than one** digest. Know which one you mean.

### What push and pull report
- \`docker push\` prints the digest of what it uploaded
- \`docker pull …@sha256:…\` fetches **exactly** that content
- A tag pulled twice can return **different** images
- \`docker image inspect\` shows an image's **repo digests**

### Index digest and platform digest
- The tag points at an **index** with its own digest
- Each platform image inside has **its own** digest
- A server runs the **platform** image that matches it

### What to record
- **Deploy** by the index digest: one reference, every platform
- **Record** the platform digest of what actually ran
- Both are **hashes**: copying them by hand invites typos`,
  narration:
    "When you push an image, the registry reports a digest: a hash that names exactly what was uploaded. Pull by that digest, with an at sign, and you get exactly that content, every time, from any machine. Pull by a tag twice, a week apart, and you may get two different images, because the tag can be moved. For a multi-platform release there is one more layer, introduced in chapter seven. The tag one point four point zero points at an image index, and the index has its own digest. Inspect it, and the index lists one image per platform, each with a different digest of its own. When an amd64 server pulls the release, it reads the index and runs the amd64 image, whose digest is not the index digest. So which do you write down? Both have a job. Deploy by the index digest. It is one stable reference that works on every platform the release supports, and it can never be repointed. Then record the platform digest of what actually ran on each host. When you later compare a running container with a vulnerability report, or prove what was in production last Tuesday, that platform digest is the precise answer.",
}
