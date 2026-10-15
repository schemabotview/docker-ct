import type { Section } from '../types'

export const environmentConfig: Section = {
  id: 'environment-config',
  title: 'Environment-specific configuration and runtime secret separation',
  scene: 'env-config',
  focus: 'r-rebuild',
  slide: `## One artifact, many environments

Build **once**. Let each environment **configure** the same image.

### What stays the same
- The image, identified by its **digest**
- The code and libraries that were **tested**

### What each environment supplies
- Database address and log level, as **environment**
- Its **own secrets**, as runtime secret files
- How it is published: ports, proxy, networks

### The anti-pattern
- Rebuilding per environment to bake values in
- Each rebuild is a **new, untested** artifact
- Secrets baked in leak into **every** copy of the image

### The check
- Staging and production run the **same digest**`,
  narration:
    "A tested image is valuable precisely because it was tested, so the aim is to run that same image everywhere. Build once, then let each environment configure it. Look at what stays the same: the image, identified by its digest, and therefore every line of code and every library that passed the checks in the pipeline. Look at what changes. Staging and production use different databases, different log levels, and different ways of being published. All of that is runtime configuration, supplied as environment variables and settings, exactly as chapter three separated build time from run time. Each environment also has its own secrets, supplied at run time as secret files, never shared between environments and never inside the image. The anti-pattern is tempting: rebuild the image for each environment, baking in the production database address. But every rebuild produces a new artifact that nobody tested. The base image may have moved, a dependency may have resolved differently, and if a secret was baked in, it now leaks into every copy of that image, in every registry and cache. So here is a simple check worth automating. The digest running in staging and the digest running in production should be identical. If they differ, production is running something staging never ran.",
}
