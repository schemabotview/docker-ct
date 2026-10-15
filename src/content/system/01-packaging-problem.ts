import type { Section } from '../types'

export const packagingProblem: Section = {
  id: 'packaging-problem',
  title: 'Dependencies, drift and the limits of packaging',
  scene: 'packaging-limits',
  focus: 'image',
  slide: `## Why package an application?

An application is more than its code. It also needs a **runtime**, **libraries**, **OS packages** and **settings**, and each of those can differ between machines.

### Environment drift
- Copy only the code and the server supplies everything else
- Months later its runtime and libraries no longer match
- The same commit then fails in a way the laptop cannot reproduce

### What an image fixes
- Code, runtime, libraries and start command are **packaged once**
- Every machine runs that same artifact
- Builds and updates become deliberate changes

### What it does not carry
- The **Linux kernel** and **CPU architecture** still come from the host
- **Data** and **secrets** stay outside the image`,
  narration:
    "Here is the problem Docker was built to solve. An application is never just its code. To run, it also needs a language runtime, a set of libraries, some operating system packages, and a handful of settings. On your laptop all of those happen to line up. Now copy only the code to a server. The server supplies everything else from whatever it has installed, and months later its runtime is older, its libraries resolved to different versions, and a system library the database driver needs is missing. The same commit fails, and nothing on your laptop reproduces it. That gap is called environment drift. An image closes most of it. The code, the runtime, the libraries and the start command are packaged once, and every machine runs that same artifact, so an update becomes a deliberate rebuild instead of something that happens to you. But be precise about the limit. An image does not contain a kernel. The container uses the host's Linux kernel, and it must match the host's CPU architecture. And the application's data and secrets deliberately stay outside the image. Keep those four in mind: they come back in nearly every chapter.",
}
