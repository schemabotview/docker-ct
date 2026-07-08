# docker-ct

Video-first content for the **Docker** concept, consumed at runtime by the
[`graphl-movie`](../graphl-movie) app. Content only — notebooks, narration (`.tts` →
`.wav`), authored one-screen slides (`.slide`: a `# Title`, `## ` sub-labels, short prose,
fenced code, and `- `/numbered lists with **bold** key terms), and the wiring
`manifest.json`. Nothing to build or run here. For the authoring contract and folder
layout, see [`CLAUDE.md`](./CLAUDE.md).

This file is the **course outline** — the human-facing map of modules and sections. It is
the plan we author against; the machine source of truth for structure is `manifest.json`
(once authored).

**Status:** scaffolded + scene ported + **full section spine settled** (10 modules × 10 =
**100 sections**, all drafted below and each mapped to a real `dk-*` scene node). The `docker`
scene is **ported into graphl-movie** (`src/scenes/docker.ts`, registered + `catalog.ts`
`docker` concept entry; `npm run build` green). Next step: author each module's sections
(`.ipynb` + `.slide` + `.tts`) one reviewed slice at a time — split from the matching
`../docker-content` notebook — and wire them in `manifest.json`. `audio/` stays empty until
the **owner** generates the `.wav`s from `tts/` via Colab. No sections authored or pushed yet.

## The scene — one dense map, framed per section

Every Docker module rides a **single dense scene**, `docker` (app-owned, ported into
graphl-movie from `../graphl-ux/src/scenes/docker.ts`). It is the whole Docker platform on
one 16:9 map — two bands:

- **TOP (spine):** **Client** (`docker` CLI) → **Docker Host** (Engine daemon stack
  `dockerd → containerd → runc` · Images + Build cache · Containers = namespaces/cgroups +
  Lifecycle) → **Registry**.
- **BOTTOM (detail):** **Author** (Dockerfile · Layer model) · **Resources** (Volumes ·
  Networks · Ports) · **Orchestrate** (Compose · Swarm · Cluster net · Security).

Geometry is the lesson: the daemon stack sits at the center and everything points at the
container it builds, runs, or constrains. Each module frames one band/subsystem of that map
via per-section `focus` (camera) + `highlight` (spotlight in-place, the rest dims), so the
learner keeps one mental model the whole course. **§1 of each module is the hook — the full
map** (no focus), the picture the rest of the module zooms into.

## Module spine (from `../docker-content`)

The source curriculum is the **10-module zero-to-DCA Docker path** in `../docker-content`
(the graphl-ux-era repo, source of truth for the notebook split). The video set keeps all
10 modules, each normalized to **~10 tight teaching sections** (a section = one narrated
slide + scene focus, ≈ one page). The source notebooks run 12–17 `## ` headings each; we
consolidate fine-grained reference beats and drop pure scaffolding to land near ~10.

| # | Module | Source notebook (`../docker-content`) | `## ` in source | Scene | Frames (`dk-*` anchors) |
|---|---|---|---|---|---|
| 01 | Getting Started with Docker | `01-getting-started-with-docker.ipynb` | 12 | `docker` | whole map (hook) → `dk-client` · `dk-host` |
| 02 | Images, Layers & the Dockerfile | `02-images-layers-and-the-dockerfile.ipynb` | 17 | `docker` | `dk-images` · `dk-author` (`dk-dockerfile` · `dk-build-cache` · `dk-layer-model`) |
| 03 | Running & Inspecting Containers | `03-running-and-inspecting-containers.ipynb` | 13 | `docker` | `dk-containers` (`dk-container` · `dk-lifecycle`) + CLI verbs (`dk-ps`/`dk-logs`/`dk-exec`) |
| 04 | Storage, Volumes & Bind Mounts | `04-storage-volumes-and-bind-mounts.ipynb` | 14 | `docker` | `dk-resources` → `dk-volumes` (`dk-vol-named`/`dk-vol-bind`/`dk-vol-tmpfs`) |
| 05 | Networking & Port Publishing | `05-networking-and-port-publishing.ipynb` | 14 | `docker` | `dk-resources` → `dk-networks` (`dk-net-bridge`/`dk-net-host`/…) · `dk-ports` |
| 06 | Docker Compose & Multi-Container Apps | `06-docker-compose-and-multi-container-apps.ipynb` | 14 | `docker` | `dk-orchestrate` → `dk-compose` (`dk-cmp-services`/`dk-cmp-networks`/…) |
| 07 | Registries, Tags & Distribution | `07-registries-tags-and-distribution.ipynb` | 13 | `docker` | `dk-registry` (`dk-hub`/`dk-private` · `dk-tag`/`dk-digest-pin` · push/pull) |
| 08 | Security, Secrets & Hardening | `08-security-secrets-and-hardening.ipynb` | 16 | `docker` | `dk-security` + `dk-container` namespaces (`dk-ns-*`/`dk-caps`/`dk-cgroups`) |
| 09 | Orchestration with Swarm | `09-orchestration-with-swarm.ipynb` | 16 | `docker` | `dk-orchestrate` → `dk-swarm` (`dk-sw-manager`/`dk-sw-worker`/`dk-sw-service`/`dk-sw-task`) · `dk-sw-net` |
| 10 | Install, Configure, Troubleshoot & DCA Prep | `10-install-configure-troubleshoot-and-dca-prep.ipynb` | 15 | `docker` | `dk-engine` daemon stack (`dk-dockerd`/`dk-containerd`/`dk-runc`) → whole-map synthesis |

