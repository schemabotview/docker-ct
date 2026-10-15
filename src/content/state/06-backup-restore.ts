import type { Section } from '../types'

export const backupRestore: Section = {
  id: 'backup-restore',
  title: 'Database-aware backup, restore verification and destructive boundaries',
  scene: 'backup-restore',
  focus: 'p-check',
  slide: `## A backup is something you have restored

The volume keeps data across container replacement. It does **not** protect it.

### The verified path
- Dump with the **database's own tool**, for a consistent copy
- Store the dump **off the volume**, ideally off the host
- Restore into a **disposable** database with its own volume
- Verify: counts, sample records, and a **real application query**

### Not a backup
- The volume itself: one disk, one \`volume rm\`
- Copying a running database's files: may be **inconsistent**
- A dump nobody has restored: **unknown**

### The destructive boundary
- Remove the old volume **only after** a verified restore`,
  narration:
    "A named volume keeps the catalogue's data safe across container replacement. It does not protect that data from much else. If the disk fails, or someone runs docker volume rm, the volume and everything in it are gone together. So the last part of this chapter is backup, and the one rule worth remembering: a backup is something you have restored. The path has four steps. First, take a logical dump using the database's own tool, which produces a consistent copy even while the database is running. Second, store that dump somewhere other than the volume, ideally off the host entirely. Third, restore it into a disposable database container with its own fresh volume, never over the live one. Fourth, verify: compare row counts, check a few known records, and point the application at the restored database and make a real request. The commands on the left are an outline; the exact options belong to your PostgreSQL version's documentation. Now the false comforts. The volume itself is not a backup. Copying the data directory of a running database may capture files mid-write and produce something that will not start. And a dump nobody has restored is an unknown. Only after a verified restore should any old volume be removed, and then deliberately, by name.",
}
