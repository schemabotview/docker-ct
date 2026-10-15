import type { Section } from '../types'

export const sbomProvenanceRotation: Section = {
  id: 'sbom-provenance-rotation',
  title: 'SBOMs, provenance, credential exposure response and secret rotation',
  scene: 'supply-chain',
  focus: 'r-revoke',
  slide: `## Evidence about an image, and a bad day

### SBOM: what is inside
- A **software bill of materials** lists packages and versions
- It answers "are we affected?" when a new issue appears
- It does **not** show that anything is safe
- Generate it **at build time**, beside the image

### Provenance: how it was built
- Records the **source commit**, the builder and its parameters
- A claim is only as good as its **verified producer**
- Unsigned or unknown evidence **proves nothing**

### When a credential is exposed
- **Revoke** it at the issuer first, then **rotate**
- Find **every use**, including images that baked it in
- Rebuild, redeploy, and review logs for misuse
- Deleting the image is **not** revocation: copies exist`,
  narration:
    "Two kinds of evidence travel with a well-built image. A software bill of materials, or SBOM, is an inventory: every package and version inside the image. Its value appears on the day a new vulnerability is announced. Instead of guessing, you search your SBOMs and know within minutes which images contain the affected version. An SBOM says what is inside; it does not say that any of it is safe. Provenance records how the image was built: which source repository and commit, which builder, which parameters. It lets you trace a running image back to the code that produced it. Both are claims, and a claim is only as good as its producer. Evidence attached by an unknown party proves nothing, so the producer's identity has to be verified; the exact tools for doing that belong to their own documentation. Now the bad day. A credential has been exposed, perhaps pushed in an image layer, perhaps printed in a build log. The order matters. Revoke it at the issuer first, so it stops working. Then rotate: issue a new one and deliver it the right way. Find every place the old one was used, including images that baked it in, rebuild and redeploy them, and check the logs for misuse. Deleting the image is not on this list, because copies already exist in caches, registries and pulls.",
}
