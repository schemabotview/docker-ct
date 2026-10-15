import type { Section } from '../types'

export const buildContext: Section = {
  id: 'build-context',
  title: 'Build context, file selection and .dockerignore',
  scene: 'build-context',
  focus: 'ignore',
  slide: `## What the builder receives

The \`.\` in \`docker build .\` is the **build context**: the files the builder may use.

### How it works
- The context is sent to the builder **before** any instruction runs
- \`COPY\` can only read files that are **in the context**
- A large context slows every build
- \`-f\` can name a Dockerfile elsewhere; the context is still \`.\`

### \`.dockerignore\` decides what goes
- Exclude history, tests and local caches
- Exclude **credentials**: \`.env\`, keys, tokens
- What is never sent can never be copied by accident
- Patterns match paths **relative to the context root**

### A habit
- Keep the context to what the **image needs to run**
- Watch the context size reported as the build starts`,
  narration:
    "Every build starts before the first line of the Dockerfile runs. The dot at the end of docker build dot names the build context: the set of files the builder is allowed to use. The context is gathered and sent to the builder first, and the instructions can only read from it. COPY cannot reach anything outside it. Look at the project folder. It contains what the image needs, the Dockerfile, the source and the dependency list. It also contains things it does not need: the git history, which can be large, and the tests. And it contains one file it must never contain: a dot env file holding the database password. A file called dot dockerignore filters the context, in the same spirit as a gitignore. Each pattern removes matching files before anything is sent. After filtering, the builder receives only the Dockerfile, the source and the dependency list. That is faster, because less is transferred, and safer, because a file that was never sent cannot be copied into the image by a careless instruction later. The habit worth forming is to treat the context as part of the design: it should hold what the image needs to run, and nothing else.",
}