The "Frames" column is the **intended** wiring (which subsystem of the one `docker` map each
module zooms into) — recorded here to guide section authoring; the authoritative per-section
`focus`/`highlight` lands in `manifest.json`.

## Sections

Each module is normalized to **~10 tight teaching sections**. **§1 is the hook** — it rides
the whole `docker` map (no camera `focus`); §2–N each `focus` one `dk-*` box and `highlight`
the relevant nodes. Merges/drops consolidate the fine-grained source beats.

The full per-module spine is settled below (all 10 modules, 100 sections). Each source
notebook's `## ` headings were consolidated to ~10 tight video sections; the "focus →
highlight" column names the `dk-*` node(s) each section frames. These are the agreed plan;
content is then **authored one reviewed slice at a time** (see the working agreement in
`CLAUDE.md`), and `manifest.json` becomes the machine source of truth once authored.

### 01 — Getting Started with Docker  ⏳ draft (proposed 10)
Establishes "you are here" on the whole map — what Docker is, the client → daemon → image →
container flow, and the first commands.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | What Docker is — and the shape of the whole platform | `01-01-what-docker-is` | **hook** — whole map |
| 2 | Containers vs. virtual machines | `01-02-containers-vs-vms` | `dk-container` → `dk-ns-pid`,`dk-cgroups` |
| 3 | Installing Docker & the daemon | `01-03-install-and-daemon` | `dk-host` → `dk-dockerd` |
| 4 | The client / daemon architecture | `01-04-client-daemon-arch` | `dk-client` → `dk-cli` |
| 5 | Your first container — `docker run` | `01-05-first-run` | `dk-run` → `dk-container` |
| 6 | Images vs. containers | `01-06-images-vs-containers` | `dk-images` → `dk-image` |
| 7 | Pulling from a registry | `01-07-pull-from-registry` | `dk-registry` → `dk-hub` |
| 8 | Listing & inspecting — `ps`, `images` | `01-08-listing-inspecting` | `dk-cli` → `dk-ps` |
| 9 | Container lifecycle — start/stop/rm | `01-09-lifecycle` | `dk-lifecycle` → `dk-start`,`dk-stop`,`dk-rm` |
| 10 | Getting help & the docker CLI shape | `01-10-cli-and-help` | `dk-cli` |

