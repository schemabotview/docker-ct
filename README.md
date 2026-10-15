# docker-ct

The **Docker** concept app for GraphL: one concept, eleven courses (one per chapter of
[`DOCKER-COURSE-PLAN.md`](DOCKER-COURSE-PLAN.md)), each course a list of sections. Served at
`graphl.in/docker-ct/`.

Scaffolded from [`content-repo-template`](https://github.com/schemabotview/content-repo-template).

```sh
npm install
npm run dev          # http://localhost:5173
```

## The content model

- **concept ⊃ course ⊃ section.** A **section** is the atomic unit of a video:
  `(scene, slide, narration)`. One section = one slide.
- **Left = scene, right = slide.** The scene is a react-flow diagram *or* a code card — both
  rendered by `@graphlearning/flow`. The slide is markdown.
- **Scenes are declarative.** Nodes, edges and nesting only — **never write x or y**.
- Narration wavs come from the Colab + Chatterbox pass (`scripts/colab_generate_audio.ipynb`), never
  by hand, at `public/audio/<course>/<section-id>.wav`.

## Layout

```
DOCKER-COURSE-PLAN.md    the syllabus: 11 chapters, 67 sections — the source of the course arc
src/content/    courses → sections (one file per section) + registry
src/scenes/     hand-authored scenes + registry
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   --brand / --brand-hover / --accent-2
scripts/        check-content.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/    narration wavs
.github/workflows/deploy.yml    Pages deploy on push to main
```

## Verifying a change

```sh
npm run build && npx tsc --noEmit && npm run check
```

…and **the section looked at in the browser**. The three commands pass on frames that are visually
wrong; the rendered route (`#/<course>-<section>`) is the real bar. `#/` is the catalog.

## Sources and evidence

The plan's sources section is the authority list. Docker command output shown in slides and code
cards is **illustrative** unless a section records the environment it was captured in (Engine,
Desktop, Compose, Buildx and image versions).
