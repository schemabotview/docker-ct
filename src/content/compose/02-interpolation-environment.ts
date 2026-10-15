import type { Section } from '../types'

export const interpolationEnvironment: Section = {
  id: 'interpolation-environment',
  title: 'YAML and interpolation versus environment inside the container',
  scene: 'interpolation',
  focus: 'h-dotenv',
  slide: `## Two moments a value is filled in

A value in \`compose.yaml\` can be resolved **by Compose** or **by the container**. Know which.

### Interpolation, on the host
- \`\${LOG_LEVEL:-info}\` is replaced when Compose **reads the file**
- From a **shell variable**, else the project's \`.env\`, else the default
- \`.env\` feeds the file; it is **not** passed to containers

### Environment, inside the container
- \`environment:\` sets variables the **application** sees
- \`env_file:\` loads a file's variables into the container
- Changing them means **recreating** the container

### Check, carefully
- \`docker compose config\` shows the file **after** interpolation
- Its output can contain **secrets**: do not paste it blindly`,
  narration:
    "Compose files contain two kinds of variable, and they are resolved at different moments, in different places. The first is interpolation. A dollar-brace expression like LOG LEVEL, colon dash, info, is filled in by Compose itself, on the host, at the moment it reads the file. It takes the value from a shell variable if one is set, otherwise from a file called dot env beside compose dot yaml, otherwise from the default after the colon dash. That dot env file exists to feed the Compose file. It is not passed into any container. The second kind is the container's environment: the variables the application actually sees when it runs. The environment key sets them directly. The env file key loads a named file of variables into the container. Here the API ends up with LOG LEVEL set to debug, because the dot env file supplied it during interpolation, and the result was written into the container's environment. Mixing the two up is the source of a lot of confusion, so there is one command worth knowing. docker compose config prints the file exactly as Compose sees it, after interpolation. That makes it the quickest way to check a value. It also means the output can contain passwords and tokens, so read it, but do not paste it into a ticket or a chat without looking first.",
}
