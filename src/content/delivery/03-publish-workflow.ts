import type { Section } from '../types'

export const publishWorkflow: Section = {
  id: 'publish-workflow',
  title: 'Build, application verification and publish workflow',
  scene: 'publish-pipeline',
  focus: 's-request',
  slide: `## Build, verify, publish, record

A pipeline should publish only what it has **shown to work**.

### The steps, in order
- **Build**, tagged with the source commit
- **Start** it and wait for the health endpoint
- Make a **representative request**; check it
- **Push** only if both checks passed
- **Record** the digest as evidence

### Why the order matters
- A failed check stops the job **before** anything is published
- The registry then holds only images that started and answered
- The commit tag links every image to its **source**

### Keep it honest
- Clean up the test container, pass or fail
- Checks prove a **floor**, not that the release is perfect`,
  narration:
    "A delivery pipeline turns a commit into a published image, and its most important property is what it refuses to publish. Here is an illustrative one, written as a plain shell script rather than for any particular CI product. It stops at the first failure. It builds the image and tags it with the commit hash, so every image can be traced to its source. It then starts the image, binding the test port to the loopback address, and waits for the health endpoint to answer. Starting is not enough, so it makes a representative request, listing items, and checks that the response actually contains data. Only if both checks pass does it push the image, and the last step records the digest that was published, as evidence for later. The order is the safety. If the container fails to start, or answers with an error, the job stops before the push, and the registry never sees the broken image. Everything in the registry has, at minimum, started and answered a real request. Two honest notes. Clean up the test container whether the checks pass or fail. And remember these checks prove a floor, not perfection: they catch an image that cannot start or serve, not every bug the release might contain.",
}
