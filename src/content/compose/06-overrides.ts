import type { Section } from '../types'

export const overrides: Section = {
  id: 'overrides',
  title: 'Overrides and development versus production configuration',
  scene: 'overrides',
  focus: 'dev',
  slide: `## One base, two environments

Keep what every environment shares in \`compose.yaml\`. Put the **differences** in override files.

### Development
- \`compose.override.yaml\` is merged **automatically** if present
- Add the bind-mounted source, \`--reload\`, debug logging

### Production
- Name the files: \`-f compose.yaml -f compose.prod.yaml\`
- The development override is then **not read**
- A pinned, tested image; no source mount; a restart policy
- Keep secrets and host paths **out** of the base file

### Merging
- Later files **override or extend** earlier ones
- Some settings replace, others combine: **don't guess**
- \`docker compose … config\` shows the **merged** result`,
  narration:
    "The same application runs differently on a laptop and on a server, and copying the whole Compose file for each environment guarantees the copies drift apart. The better pattern is one base file plus small override files. The base, compose dot yaml, holds what every environment shares: the services, the health checks and dependencies, the volume. For development, a file called compose dot override dot yaml is special: when it exists beside the base file, Compose merges it in automatically. That is where development conveniences go: the bind-mounted source from the storage chapter, the reload command, debug logging. For production, you name the files explicitly with dash f, the base and then compose dot prod dot yaml. When you name files yourself, the automatic override is not read, so none of the development conveniences leak into production. The production file adds what production needs: an image pinned to a tested version instead of a build, no source mount, and a restart policy. Merging has rules. Later files override or extend earlier ones, but different settings merge differently: some values are replaced, others are combined. Rather than predicting the result, ask for it. docker compose config, with the same dash f flags, prints exactly what will run.",
}
