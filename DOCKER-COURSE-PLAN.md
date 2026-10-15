# Docker — From Container Foundations to Reliable Application Delivery

## Audience and prerequisites

For learners new to Docker with basic terminal, file, process, and HTTP familiarity. Introduce permissions, ports, DNS, and YAML where first needed. The Linux course is a useful companion, but completing it is not required. Supply the application code and explain its interface so programming knowledge does not become a hidden prerequisite.

Scope: Linux containers using Docker Engine or Docker Desktop, Docker CLI, the `docker compose` plugin, and BuildKit/Buildx. Cover container execution, image construction, state, networking, composition, advanced builds, security, registries, delivery, and diagnosis. This is a general course independent of certifications. Following worked examples is optional; paid deployment, submitted assessments, and learner monitoring are not required.

Reference environment: rolling official Docker documentation inspected on **2026-10-15**. No specific Engine/Desktop release is asserted and no local Docker execution was verified. Detailed lessons must record the Engine, Desktop where applicable, Compose, Buildx, Dockerfile frontend, application dependency, and database image versions actually used. Linux containers on macOS/Windows run through a Linux execution environment; native Windows containers have different boundaries and are outside scope. Platform-dependent paths, networking, permissions, and architecture support require explicit qualification.

Target: construct and explain representative container workflows, trace application and data lifetimes, interpret diagnostic evidence, and justify packaging, connectivity, security, delivery, and recovery choices. Completion does not establish assessed production competence.

Structure: **11 chapters, 67 sections**, distributed **6, 6, 7, 6, 6, 7, 6, 6, 6, 6, and 5**. Counts follow conceptual scope rather than equal teaching time.

## Learning spine

Observe container execution → construct an application image → separate persistent state → connect services → express the application with Compose → improve build efficiency and portability → evaluate trust and authority → deliver identifiable artifacts → diagnose and recover → synthesize an operating model.

Running an existing image makes the system observable before introducing Dockerfiles. Storage and networking precede Compose so declarative configuration expresses mechanisms already understood. Advanced build and release decisions build on image identity; recovery builds on data ownership and diagnostic evidence. Introduce trust, secret exclusion, bounded exposure, and destructive-operation awareness at first use, then deepen them later.

Recurring example: a supplied HTTP catalogue API first serves static data, then uses PostgreSQL. Add a background worker only where it clarifies service boundaries. Follow the application through an image, disposable container, persistent database, private service network, Compose project, and release/recovery walkthrough. Contrast it with a standalone batch container to avoid treating every container as a permanent web service.

Teaching method: objective → mental model → annotated command/configuration or diagram → expected evidence → contrasting failure → outcome → bridge. Outputs are illustrative unless explicitly captured in a recorded environment. Introduce observation before mutation; use named disposable resources and explain permissions, host effects, data loss, and recovery beside the relevant operation. Keep examples at course-plan level rather than delivering lessons or mandatory exercises.

## Chapter 1 — Containers and the Docker System

Objective: Explain the packaging problem and locate the components responsible for Docker behaviour.

1. Application dependencies, environment drift, and the limits of packaging
2. Containers versus virtual machines: processes, kernels, and isolation boundaries
3. Images, containers, registries, and the application lifecycle
4. Client, daemon, API, contexts, and local versus remote hosts
5. Linux namespaces and resource isolation; the Docker Desktop Linux VM
6. A prepared environment, version inventory, help, and first observations

Worked illustrations: Use an architecture diagram and annotated `docker version`, `docker info`, and `docker context show` output. Trace CLI → daemon → registry → image → container process, identifying which machine owns each object. Contrast a missing daemon with selecting the wrong context. Compare native Linux and Desktop on macOS/Windows without assuming their host paths or networking are identical.

Outcome: Explain what Docker packages, what it shares with its execution environment, and where a command acts.

Bridge: The system map establishes the objects; next we follow their observable lifecycle.

## Chapter 2 — Running and Inspecting Containers

Objective: Construct and interpret a basic container lifecycle before building a custom image.

1. Pull, create, start, and run: image acquisition versus container execution
2. Foreground, detached, interactive, and terminal-attached execution
3. Commands, arguments, environment variables, and initial port publishing
4. Observing logs and metadata; exec versus the main container process
5. Exit status, signals, PID 1, and graceful shutdown
6. Stop, remove, recreate, and cleanup with explicit object ownership