### 02 — Images, Layers & the Dockerfile  ⏳ draft (proposed 10)
Frames the `dk-images` + `dk-author` region — how an image is built, layer by layer, from a
Dockerfile. Source: 16 content `## ` headings consolidated to 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Images, layers & the Dockerfile | `02-01-images-and-layers` | **hook** — whole map |
| 2 | What is an image, really? | `02-02-what-is-an-image` | `dk-images` → `dk-image` |
| 3 | Layers & the union filesystem | `02-03-layers-and-unionfs` | `dk-layer-model` → `dk-unionfs`,`dk-overlay2` |
| 4 | Image references, tags & inspection *(refs + inspect/history + tagging)* | `02-04-image-references` | `dk-image` → `dk-img-tag`,`dk-digest`,`dk-manifest` |
| 5 | The Dockerfile — `FROM` & `RUN` *(meet + FROM + RUN)* | `02-05-dockerfile-from-run` | `dk-dockerfile` → `dk-df-from`,`dk-df-run` |
| 6 | `COPY`, `ADD` & the build context *(+ `.dockerignore`)* | `02-06-copy-and-context` | `dk-dockerfile` → `dk-df-copy` |
| 7 | Config instructions *(WORKDIR/ENV/ARG/EXPOSE/USER/LABEL/HEALTHCHECK)* | `02-07-config-instructions` | `dk-dockerfile` → `dk-df-env`,`dk-df-workdir` |
| 8 | `CMD` vs `ENTRYPOINT` | `02-08-cmd-vs-entrypoint` | `dk-dockerfile` → `dk-df-cmd`,`dk-df-entry` |
| 9 | A real build — Flask app | `02-09-real-build` | `dk-build-cache` → `dk-buildkit` |
| 10 | Multi-stage builds & BuildKit | `02-10-multistage-buildkit` | `dk-build-cache` → `dk-multistage`,`dk-buildkit` |

### 03 — Running & Inspecting Containers  ⏳ draft (proposed 10)
Frames the `dk-containers` band (container + lifecycle) with the `dk-cli` inspection verbs.
Source: 12 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Running & inspecting containers | `03-01-running-containers` | **hook** — whole map |
| 2 | The anatomy of `docker run` | `03-02-docker-run-anatomy` | `dk-cli` → `dk-run` |
| 3 | Foreground, detached & interactive *(-d/-i/-t)* | `03-03-detached-interactive` | `dk-cli` → `dk-run` |
| 4 | Naming, hostname & `--rm` | `03-04-naming-and-rm` | `dk-container` |
| 5 | The container lifecycle *(lifecycle + restart policies)* | `03-05-lifecycle` | `dk-lifecycle` → `dk-create`,`dk-start`,`dk-stop`,`dk-rm` |
| 6 | Resource limits *(limits + `docker update`)* | `03-06-resource-limits` | `dk-container` → `dk-cgroups` |
| 7 | Environment variables *(-e/--env-file)* | `03-07-environment-variables` | `dk-container` |
| 8 | Logs | `03-08-logs` | `dk-cli` → `dk-logs` |
| 9 | Looking inside *(exec/attach/inspect/top/stats/diff)* | `03-09-looking-inside` | `dk-cli` → `dk-exec`,`dk-inspect`,`dk-ps` |
| 10 | Moving files & snapshotting *(docker cp + commit)* | `03-10-cp-and-commit` | `dk-container` → `dk-ns-mnt` |

### 04 — Storage, Volumes & Bind Mounts  ⏳ draft (proposed 10)
Frames the `dk-resources` band → `dk-volumes`, with `dk-layer-model` for the ephemeral
writable layer. Source: 13 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Storage, volumes & bind mounts | `04-01-storage-and-volumes` | **hook** — whole map |
| 2 | Why the container filesystem isn't enough | `04-02-why-not-container-fs` | `dk-layer-model` → `dk-overlay2` |
| 3 | The three mount types | `04-03-three-mount-types` | `dk-volumes` |
| 4 | Named volumes *(named + anonymous + `VOLUME`)* | `04-04-named-volumes` | `dk-volumes` → `dk-vol-named` |
| 5 | Bind mounts | `04-05-bind-mounts` | `dk-volumes` → `dk-vol-bind` |
| 6 | `tmpfs` mounts | `04-06-tmpfs` | `dk-volumes` → `dk-vol-tmpfs` |
| 7 | `-v` vs `--mount` | `04-07-v-vs-mount` | `dk-volumes` |
| 8 | Volume drivers & sharing | `04-08-drivers-and-sharing` | `dk-volumes` → `dk-vol-driver` |
| 9 | Backup, restore & migrate *(+ where data lives)* | `04-09-backup-restore` | `dk-volumes` |
| 10 | Gotchas — UID/GID & the Mac/Windows sync caveat | `04-10-gotchas` | `dk-container` → `dk-ns-user` |

