import type { Section } from '../types'

export const dnsDiscovery: Section = {
  id: 'dns-discovery',
  title: 'DNS, container names and service discovery',
  scene: 'dns-discovery',
  focus: 'l-dns',
  slide: `## Names, not addresses

On a user-defined network, Docker runs an **embedded DNS server** for its members.

### How a lookup works
- The container's resolver points at **127.0.0.11**
- A member's **name** returns its **current IP**
- Other names are forwarded to the **host's DNS**
- An alias shared by several containers returns **all** of them

### Why names matter
- Replace \`catalog-db\` and its IP **may change**
- The name stays the same, so the API keeps working
- \`--network-alias\` adds an extra name, such as \`db\`

### Watch for
- Names resolve only **within one network**
- A missing name is often a **membership** problem
- Configure names, **never** container IP addresses
- \`getent hosts catalog-db\` shows what a container sees`,
  narration:
    "How does the API turn the name catalog db into an address? On a user-defined network, Docker runs an embedded DNS server for the members. Inside each container, the resolver is pointed at a special address, one two seven dot zero dot zero dot one one. When the API asks for catalog db, the embedded server answers with that container's current address on the network. Names it does not own, like an external API's hostname, are forwarded on to the host's normal DNS. The terminal shows why this matters. Ask from inside the API, with getent hosts, and catalog db resolves to one seventy two dot eighteen dot zero dot two. Now replace the database container. Its data is safe in the volume, but the new container may get a different address, here dot four. The name still resolves, to the new address, and the API keeps working without any change. If the API had been configured with the old IP, it would now be talking to nothing. You can add extra names with a network alias, for example a short name like db. And remember the scope: names resolve only for members of the same network. A container outside catalog net asking for catalog db gets no answer at all, which is often the first clue to a membership problem.",
}
