import type { Section } from '../types'

export const bridgeNetworks: Section = {
  id: 'bridge-networks',
  title: 'User-defined bridge networks and network membership',
  scene: 'bridge-networks',
  focus: 'custom',
  slide: `## User-defined networks

A **bridge network** connects containers on one host. Create your own for each application.

### The default bridge
- Containers join it when no \`--network\` is given
- Peers can reach each other **by IP only**
- Unrelated containers all share it
- Legacy \`--link\` is no substitute; use a network

### A user-defined bridge
- \`docker network create catalog-net\`
- Containers resolve each other **by name**
- Only **members** are connected to each other
- Outbound traffic still leaves through the host

### Membership
- \`--network\` at run time; \`network connect\` later
- A container can belong to **several** networks
- \`docker network inspect\` lists the **members**`,
  narration:
    "Containers on one host are connected by bridge networks, a virtual switch the daemon manages. Every Docker host has a default bridge, and any container started without a network option joins it. The default bridge has two drawbacks. Containers on it can reach each other only by IP address, not by name. And unrelated containers, from every project on the host, end up sharing it. The better habit is a user-defined bridge per application. One command, docker network create catalog net, makes one. Start the database and the API with dash dash network catalog net, and three things change. They can find each other by container name. Only members of catalog net are connected to each other, so a container from another project cannot reach the database across this network. And outbound traffic, say to fetch something from the internet, still leaves through the host as before. Membership is flexible. You choose the network at run time, and you can attach a running container later with docker network connect, as we do here with a background worker. A container can belong to several networks at once, which is how you will later let one service talk to two groups without joining those groups to each other. docker network inspect lists exactly who is a member.",
}
