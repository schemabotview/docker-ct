import type { Section } from '../types'

export const portsPublishing: Section = {
  id: 'ports-publishing',
  title: 'Listening ports, EXPOSE metadata and published host ports',
  scene: 'ports',
  focus: 'misread',
  slide: `## Three meanings of "port"

People say "the port" for three different settings. Each is controlled in a **different place**.

### Listening
- Chosen by the **application**: the address and port it binds
- Nothing else matters if nothing is listening

### EXPOSE
- A note in the **image**: which port the app uses
- It opens nothing; \`-P\` uses it to pick random host ports

### Publishing
- \`-p\` forwards a **host** port into the container
- Bind it to an address: \`127.0.0.1:8081:8080\`
- \`docker port catalog-api\` lists what is published

### Unpublished is not private
- Every member of catalog-net can still reach **5432**
- Network membership is the real **boundary**`,
  narration:
    "The word port causes a lot of confusion, because people use it for three different settings that live in three different places. The table lays them out for both services. First, listening. This belongs to the application: the address and port it binds to inside its own namespace. The API listens on eight thousand and eighty, the database on five four three two. If nothing is listening, nothing else in this table matters. Second, EXPOSE. This is a note in the image recording which port the application uses. It opens nothing. Its only practical effect is with dash capital P, which publishes every exposed port on a random host port. Third, publishing. Dash p forwards a port on the host into the container, and it should name the host address too, as we do with one two seven dot zero dot zero dot one, so the API is reachable from this machine only. The database has no published port, so the host cannot reach it at all. Now the misreading worth correcting. Unpublished does not mean private. Every container that is a member of catalog net can connect to the database on five four three two. Publishing controls exposure to the host. Network membership controls who else can connect, and that is the boundary to design.",
}