### 05 — Networking & Port Publishing  ⏳ draft (proposed 10)
Frames the `dk-resources` band → `dk-networks` + `dk-ports`. Source: 13 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Networking & port publishing | `05-01-networking` | **hook** — whole map |
| 2 | The networking mental model | `05-02-mental-model` | `dk-networks` |
| 3 | The default `bridge` network | `05-03-default-bridge` | `dk-networks` → `dk-net-bridge` |
| 4 | User-defined bridges & DNS | `05-04-user-bridges-dns` | `dk-networks` → `dk-net-bridge` |
| 5 | The five built-in drivers | `05-05-network-drivers` | `dk-networks` |
| 6 | `host` & `none` modes | `05-06-host-and-none` | `dk-networks` → `dk-net-host`,`dk-net-none` |
| 7 | Publishing ports | `05-07-publishing-ports` | `dk-ports` → `dk-port-publish`,`dk-port-expose` |
| 8 | What `-p` does under the hood | `05-08-p-under-the-hood` | `dk-ports` → `dk-port-publish` |
| 9 | Inspecting & runtime connect/disconnect | `05-09-inspect-and-connect` | `dk-networks` |
| 10 | Advanced — `overlay` & `macvlan`/`ipvlan` | `05-10-overlay-macvlan` | `dk-networks` → `dk-net-overlay` |

### 06 — Docker Compose & Multi-Container Apps  ⏳ draft (proposed 10)
Frames the `dk-orchestrate` band → `dk-compose`. Source: 13 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Docker Compose & multi-container apps | `06-01-compose` | **hook** — whole map |
| 2 | Why Compose | `06-02-why-compose` | `dk-compose` |
| 3 | The `compose.yaml` shape | `06-03-compose-yaml-shape` | `dk-compose` → `dk-cmp-services` |
| 4 | A first compose file — web + db | `06-04-first-compose-file` | `dk-compose` → `dk-cmp-services` |
| 5 | The everyday commands | `06-05-everyday-commands` | `dk-compose` |
| 6 | `build:` vs `image:` | `06-06-build-vs-image` | `dk-compose` → `dk-cmp-services` |
| 7 | Startup order — `depends_on` + healthchecks | `06-07-depends-on-healthchecks` | `dk-compose` → `dk-cmp-depends` |
| 8 | Networks, volumes & environment *(+ `.env`)* | `06-08-networks-volumes-env` | `dk-compose` → `dk-cmp-networks`,`dk-cmp-volumes` |
| 9 | Profiles, overrides & project name | `06-09-profiles-overrides` | `dk-compose` |
| 10 | Scaling & a realistic stack *(Flask + Postgres + Redis)* | `06-10-scaling-real-stack` | `dk-compose` → `dk-cmp-services` |

### 07 — Registries, Tags & Distribution  ⏳ draft (proposed 10)
Frames the `dk-registry` column. Source: 12 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Registries, tags & distribution | `07-01-registries` | **hook** — whole map |
| 2 | What a registry actually is | `07-02-what-a-registry-is` | `dk-registry` → `dk-reg-stores` |
| 3 | Docker Hub & the alternatives | `07-03-hub-and-alternatives` | `dk-registry` → `dk-hub`,`dk-private` |
| 4 | The push/pull workflow | `07-04-push-pull-workflow` | `dk-reg-dist` → `dk-reg-push`,`dk-reg-pull` |
| 5 | Authentication | `07-05-authentication` | `dk-registry` |
| 6 | Image references & tagging in practice | `07-06-references-and-tagging` | `dk-reg-identity` → `dk-tag` |
| 7 | Manifests, digests & multi-arch *(manifests/digests + manifest lists)* | `07-07-manifests-digests` | `dk-reg-identity` → `dk-digest-pin` |
| 8 | Running a local registry | `07-08-local-registry` | `dk-registry` → `dk-private` |
| 9 | Mirroring & pull-through caching | `07-09-mirroring-caching` | `dk-registry` → `dk-private` |
| 10 | Garbage collection & image scanning | `07-10-gc-and-scanning` | `dk-security` → `dk-sec-scan` |

