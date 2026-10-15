import type { Section } from '../types'

export const cacheInvalidation: Section = {
  id: 'cache-invalidation',
  title: 'Cache invalidation, dependency ordering and rebuild traces',
  scene: 'cache-trace',
  focus: 'r-chain',
  slide: `## Reading a rebuild trace

The build log says, step by step, what was **reused** and what **ran**.

### How the cache decides
- A step is reused if it and its **inputs** are unchanged
- A \`COPY\` checks the **content** of the files it copies
- One miss reruns **every step after it**

### The two edits compared
- Source edit: only the final \`COPY\` runs
- Dependency edit: \`pip install\` and everything after it rerun
- This is why the dependency list is copied **first**

### When cached is wrong
- \`RUN apt-get update\` is reused, so updates **never arrive**
- \`--pull\` checks for a newer **base image**
- \`--no-cache\` reruns every step, deliberately
- Rebuild on a **schedule**, then compare digests`,
  narration:
    "Chapter three promised to explain why the order of a Dockerfile matters. The build log is the evidence. Here is the same Dockerfile rebuilt after two different edits. On the left, we changed one line of application source. Every step up to the last is marked cached, and only the final COPY ran, in a fraction of a second. On the right, we changed the dependency list. The COPY of that file now has different content, so it runs, and because one step missed, every step after it reruns too, including a forty second install. That is the rule. A step is reused when the instruction and its inputs are unchanged. For COPY, the input is the actual content of the files being copied, not their timestamps. And a single miss invalidates the rest of the build. So put the things that change rarely first, and the things that change often last. The cache can also be wrong in a quieter way. A RUN that updates package indexes looks identical every time, so it is reused, and new security updates never arrive. Freshness must be deliberate. Dash dash pull checks the registry for a newer base image. Dash dash no cache reruns every step. Use them on a schedule, not by accident.",
}
