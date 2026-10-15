// Density guard — the failure `check-content.mjs` cannot see. A frame that builds green, reads
// correctly, and leaves half its pane empty. CLAUDE.md's density targets used to be read off the
// route by eye; this renders every section headless and MEASURES them instead.
//
//   npm run density                 # every section; exits 1 on any miss
//   npm run density -- --only system-what-docker-packages,system-vm-vs-container
//   npm run density -- --report     # print the table, never fail
//   npm run density -- --shots <dir> # also save each measured frame, for the by-eye review
//
// What is measured, at a 1920×1080 landscape frame (the 16:9 the recorder captures at 4K — every
// ratio below is scale-free, so 1080p measures the same frame at a quarter of the cost):
//
//   slide fill   scaler height ÷ slide-panel height. 0.80–0.95 (CLAUDE.md). Below → the right half
//                looks empty; above → one review window shorter than 16:9 clips the last line.
//   scene axis   max(nodes-w ÷ pane-w, nodes-h ÷ pane-h) ≥ 0.85 — the board reaches the edge it is
//                bound by. fitView guarantees ONE axis binds, so a low number here means the scene
//                padding is wasting the pane, not the board's shape.
//   scene area   (nodes-w × nodes-h) ÷ (pane-w × pane-h) ≥ 0.55 — a wide board that is a third of
//                the pane tall is a restack, not a padding problem.
//   eyebrow      no node rect intersects the top-left eyebrow label.
//
// "nodes" is the union of every rendered .react-flow__node rect — containers included, edge labels
// not. The targets are CLAUDE.md's; they are targets, not physics, so a deliberately sparse board
// can be waived per section in WAIVE below — with the reason, so the waiver is reviewable.
import { createServer } from 'vite'
import puppeteer from 'puppeteer'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SLIDE_MIN = 0.8
const SLIDE_MAX = 0.95
const AXIS_MIN = 0.85
const AREA_MIN = 0.55
const W = 1920
const H = 1080

/** slug → { metric: reason }. Every waiver carries its reason. */
const WAIVE = {}

const args = process.argv.slice(2)
const report = args.includes('--report')
const onlyIdx = args.indexOf('--only')
const only = onlyIdx >= 0 ? new Set(args[onlyIdx + 1].split(',')) : null
const shotsIdx = args.indexOf('--shots')
const shots = shotsIdx >= 0 ? args[shotsIdx + 1] : null // also save each measured frame as <dir>/<slug>.png

const server = await createServer({ logLevel: 'error', server: { port: 5199, strictPort: false } })
await server.listen()
const port = server.config.server.port
const { COURSES, allSections } = await server.ssrLoadModule('/src/content/index.ts')
const slugs = Object.values(COURSES)
  .flatMap((c) => allSections(c).map((s) => s.slug))
  .filter((s) => !only || only.has(s))

const browser = await puppeteer.launch({
  // CHROME_PATH, else a pre-installed Chromium when there is one, else puppeteer's own download.
  executablePath: process.env.CHROME_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined),
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H })

const rows = []
for (const slug of slugs) {
  await page.goto(`http://localhost:${port}/?capture=1#/${slug}`, { waitUntil: 'networkidle0' })
  await page.waitForSelector('.react-flow__node', { timeout: 15000 })
  // fitView settles over a couple of frames after the nodes mount; wait for the viewport transform
  // to stop changing rather than sleeping a guessed interval.
  await page.waitForFunction(
    () => {
      const vp = document.querySelector('.react-flow__viewport')
      const t = vp && vp.style.transform
      const ok = t && t === window.__lastT
      window.__lastT = t
      return ok
    },
    { polling: 250, timeout: 15000 },
  )
  await new Promise((r) => setTimeout(r, 300)) // the slide's useSlideScale zoom lands on resize/RAF
  const m = await page.evaluate(() => {
    const r = (el) => el && el.getBoundingClientRect()
    const pane = r(document.querySelector('.scene-area'))
    const nodes = [...document.querySelectorAll('.react-flow__node')].map(r)
    const u = nodes.reduce(
      (a, b) => ({
        l: Math.min(a.l, b.left),
        t: Math.min(a.t, b.top),
        r: Math.max(a.r, b.right),
        b: Math.max(a.b, b.bottom),
      }),
      { l: Infinity, t: Infinity, r: -Infinity, b: -Infinity },
    )
    const panel = r(document.querySelector('.slide-panel'))
    const scaler = r(document.querySelector('.slide-panel__scaler'))
    const eb = r(document.querySelector('.reel-head__eyebrow'))
    const hit = (a, b) => a && b && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom
    return {
      w: (u.r - u.l) / pane.width,
      h: (u.b - u.t) / pane.height,
      slide: scaler.height / panel.height,
      eyebrow: eb ? nodes.some((n) => hit(n, eb)) : false,
    }
  })
  if (shots) {
    mkdirSync(shots, { recursive: true })
    await page.screenshot({ path: join(shots, `${slug}.png`) })
  }
  const axis = Math.max(m.w, m.h)
  const area = m.w * m.h
  const waive = WAIVE[slug] || {}
  const miss = []
  if (m.slide < SLIDE_MIN && !waive.slide) miss.push(`slide ${pct(m.slide)} < ${pct(SLIDE_MIN)}`)
  if (m.slide > SLIDE_MAX && !waive.slide) miss.push(`slide ${pct(m.slide)} > ${pct(SLIDE_MAX)}`)
  if (axis < AXIS_MIN && !waive.axis) miss.push(`scene axis ${pct(axis)} < ${pct(AXIS_MIN)}`)
  if (area < AREA_MIN && !waive.area) miss.push(`scene area ${pct(area)} < ${pct(AREA_MIN)}`)
  if (m.eyebrow && !waive.eyebrow) miss.push('node under the eyebrow')
  rows.push({ slug, slide: m.slide, w: m.w, h: m.h, axis, area, miss })
}

await browser.close()
await server.close()

function pct(x) {
  return `${Math.round(x * 100)}%`
}
const pad = (s, n) => String(s).padEnd(n)
console.log(pad('section', 44) + pad('slide', 8) + pad('w', 7) + pad('h', 7) + pad('area', 7) + 'result')
for (const r of rows) {
  console.log(
    pad(r.slug, 44) + pad(pct(r.slide), 8) + pad(pct(r.w), 7) + pad(pct(r.h), 7) + pad(pct(r.area), 7) +
      (r.miss.length ? '✗ ' + r.miss.join('; ') : '✓'),
  )
}
const bad = rows.filter((r) => r.miss.length)
if (bad.length && !report) {
  console.error(`\n✗ ${bad.length}/${rows.length} section(s) under the density targets`)
  process.exit(1)
}
console.log(`\n${bad.length ? '•' : '✓'} density: ${rows.length - bad.length}/${rows.length} sections on target`)