Worked illustrations: Annotate `docker run`, `docker ps -a`, `docker logs`, and `docker inspect` for a supplied API image. Bind the demonstration endpoint to `127.0.0.1` on the host; explain that this is a deliberate exposure choice before the networking chapter. Compare a successful batch container, a crashing service, and an intentionally stopped service. Trace stop → termination signal → grace period → forced termination where necessary. Explain that `exec` starts another process and does not replace the service entrypoint. Preview selected disposable objects before removal; avoid broad prune commands.

Outcome: Choose lifecycle operations, interpret container state and output, and distinguish a completed job from a failed long-running service.

Bridge: Using an existing image raises the next question: how is the application packaged into that image?

## Chapter 3 — Building an Application Image

Objective: Express a supplied application as a maintainable Dockerfile and distinguish build inputs from runtime configuration.

1. Build context, file selection, and `.dockerignore`
2. Dockerfile stages, filesystem layers, and image configuration metadata
3. Base-image compatibility, trust, and dependency installation
4. Filesystem construction with COPY, RUN, and WORKDIR
5. CMD, ENTRYPOINT, exec form, and a non-root runtime identity
6. Build arguments and environment values versus runtime configuration
7. Tags, digests, rebuilds, and controlled dependency updates

Worked illustrations: Walk through a supplied API Dockerfile and its build output, marking filesystem-changing instructions separately from metadata instructions. Compare rebuilding after a source edit with recreating a container after changing runtime configuration. Show why EXPOSE documents a port without publishing it. Compare exec-form startup with a shell wrapper that fails to forward signals. Exclude credentials from the context, show a mistakenly copied secret as a failure case, and explain why deleting it in a later layer is insufficient. Introduce build secret mounts conceptually here; implement their fuller workflow in Chapter 7. Contrast digest stability with the need to apply security updates.

Outcome: Construct and explain a basic application image, identify its inputs and startup behaviour, and justify rebuild and identity choices.

Bridge: An image can be replaced; application data needs an independently understood lifetime.

## Chapter 4 — State, Mounts, and Data Lifetime

Objective: Choose storage according to data ownership and lifetime, and reason about replacement and recovery.

1. The writable container layer and removal-related data loss
2. Named volumes and daemon-managed persistence
3. Bind mounts for development files and host integration
4. Temporary storage and non-persistent data
5. Ownership, permissions, and files hidden by mounts
6. Database-aware backup, restore verification, and destructive lifecycle boundaries

Worked illustrations: Draw image layers, a container writable layer, a named database volume, and a development bind mount. Replace the PostgreSQL container and trace retained records through the volume; contrast deleting an explicitly disposable volume. Use a mount-over-directory example to explain hidden image files and a numeric identity mismatch to explain denied writes. Outline a database-supported logical backup and restore into a separate disposable database, checking representative records. Explain why a surviving volume is not an independent backup and copying a running database directory is not a universal consistency strategy. Record the selected database image version and its documented data directory before concrete mount examples.

Outcome: Explain where data lives, choose an appropriate mount, and distinguish container replacement, data deletion, and verified recovery.

Bridge: The API and durable database are separate processes; next we connect them deliberately.

## Chapter 5 — Networking and Request Paths

Objective: Trace application traffic and distinguish naming, listening, routing, and exposure failures.

1. Container interfaces, network namespaces, and request paths
2. User-defined bridge networks and network membership
3. DNS, container names, and service discovery
4. Container listening ports, EXPOSE metadata, and published host ports
5. Container localhost, host access, and Desktop platform differences
6. Network separation and systematic connectivity diagnosis

Worked illustrations: Diagram browser → host published port → API listener → database service name and port. Keep the database port unpublished and explain that network peers may still reach it. Contrast a user-defined bridge with default-bridge name-resolution behaviour. Diagnose an API listening only on container loopback, a wrong destination port, a missing network membership, and using localhost for a different container. Treat host access as platform-dependent rather than assuming a universal special hostname. Use observed DNS, listening, and connection evidence to narrow each failure.

Outcome: Construct a simple network arrangement and explain which name, address, listener, or exposure setting controls a request.

Bridge: Known runtime, storage, and network choices can now become one declarative application.

## Chapter 6 — Multi-Service Applications with Compose

Objective: Describe and operate a small application as a Compose project while separating configuration, readiness, and recovery.

1. Services, networks, volumes, and the Compose project model
2. YAML and interpolation versus environment inside the container
3. Build definitions, image references, and configuration validation
4. Project creation, observation, recreation, shutdown, and volume lifetime
5. Health checks, dependency conditions, application retry, and shutdown order
6. Overrides and development versus production configuration
7. Runtime secret files, application consumption, and protection limits

