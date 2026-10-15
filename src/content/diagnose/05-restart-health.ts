import type { Section } from '../types'

export const restartHealth: Section = {
  id: 'restart-health',
  title: 'Restart policies, health status and failure loops',
  scene: 'restart',
  focus: 'r-unhealthy',
  slide: `## Restart policies and health

A **restart policy** acts when the main process **exits**. A **health check** only **reports**.

### Restart policies
- \`no\` is the default: nothing restarts
- \`on-failure\` restarts after a non-zero exit, up to a limit
- \`unless-stopped\` survives daemon restarts, not your \`stop\`
- \`always\` revives **stopped** ones on daemon restart

### A restart loop
- Status shows **Restarting**; \`RestartCount\` keeps climbing
- Docker waits **longer** between attempts
- Restarting cannot fix a bad config: **read the logs**

### Running but unhealthy
- The process is up; the health check is failing
- Plain Docker **reports** it and **does not restart** it
- Acting on health needs **you**, or an orchestrator`,
  narration:
    "Two mechanisms are often confused here: restart policies and health checks. A restart policy decides what happens when the container's main process exits. The default is no, so nothing restarts. On failure restarts after a non-zero exit, optionally up to a maximum count. Always restarts after any exit and when the daemon itself starts. Unless stopped behaves the same, except that it respects a container you stopped deliberately. Restart policies are good at recovering from a crash that will not happen again. They are bad at hiding a crash that happens every time. The terminal shows the result: a container whose status reads restarting, with a restart count of seventeen and climbing. Docker waits a little longer between each attempt, but the cause, perhaps a missing setting, is still there. Read the logs before anything else. The other line is more surprising. The database is up, but unhealthy: its health check has been failing for a while. Plain Docker reports that status and does nothing about it. It does not restart an unhealthy container. Health checks feed decisions: depends on conditions in Compose, your monitoring, or an orchestrator that is designed to replace unhealthy instances. Without one of those, acting on health is your job.",
}
