import type { Section } from '../types'

export const exitSignalsShutdown: Section = {
  id: 'exit-signals-shutdown',
  title: 'Exit status, signals, PID 1 and graceful shutdown',
  scene: 'stop-signals',
  focus: 'ignored',
  slide: `## Stopping, and reading the result

\`docker stop\` asks first and forces later.

### The stop sequence
- **SIGTERM** goes to PID 1: finish up and exit
- A **grace period** follows (10 seconds by default)
- Still running? **SIGKILL** ends it immediately
- \`docker kill\` skips straight to **SIGKILL**

### Why PID 1 is special
- The kernel ignores a signal PID 1 has **no handler** for
- A **shell wrapper** as PID 1 may not pass SIGTERM on
- Either way, every stop waits out the grace period
- \`docker run --init\` adds a small init that forwards signals

### Reading exit codes
- **0** — finished successfully, like a batch job
- **1** (or other) — the application reported failure
- **143** / **137** — ended by SIGTERM / SIGKILL`,
  narration:
    "Stopping a container is a conversation, not a switch. docker stop first sends the signal SIGTERM to the main process, process one. It means: finish what you are doing and exit. A well-behaved service stops taking new requests, completes the ones in flight, and exits. If the process is still running after a grace period, ten seconds by default, Docker sends SIGKILL, which ends it immediately with no chance to clean up. Process one has one surprise. The kernel does not apply default signal behaviour to process one, so if the application has no handler for SIGTERM, the signal is simply ignored. The same happens when a shell script is process one and does not pass the signal on to the real application. Either way, every stop waits out the full grace period and ends in a kill. Running the container with dash dash init puts a tiny init process in front as process one, and it forwards signals properly; the next chapter shows the cleaner fix in the image itself. Afterwards, the exit code tells you what happened. Compare three containers. A batch job that finished its work exits with zero. Our API crashing at start-up exits with one, the application's own failure code. And the API we stopped exits with one hundred and forty three, meaning SIGTERM ended it, or one hundred and thirty seven, meaning SIGKILL did. Same command, three very different stories.",
}
