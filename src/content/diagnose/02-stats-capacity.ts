import type { Section } from '../types'

export const statsCapacity: Section = {
  id: 'stats-capacity',
  title: 'Container statistics and shared host or Desktop VM capacity',
  scene: 'stats',
  focus: 'k-hot',
  slide: `## Reading docker stats

\`docker stats\` shows live use per container. Read it against **the limits**.

### The columns
- **CPU %**: 100% is one full core; 250% is two and a half
- **MEM USAGE / LIMIT**: with no limit, the limit shown is the total
- **PIDS**: processes and threads
- \`--no-stream\` prints once, for a record

### What this sample says
- The API is at **90%** of its memory limit: a kill is close
- Its CPU is at its **cap**: requests will be slower

### Whose capacity is it?
- Every container shares **one host**
- On Desktop, the limit is the **VM's** memory and CPUs
- Limits can add up to **more than exists**
- Compare the sum with the host's **real** capacity`,
  narration:
    "docker stats shows live resource use for each running container. The useful skill is reading it against the limits from the previous section. CPU percent counts cores, so one hundred percent means one full core and two hundred and fifty means two and a half. Memory usage is shown against a limit. If you set none, the limit column shows the total memory available, which can make an unlimited container look harmless right up until it is not. PIDS counts processes and threads. Dash dash no stream prints a single snapshot, which is what you want when recording evidence. Now read the sample. The API is using ninety percent of its two hundred and fifty six megabyte limit; one busy moment and the out-of-memory killer will end it. Its CPU is at almost exactly one core, which is its cap, so it is being throttled and requests will be slow. The database is comfortable. Finally, remember whose capacity this is. Every container shares one host. On Docker Desktop, the host is the Linux virtual machine, with its own fixed share of memory and CPUs, so the numbers are relative to that, not to your laptop. And limits are promises, not reservations: they can add up to more than the machine actually has.",
}
