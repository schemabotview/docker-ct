import type { Section } from '../types'

export const buildSecrets: Section = {
  id: 'build-secrets',
  title: 'Build secret and SSH mounts; preventing credential leakage',
  scene: 'build-secrets',
  focus: 'l-echo',
  slide: `## Secrets during a build

Some builds need a credential: a private package index, a private git repository.

### The secret mount
- \`docker build --secret id=pip_token,src=…\`
- Only a \`RUN\` with \`--mount=type=secret\` can read it
- It appears at \`/run/secrets/pip_token\`, then is **gone**
- No layer, no history entry contains it
- \`env=PIP_TOKEN\` can supply it from a variable instead

### The SSH mount
- \`--ssh default\` forwards your **SSH agent**
- \`git clone\` works; the private key is **never copied in**
- Prefer a **read-only deploy key** for builds

### What it cannot stop
- A command that **prints** it: \`echo\`, \`set -x\`, verbose flags
- A command that **writes** it into a file
- Using \`ARG\` or \`ENV\` instead: both are **recorded**`,
  narration:
    "Chapter three showed the wrong way to give a build a credential: copy it in, delete it later, and leave it sitting in an earlier layer. Here is the right way, and its limits. The catalogue's dependencies include a package from a private index, which needs a token. You pass the token to the build with dash dash secret, naming an id and a source file. In the Dockerfile, only a RUN instruction that declares mount type equals secret with that id can see it. It appears as a file under slash run slash secrets for the duration of that one step, and then it is gone. No layer contains it, and the image history does not record it. Private git repositories work the same way through the SSH mount. Dash dash ssh default forwards your SSH agent into the build, so git clone can authenticate, but the private key itself is never copied into the build at all. Now the limits, which matter as much as the feature. The mount protects the layer. It cannot protect against the command you run. A step that echoes the token, a shell with tracing switched on, or a tool in verbose mode can print it into the build log. A step that writes it into a file or a configuration file puts it straight back into a layer. And passing it as ARG or ENV records it in the image.",
}
