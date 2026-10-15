import type { Section } from '../types'

export const promotionSection: Section = {
  id: 'promotion',
  title: 'Artifact promotion, controlled replacement and release evidence',
  scene: 'promotion',
  focus: 'deploy',
  slide: `## Promotion and controlled replacement

**Promoting** a release moves a **decision**, not new bytes.

### Tag drift
- A \`prod\` tag can be **repointed** by any later push
- The same deploy file then runs **untested** code
- Nothing in **review** shows that anything changed

### Deploy by digest
- Write the **recorded digest** into the production config
- Promotion means changing that one line, in review
- \`pull\` then \`up -d\` replaces only that service
- Check health and a real request **after** replacing

### Release evidence
- **What** was deployed, and what it **replaced**
- The **checks** that ran afterwards, and their results
- **Who** released it, **when**, from which commit
- The previous digest is your **rollback** target`,
  narration:
    "Once an image has passed staging, promoting it to production should move a decision, not new bytes. The common shortcut is a tag called prod, moved to each release. The table shows why that is fragile. On Monday, prod points at the tested digest. On Wednesday, someone pushes a different image with the same tag, perhaps by mistake, and the same deployment file now runs code nobody tested. Nothing in the file changed, so nothing in review caught it. The fix is to deploy by digest. The production Compose file names the image by the digest recorded in the pipeline. Promotion is then a one-line change to that file, made in review like any other change. To replace the running service, pull the pinned digest and run up dash d for that service only; Compose recreates just the API, and the database is untouched. Then write down what happened. Which digest was deployed, and which one it replaced. Which checks ran afterwards, such as the health endpoint and a representative request, and whether they passed. Who released it, when, and from which commit. That record turns the next incident into a lookup instead of an investigation, and the previous digest in it is exactly what you will need if you have to roll back.",
}
