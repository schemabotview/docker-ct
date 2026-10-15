import type { Scene } from '@graphlearning/flow'

// §6 — the first three read-only commands, and the two failures they tell apart. The output is
// ILLUSTRATIVE (no version is asserted; the plan records none), trimmed to the lines worth reading.
// The cards below say what each line answers, and the two warn cards are the contrast the
// plan asks for: a daemon that is not running versus a CLI pointed at the wrong daemon.
export const firstObservations: Scene = {
  id: 'first-observations',
  title: 'First observations',
  flow: 'TB',
  nodes: [
    {
      id: 'terminal',
      kind: 'code',
      filename: 'terminal — illustrative output',
      label: `$ docker context show
default

$ docker version
Client:
 Version:      <client version>
 Context:      default
Server:
 Engine:
  Version:     <engine version>
  OS/Arch:     linux/arm64

$ docker info
 Server Version: <engine version>
 Containers: 3
  Running: 1
  Stopped: 2
 Images: 5
 Operating System: <host or Desktop VM>
 Architecture: aarch64
 Docker Root Dir: /var/lib/docker

$ docker --context build-box ps
Cannot connect to the Docker daemon …`,
    },
    {
      id: 'reading',
      label: 'What each line answers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ans-context', label: 'Which daemon?', sub: 'context show', pattern: 'user', icon: 'link' },
        { id: 'ans-versions', label: 'Which versions?', sub: 'client and server, separately', pattern: 'service', icon: 'tag' },
        { id: 'ans-arch', label: 'Which platform?', sub: 'OS/Arch of the engine', pattern: 'service', icon: 'cpu' },
        { id: 'ans-state', label: 'What exists?', sub: 'counts, root dir', pattern: 'storage', icon: 'search' },
      ],
    },
    {
      id: 'failures',
      label: 'Two failures, one message',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'fail-daemon', label: 'Daemon down', sub: 'Server section missing', pattern: 'warn', icon: 'power' },
        { id: 'fail-context', label: 'Wrong context', sub: 'reachable, but not the host you meant', pattern: 'warn', icon: 'circleslash' },
      ],
    },
  ],
  edges: [
    { source: 'terminal', target: 'reading', label: 'read it as' },
    { source: 'terminal', target: 'failures', label: 'when it fails', dashed: true },
  ],
}
