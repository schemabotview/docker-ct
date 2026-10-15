import type { Section } from '../types'

export const runbookSection: Section = {
  id: 'runbook',
  title: 'Maintenance, controlled release and recovery runbooks',
  scene: 'runbook',
  focus: 'd-fail',
  slide: `## A release runbook

A **runbook** is the procedure, written down before it is needed, with its **decision points**.

### Before
- Staging ran the **same digest** and passed
- A backup was **restored** this week
- The **previous digest** is written down

### Release
- Pin the new digest; \`pull\` and \`up -d\` the **API only**
- Check **health** and a **real request**

### Decide by the evidence
- Pass: **record** the release, keep watching for an hour
- Fail: **roll back** to the previous digest, then investigate

### Maintenance, on a calendar
- Weekly rebuild on a **patched base**; review findings
- Monthly, **timed** restore drill`,
  narration:
    "A runbook is the procedure written down before it is needed, so that a release, or a recovery, does not depend on memory or on who is on call. Here is a release runbook for the catalogue, followed through once. Before anything changes, three prerequisites are checked: staging ran this exact digest and passed; a backup was restored successfully this week; and the previous digest is written down. If any of these fails, the release waits. The release itself is short. Pin the new digest in the production Compose file, pull it, and run up dash d for the API only, leaving the database untouched. Then check the health endpoint and make a real request. Now the decision point, which is the reason runbooks exist. If the checks pass, record the release and keep watching for an hour. If they fail, do not improvise: roll back to the previous digest first, restore service, and investigate afterwards. Because the release did not change the schema, that rollback is safe, which was itself checked beforehand. Maintenance belongs on a calendar too. Every week, rebuild on the patched base image with pull, and review the new scanner findings. Every month, run a timed restore drill. Problems found by a schedule are much cheaper than problems found by an outage.",
}