Worked illustrations: Translate the earlier API/database CLI workflow into annotated Compose YAML. Inspect resolved configuration with `docker compose config`, explaining that its output may contain sensitive values and should not be shared blindly. Compare interpolation in the Compose model with an environment value available to the application. Trace `up`, `ps`, `logs`, and `down`, separating ordinary shutdown from explicitly requested volume deletion. Contrast process start, a database health check, and successful application queries; demonstrate that startup ordering is not continuing dependency recovery. Explain how the application reads a secret file and why mounting one does not provide a full secret-management system.

Outcome: Construct and interpret a Compose project, explain configuration resolution and persistence, and distinguish dependency readiness from ongoing resilience.

Bridge: A working application establishes correctness; next we improve how its artifacts are built and transported across architectures.

## Chapter 7 — Efficient and Portable Builds

Objective: Reason about build reuse, artifact boundaries, credentials, and target-platform compatibility.

1. BuildKit, Buildx, builder selection, and builder output destinations
2. Cache invalidation, dependency ordering, and rebuild traces
3. Multi-stage builds and separation of build tools from runtime artifacts
4. Cache mounts and reusable caches in CI
5. Build secret and SSH mounts; preventing credential leakage
6. Architecture, image indexes, and emulation/native/cross-compilation strategies

Worked illustrations: Compare build logs after changing only application source and after changing dependency declarations. Contrast cached results with a deliberate freshness check. Compare single-stage and multi-stage image contents and size without promising one fixed improvement. Explain builder cache, locally loaded images, and registry output as different destinations. Trace passing a secret to the builder and exposing it only for the intended build instruction; show that a command can still leak it by logging or copying it. Use an ARM laptop and x86 deployment target to explain platform selection, missing image variants, emulation cost, and native-library compatibility.

Outcome: Explain build-cache decisions, construct a multi-stage design, and choose a platform strategy with explicit credential and compatibility boundaries.

Bridge: Efficient artifacts still need an explicit trust model and controls over their runtime authority.

## Chapter 8 — Container and Supply-Chain Security

Objective: Evaluate image and runtime risks and justify layered controls and maintenance decisions.

1. Isolation boundaries, daemon authority, and Docker socket access
2. Non-root application identities versus a rootless daemon
3. Capabilities, privileged execution, and least authority
4. Read-only filesystems, writable mounts, and network restrictions
5. Vulnerability evidence, dependency compatibility, and patch decisions
6. SBOMs, provenance, credential exposure response, and secret rotation

Worked illustrations: Review an API configuration that runs privileged, mounts the daemon socket, and writes broadly to the host. Replace each permission with a justified requirement and identify where application changes are necessary. Contrast a non-root process with rootless Docker and explain why neither alone settles the trust question. Review illustrative vulnerability findings using exploitability, available fixes, and runtime context; compare an unchanged pinned digest with a tested patched image. Explain what an SBOM inventories and what provenance records, including the need to verify the producer and evidence. Walk through revoking and rotating an exposed credential rather than relying only on image deletion. Tool-specific scanning and attestation commands remain outside the verified examples.

Outcome: Identify important trust boundaries, justify runtime restrictions, and interpret supply-chain evidence without equating it with guaranteed safety.

Bridge: Controls and evidence become more useful when the same reviewed artifact can be followed through a release.

## Chapter 9 — Registries and Repeatable Delivery

Objective: Trace an artifact through publication, promotion, update, and rollback while preserving configuration and data boundaries.

1. Registry addresses, repositories, tags, and authentication
2. Push, pull, image digests, and platform-specific identity
3. Build, application verification, and publish workflow
4. Environment-specific configuration and runtime secret separation
5. Artifact promotion, controlled replacement, and release evidence
6. Rollback, database compatibility, and recovery prerequisites

Worked illustrations: Annotate an illustrative pipeline that builds the API, checks its startup and representative request, publishes it, and records its digest. Use placeholder registry names and conceptual credentials, with no publishing required. Follow the tested artifact into a second environment while changing configuration rather than rebuilding merely to embed environment values. Distinguish an image-index digest from the selected platform image digest. Compare mutable-tag drift with deployment by recorded digest. Walk through a reversible application change and a database schema change that an older image cannot safely consume; identify compatibility checks and restore implications before rollback.

Outcome: Explain and construct a representative delivery workflow, identify the artifact being promoted, and justify the limits of an image rollback.

Bridge: Release identity helps diagnosis; next we combine it with resource and failure evidence.

