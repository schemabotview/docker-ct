import type { Section } from '../types'

export const commandEnvPorts: Section = {
  id: 'command-env-ports',
  title: 'Commands, arguments, environment variables and port publishing',
  scene: 'command-env-ports',
  focus: 'host-port',
  slide: `## Configuring one run

Each part of a \`docker run\` command lands somewhere different.

### Command and environment
- Arguments after the image **replace its default command**
- \`-e NAME=value\` sets a variable in the **process environment**
- The image is unchanged; this is **runtime** configuration

### Publishing a port
- The API **listens on 8080** inside the container
- \`-p 127.0.0.1:8081:8080\` maps a **host** port to it
- Only this machine can reach it — a deliberate choice
- \`docker port catalog-demo\` lists the mappings

### Two easy mistakes
- Omitting \`127.0.0.1\` publishes on **every host interface**
- Mapping the wrong container port: nothing listens there`,
  narration:
    "Here is one docker run command for the catalogue API, read clause by clause, because each part ends up in a different place. Dash e sets environment variables, here a log level and a data source. They become part of the main process's environment, and the application reads them at start-up. The words after the image name are arguments, and they replace the image's default command for this one container. None of this changes the image. It is runtime configuration, stored with the container. Now the port. Inside its own network namespace, the API listens on port eight thousand and eighty. Nothing outside can reach that port until you publish it. Dash p one two seven dot zero dot zero dot one, colon eight zero eight one, colon eight zero eight zero, opens port eight zero eight one on the host's loopback address and forwards it to the container. So curl on this machine reaches the API, and other machines on the network do not. That is deliberate. If you leave out the address, the port is published on every host interface, which exposes a demo service to your whole network. And if you map to a port the application is not listening on, the connection simply fails. The networking chapter explains why.",
}
