import type { Section } from '../types'

export const logsDisk: Section = {
  id: 'logs-disk',
  title: 'Application logs, logging growth and disk consumption',
  scene: 'disk',
  focus: 'kinds',
  slide: `## Where the disk went

A full disk stops writes everywhere: databases, logs, builds. Find out **what** is using it.

### Measure first
- \`docker system df\` totals images, containers, volumes, cache
- \`-v\` lists each one, so you can see **whose** it is

### Sort it before reclaiming
- **Rebuildable**: images, build cache, your stopped containers
- **Data**: volumes; deleting them deletes records
- **Evidence**: a failed container's logs, until diagnosed
- Prune **by name**, never broadly

### Logs grow quietly
- Everything on stdout is stored by the **logging driver**
- Without rotation, logs can grow **without limit**
- Rotation options depend on the **driver**: check its docs`,
  narration:
    "A full disk is one of the most disruptive failures there is, because everything that writes stops at once: the database, the logs, even the builds you would use to fix it. So when space runs low, measure before you delete. docker system df totals the space used by images, containers, local volumes and the build cache, and shows how much of each it considers reclaimable. Add dash v and it lists every object, so you can see whose each one is. Then sort what you find into three kinds. Rebuildable things can be recreated: images can be pulled or built again, and build cache only costs time. Stopped containers you own can usually go. Data is different. Volumes hold records, and deleting one deletes them. And there is evidence: the stopped container that failed last night still holds its logs and its exit state, so keep it until someone has read them. Logs deserve their own attention, because they grow quietly. Everything an application writes to standard output is stored by Docker's logging driver, on the host's disk. Without rotation configured, a chatty service can fill a disk on its own. How rotation is configured depends on the logging driver in use, so check that driver's documentation rather than copying settings blindly.",
}