### 08 — Security, Secrets & Hardening  ⏳ draft (proposed 10)
Frames the `dk-security` block with the `dk-container` kernel primitives (`dk-ns-*`/`dk-caps`).
Source: 15 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Security, secrets & hardening | `08-01-security` | **hook** — whole map |
| 2 | The container threat model *(+ kernel primitives revisited)* | `08-02-threat-model` | `dk-container` → `dk-ns-pid`,`dk-cgroups` |
| 3 | The "root in container" problem & running as non-root | `08-03-root-problem` | `dk-container` → `dk-ns-user` |
| 4 | User-namespace remapping & rootless Docker | `08-04-userns-rootless` | `dk-security` → `dk-sec-rootless` |
| 5 | Linux capabilities | `08-05-capabilities` | `dk-security` → `dk-sec-capsdrop` |
| 6 | Seccomp profiles | `08-06-seccomp` | `dk-security` → `dk-sec-seccomp` |
| 7 | AppArmor & SELinux | `08-07-apparmor-selinux` | `dk-security` → `dk-sec-apparmor` |
| 8 | Read-only rootfs & `no-new-privileges` | `08-08-readonly-nonewprivs` | `dk-security` → `dk-sec-readonly` |
| 9 | Secrets *(and why env vars aren't secret)* | `08-09-secrets` | `dk-security` → `dk-sec-secrets` |
| 10 | Supply-chain — signing, SBOMs & the hardened service | `08-10-supply-chain` | `dk-security` → `dk-sec-sbom`,`dk-sec-scan` |

### 09 — Orchestration with Swarm  ⏳ draft (proposed 10)
Frames the `dk-orchestrate` band → `dk-swarm` + `dk-sw-net`. Source: 15 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Orchestration with Swarm | `09-01-orchestration` | **hook** — whole map |
| 2 | Why orchestration & Swarm vs Kubernetes | `09-02-why-orchestration` | `dk-orchestrate` → `dk-swarm` |
| 3 | Swarm architecture *(+ initialising a cluster)* | `09-03-swarm-architecture` | `dk-swarm` → `dk-sw-manager`,`dk-sw-worker` |
| 4 | Services, not containers *(+ service lifecycle)* | `09-04-services` | `dk-swarm` → `dk-sw-service`,`dk-sw-task` |
| 5 | Rolling updates & rollback | `09-05-rolling-updates` | `dk-swarm` → `dk-sw-service` |
| 6 | Overlay networks & the routing mesh | `09-06-overlay-routing-mesh` | `dk-sw-net` → `dk-sw-overlay-net`,`dk-sw-mesh` |
| 7 | Service discovery & DNS | `09-07-service-discovery` | `dk-sw-net` → `dk-sw-overlay-net` |
| 8 | Stacks — Compose in cluster form | `09-08-stacks` | `dk-swarm` → `dk-sw-service` |
| 9 | Secrets, configs & placement | `09-09-secrets-placement` | `dk-swarm` → `dk-sw-task` |
| 10 | Node management & the realities of Swarm in 2026 | `09-10-nodes-and-realities` | `dk-swarm` → `dk-sw-manager`,`dk-sw-worker` |

### 10 — Install, Configure, Troubleshoot & DCA Prep  ⏳ draft (proposed 10)
Frames the `dk-engine` daemon stack (`dk-dockerd`/`dk-containerd`/`dk-runc`), then tours the
whole map as troubleshooting playbooks + exam prep. Source: 14 content headings → 10.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Install, configure & DCA prep | `10-01-install-and-dca` | **hook** — whole map |
| 2 | Installing Docker Engine & post-install | `10-02-install-and-post-install` | `dk-host` → `dk-dockerd` |
| 3 | Rootless Docker install | `10-03-rootless-install` | `dk-security` → `dk-sec-rootless` |
| 4 | The daemon configuration — `daemon.json` | `10-04-daemon-config` | `dk-engine` → `dk-dockerd` |
| 5 | Storage & logging drivers | `10-05-storage-logging-drivers` | `dk-layer-model` → `dk-overlay2` |
| 6 | The runtime layer — `containerd`, `runc` & alternatives | `10-06-runtime-layer` | `dk-engine` → `dk-containerd`,`dk-runc` |
| 7 | Daemon troubleshooting | `10-07-daemon-troubleshooting` | `dk-engine` → `dk-dockerd` |
| 8 | Container & build troubleshooting playbook | `10-08-container-build-troubleshooting` | `dk-build-cache` → `dk-buildkit` |
| 9 | Network troubleshooting | `10-09-network-troubleshooting` | `dk-networks` → `dk-net-bridge` |
| 10 | The DCA exam, prep tactics & where to go next | `10-10-dca-exam-prep` | whole-map synthesis (no focus) |

**Total:** 100 sections (10 modules × 10). Every `focus`/`highlight` targets a node that
exists in the ported `docker` scene (`dk-*` ids in `../graphl-movie/src/scenes/docker.ts`).
