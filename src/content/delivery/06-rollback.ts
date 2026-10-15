import type { Section } from '../types'

export const rollbackSection: Section = {
  id: 'rollback',
  title: 'Rollback, database compatibility and recovery prerequisites',
  scene: 'rollback',
  focus: 'ri-old',
  slide: `## Rollback and the database

Redeploying the previous digest rolls back the **code**. It does not roll back the **data**.

### A code-only release
- The schema is unchanged
- Rollback: redeploy the **previous digest**
- No migration means **no data** to undo

### A release that changes the schema
- A migration renames a column the old code uses
- The old image then **fails** on the new schema
- Undoing the data means a **restore**: newer writes are **lost**

### Before you release
- The previous digest is **recorded** and still pullable
- A **verified backup** exists from just before the migration
- Schema changes **expand first**: add now, remove later
- Test the old image against the **new schema**
- Write the rollback steps **before** the release`,
  narration:
    "Rollback sounds simple: redeploy the previous digest. For many releases it is. Version one point four point one changed only the sort order of the catalogue. The database schema did not change, so redeploying the one point four point zero digest puts everything back exactly as it was. Now version one point five point zero. Its migration renames the price column. Deploy it, discover a bug, and redeploy the old image, and the old image fails immediately, because it queries a column that no longer exists. The image rolled back; the data did not. Undoing the data means restoring the backup taken before the migration, and every order written since then is lost. That is why rollback has to be planned before the release, not invented during the incident. Four prerequisites. The previous digest is recorded, and still available in the registry. A verified backup exists from just before the migration, as the storage chapter described. Schema changes are made in an expand then contract style: add the new column now, keep the old one working, and remove it only in a later release, once nothing uses it. And someone has actually tested the old image against the new schema, so you know rollback works before you need it.",
}
