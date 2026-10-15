import type { Section } from '../types'

export const cacheMounts: Section = {
  id: 'cache-mounts',
  title: 'Cache mounts and reusable caches in CI',
  scene: 'cache-mounts',
  focus: 'c-fresh',
  slide: `## Cache mounts and CI caches

The layer cache is all or nothing. Two other caches cover what it cannot.

### Cache mounts
- \`RUN --mount=type=cache,target=/root/.cache/pip\`
- When the step **does** rerun, downloads are reused
- The cache stays in the builder, **never** in the image
- Removing builder cache only costs **time** on the next build

### Exported caches for CI
- A fresh CI runner starts with an **empty** builder
- \`--cache-to\` saves the cache to a registry or CI cache
- \`--cache-from\` lets the next job **start warm**
- \`mode=max\` also keeps intermediate stages
- GitHub Actions has its own backend: \`type=gha\`

### Two rules
- A cold build must still **work**: caches only save time
- Import caches only from a source **you control**`,
  narration:
    "The layer cache is all or nothing: a step is either reused completely or run again from scratch. When the dependency list changes, the install step reruns and downloads every package again, even the ninety percent that did not change. A cache mount fixes that. Adding mount type equals cache to a RUN gives the step a directory, here pip's own download cache, that persists in the builder across builds. When the step reruns, pip finds most packages already downloaded. The cache directory is never part of the image, so it costs nothing at run time. Continuous integration adds a different problem. Many CI systems give each job a fresh machine, which means a fresh, empty builder and no layer cache at all. Every build starts cold. Exported caches solve it. Dash dash cache to writes the build cache somewhere durable, such as a registry reference or the CI system's own cache service, and dash dash cache from lets the next job import it and start warm. Mode equals max includes the intermediate build stages too. Two rules keep this honest. Caches only save time: a completely cold build must still produce a correct image. And only import caches from a location you control, because a cache is build input, and anyone who can write to it can influence what you ship.",
}
