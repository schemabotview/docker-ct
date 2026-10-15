import type { Section } from '../types'

export const registryAddresses: Section = {
  id: 'registry-addresses',
  title: 'Registry addresses, repositories, tags and authentication',
  scene: 'reference-anatomy',
  focus: 'p-default',
  slide: `## Anatomy of an image reference

An image reference is an **address**. Every part means something.

### Reading it left to right
- **Registry host**: where the image lives, with an optional port
- **Namespace** and **repository**: whose image, which line
- **Tag**: a movable name; **digest**: the exact content

### The short forms
- \`postgres:16\` means \`docker.io/library/postgres:16\`
- No tag at all means \`:latest\`, which is **only a name**
- Write the full address for anything you **deploy**
- Private registries are just **other hosts**

### Proving who you are
- \`docker login\` stores a credential for that registry
- Prefer a **credential helper** over a plain-text file
- CI uses a **short-lived token** with only the rights it needs`,
  narration:
    "Delivery starts with knowing exactly what an image reference says. Read it left to right. First the registry host, here registry dot example, with an optional port: the server where the image lives. Then a namespace, usually a team or organisation, and a repository, one line of images such as the catalogue API. Then either a tag, after a colon, or a digest, after an at sign. From earlier chapters you know the difference: a tag is a movable name, and a digest identifies exact content. Short forms hide several of these parts. postgres colon sixteen really means docker dot io, slash library, slash postgres, colon sixteen: the default registry and the namespace for official images. Leave off the tag entirely and you get latest, which is only a name somebody chose to push to. For anything you deploy, write the full address, so nobody has to guess which registry was meant. Pushing and pulling private images needs authentication. docker login stores a credential for one registry. Where it is stored matters: a credential helper keeps it in the operating system's keychain rather than in a plain text file in your home directory. In automation, use a short-lived token from the CI system's secret store, with only the rights the job needs.",
}