## Chapter 10 — Resources, Diagnosis, and Recovery

Objective: Diagnose representative runtime failures and choose proportionate recovery actions from evidence.

1. CPU, memory, and process limits and their application effects
2. Container statistics and shared host or Desktop VM capacity
3. Application logs, logging growth, and disk consumption
4. Layered diagnosis across process, storage, and network boundaries
5. Restart policies, health status, and failure loops
6. Evidence-led cleanup, backup verification, and recovery decisions

Worked illustrations: Compare illustrative `docker stats`, inspect state, logs, and host evidence for an application exception, memory exhaustion, disk exhaustion, and a database connection failure. Explain why one exit code alone does not prove an out-of-memory event. Contrast CPU throttling with application latency from a slow database. Trace a restart loop and a running but unhealthy service; do not assume health status automatically restarts a standalone container. Inventory images, containers, caches, logs, and volumes before reclaiming space, distinguishing rebuildable artifacts from application data. Restore into an isolated target and check service behaviour as well as records. Logging-driver-specific commands require later targeted verification.

Outcome: Form and test diagnostic hypotheses, explain resource and restart behaviour, and choose cleanup or recovery steps that preserve required data.

Bridge: The final chapter integrates these decisions into an operating model for the entire application.

## Chapter 11 — Operating the Whole Application and Knowing the Boundary

Objective: Synthesize packaging, configuration, security, release, and recovery decisions into a coherent operating plan.

1. Production configuration review and application responsibilities
2. Reproducibility, version records, and compatibility inventory
3. Maintenance, controlled release, and recovery runbooks
4. Single-host availability, durable data, and host-failure boundaries
5. Orchestration responsibilities and orientation to Kubernetes and Swarm

Worked illustrations: Review the catalogue stack using an architecture diagram, recorded image identities, resolved configuration, exposure choices, resource assumptions, and backup evidence. Follow a controlled release from verification to rollback decision. Walk through host loss: identify which registry artifacts, configuration, credentials, and off-host backups allow rebuilding and which local resources were lost. Distinguish a restarted process from restored data and a working user request. Compare the responsibilities of a single-host Compose setup with a cluster scheduler without implementing a cluster or treating replication as a substitute for database recovery.

Outcome: Explain the whole application lifecycle, justify an operating runbook, and identify where availability and orchestration requirements exceed the course scope.

Bridge: Continue with Linux operations, dedicated CI/CD study, cloud container services, or a Kubernetes/Swarm course. Revisit the same application under new failure and deployment constraints, checking current documentation and recovery evidence before extending the design.

## Sources and scope

Official Docker documentation is the primary technical authority: [overview](https://docs.docker.com/get-started/docker-overview/), [running containers](https://docs.docker.com/engine/containers/run/), [build best practices](https://docs.docker.com/build/building/best-practices/), [storage](https://docs.docker.com/engine/storage/), [networking](https://docs.docker.com/engine/network/), [Compose uses](https://docs.docker.com/compose/intro/features-uses/), [Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/), [build secrets](https://docs.docker.com/build/building/secrets/), [multi-platform builds](https://docs.docker.com/build/building/multi-platform/), [Engine security](https://docs.docker.com/engine/security/), and [resource constraints](https://docs.docker.com/engine/containers/resource_constraints/). These are rolling references inspected on 2026-10-15; linked subpages and version-specific commands were not exhaustively audited.

Elton Stoneman's [Learn Docker in a Month of Lunches](https://www.manning.com/books/learn-docker-in-a-month-of-lunches) (Manning, 2020) and Sean P. Kane and Karl Matthias's [Docker: Up & Running, third edition](https://www.oreilly.com/library/view/docker-up/9781098131814/) (O'Reilly, 2023) provide complementary beginner/application and practitioner/operations perspectives through publisher material only. Full text was not accessed; neither book establishes verified command behaviour or course duration. Detailed evidence, access limitations, and the coverage map are maintained in README.md.

Linux isolation internals are introductory; kernel administration belongs in Linux study. Kubernetes and Swarm administration, cluster scheduling, advanced routing and network drivers, storage-driver tuning, builder fleets, native Windows containers, highly available databases, and vendor-specific CI/registry administration are deferred. Supply-chain concepts are included, while scanner-specific commands, signing/attestation verification procedures, logging-driver configuration, and concrete database backup syntax require targeted current documentation before lesson implementation. CI/CD and database recovery overlap intentionally at the boundary needed to reason about Docker delivery; neither becomes a full specialist course here.
