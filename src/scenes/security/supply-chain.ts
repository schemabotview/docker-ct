import type { Scene } from '@graphlearning/flow'

// §6 — what an SBOM and provenance each claim, why a claim needs a verified producer, and what to do
// when a credential is exposed. The response row is ordered: revoke first; deleting an image is not
// on the list because copies already exist. No signing or attestation commands are shown (outside the
// plan's verified scope).
export const supplyChain: Scene = {
  id: 'supply-chain',
  title: 'SBOMs, provenance and exposure response',
  flow: 'TB',
  nodes: [
    {
      id: 'sbom',
      label: 'SBOM — what is inside',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 's-list', label: 'Inventory', sub: 'packages and versions', pattern: 'storage', icon: 'table' },
        { id: 's-answer', label: 'Answers', sub: 'are we affected by X?', pattern: 'service', icon: 'search' },
        { id: 's-not', label: 'Not proof', sub: 'that anything is safe', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'prov',
      label: 'Provenance — how it was built',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'p-source', label: 'Source', sub: 'repository and commit', pattern: 'storage', icon: 'gitbranch' },
        { id: 'p-builder', label: 'Builder', sub: 'and build parameters', pattern: 'storage', icon: 'gears' },
        { id: 'p-verify', label: 'Verify signer', sub: 'claims need a known producer', pattern: 'warn', icon: 'fingerprint' },
      ],
    },
    {
      id: 'response',
      label: 'A credential was exposed — in order',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-revoke', label: '1 Revoke', sub: 'at the issuer, now', pattern: 'warn', icon: 'ban' },
        { id: 'r-rotate', label: '2 Rotate', sub: 'issue a new one', pattern: 'service', icon: 'key' },
        { id: 'r-find', label: '3 Find uses', sub: 'every service, every copy', pattern: 'service', icon: 'search' },
        { id: 'r-rebuild', label: '4 Rebuild', sub: 'images that baked it in', pattern: 'service', icon: 'repeat' },
        { id: 'r-logs', label: '5 Review logs', sub: 'was it used?', pattern: 'service', icon: 'history' },
        { id: 'r-delete', label: 'Deleting', sub: 'the image is not revocation', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'sbom', target: 'response', label: 'evidence' },
    { source: 'prov', target: 'response', label: 'evidence' },
  ],
}
