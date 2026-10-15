import type { Section } from '../types'

export const layeredDiagnosis: Section = {
  id: 'layered-diagnosis',
  title: 'Layered diagnosis across process, storage and network boundaries',
  scene: 'layered',
  focus: 'oom',
  slide: `## Diagnosis by layer

Start from the symptom, collect the **first evidence**, and let it name the layer.

### Four failures
- Exits at start-up: a **traceback** in the logs, the app's own code
- Killed under load: exit 137 **and** \`OOMKilled\`: memory
- Writes fail: **no space left on device**: storage
- Every query fails: **connection refused**: network or database

### One exit code proves little
- 137 means SIGKILL, from **anything**
- Check \`OOMKilled\` before blaming memory

### Slow is not one thing
- **CPU at the cap**, everything slow: throttling
- **CPU low**, database pages slow: the database
- Form a hypothesis, then **test** it with one change`,
  narration:
    "When something goes wrong, the temptation is to start changing settings. A better habit is to let the first piece of evidence tell you which layer to look at. The table shows four classic failures. A container that exits at start-up with a traceback in its logs has an application problem, in its code or configuration. A container killed under load, with exit code one three seven and OOM killed set to true, hit its memory limit. Writes failing with no space left on device point to storage. And every request failing with connection refused to the database points to the network, or to the database itself. One of these needs care. Exit code one three seven only means the process received SIGKILL, and many things send SIGKILL, including docker stop when the grace period runs out. So check the OOM killed field before blaming memory. The terminal shows two containers with the same exit code and different causes. Not every problem is a crash. If the API is slow, look at CPU. At its cap, with everything slow, it is being throttled. Low, with only the pages that query the database slow, the database is the bottleneck. Either way, form a hypothesis and test it with one change, not five.",
}
