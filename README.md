# Xandr SDK

This package implements a client to interact with several Xandr APIs

## NPM publication

To publish a new version of the package, simply do
```bash
npm publish --access public
```
**Make sure to build the package & to set a correct version in the `package.json` file when publishing a new version**


# Features
## Authentication

For authentication, the package handles the token returned by Xandr Authentication Service, meaning you only have to provide
a username and a password. The token expiration and rate limiting (HTTP 429) are also handled

## Available APIs

The current available APIs are
- advertiser
- apd-api
- custom-model
- line-item
- placement
- publisher
- report
- segment
- segment-billing-category
- city
- dma
- region

## Placement validation

The SDK checks that a Xandr placement matches the archetype its wrapper dimensions (channels, formats, ad positions,
environments) call for: banner, interstitial, skin, instream video, outstream video or native.

```typescript
import { XandrClient, getExpectedPlacement } from 'xandr-sdk';

const client = new XandrClient({ username, password });

// Fetches the placements by batch of 100 (60s timeout per batch) and verifies each target
const verifications = await client.placement.verify([
  { placementId: 123, dimensions: { channels: ['video'], formats: ['video_instream'], adPositions: ['midroll'], environments: ['web'] } }
], { batchSize: 100, timeoutMs: 60000 });

for (const verification of verifications) {
  if (verification.status !== 'CONFORM')
    console.error(verification.placementId, verification.status, verification.reason);
}

// Expected placement for a set of dimensions, null when no archetype handles them
const expected = getExpectedPlacement({ channels: ['display'], formats: ['banner'] });
```

Each verification carries one status:
- `CONFORM`: the placement matches its archetype
- `UNHANDLED_DIMS`: the dimensions map to no archetype
- `ABSENT`: the placement does not exist in Xandr
- `GET_FAILED`: the Xandr GET failed or timed out, the conformity is unknown
- `MULTI_MEDIA_TYPE`: the placement supports several media types, it is not verified
- `TYPE_MISMATCH`: Xandr holds another archetype than the one the dimensions call for
- `FIELD_MISMATCH`: the archetype matches but some fields diverge, listed in `issues`

`getPlacementArchetype`, `validatePlacementArchetype` and `verifyPlacement` expose the same checks on placements
already fetched.

Dimensions are camelCase (`adPositions`), a snake_case `ad_positions` is refused at compile time. A null or missing list
counts as empty. The batch timeout only stops waiting: the timed-out GET is not cancelled and may keep the process alive,
so a script should still force its exit once done.
